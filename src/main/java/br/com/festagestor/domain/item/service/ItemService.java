package br.com.festagestor.domain.item.service;

import br.com.festagestor.domain.item.dto.*;
import br.com.festagestor.domain.item.model.Brinquedo;
import br.com.festagestor.domain.item.model.Decoracao;
import br.com.festagestor.domain.item.model.Item;
import br.com.festagestor.domain.item.model.Status;
import br.com.festagestor.domain.item.repository.ItemRepository;
import br.com.festagestor.domain.shared.exception.IdNaoEncontradoException;
import br.com.festagestor.domain.shared.exception.RegraDeNegocioException;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    //@PostMapping / Cadastrar
    @Transactional
    public List<DadosListagemItem> cadastrar(DadosCadastroItem dados) {
        List<Item> listaDeItens = new ArrayList<>();

        for (int i = 0; i < dados.quantidade(); i++) {
            listaDeItens.add(dados.instanciarEntidade());
        }

        repository.saveAll(listaDeItens);
        return listaDeItens.stream()
                .map(item -> switch (item) {
                    case Brinquedo brinquedo -> (DadosListagemItem) new DadosListagemBrinquedo(brinquedo);
                    case Decoracao decoracao -> (DadosListagemItem) new DadosListagemDecoracao(decoracao);
                    default -> throw new RegraDeNegocioException("Tipo desconhecido!");
                })
                .toList();
    }

    //@GetMapping / Listar
    public List<DadosListagemItem> listar() {
        List<Item> itensDoBanco = repository.findAllByAtivoTrue();
        List<DadosListagemItem> listaDeDtos = new ArrayList<>();

        for (Item item : itensDoBanco) {
            if (item instanceof Brinquedo brinquedo) {
                DadosListagemBrinquedo listagemBrinquedo = new DadosListagemBrinquedo(brinquedo);
                listaDeDtos.add(listagemBrinquedo);
            } else if (item instanceof Decoracao decoracao) {
                DadosListagemDecoracao listagemDecoracao = new DadosListagemDecoracao(decoracao);
                listaDeDtos.add(listagemDecoracao);
            }
        }
        return listaDeDtos;
    }

    //@DeleteMapping / Deletar
    @Transactional
    public void excluir(Long id) {
        Item item = repository.findById(id).orElseThrow(() -> new IdNaoEncontradoException("Item", id));
        item.inativar();
    }

    //@PutMapping / Atualizar
    @Transactional
    public DadosListagemItem atualizar(Long id, DadosAtualizacaoItem atualizacaoItem) {
        Item item = repository.findById(id).orElseThrow(() -> new IdNaoEncontradoException("Item", id));
        if (item instanceof Brinquedo brinquedo && atualizacaoItem instanceof DadosAtualizacaoBrinquedo atualizacaoBrinquedo) {
            brinquedo.atualizarInformacoes(atualizacaoBrinquedo);
            DadosListagemBrinquedo listagem = new DadosListagemBrinquedo(brinquedo);
            return listagem;
        } else if (item instanceof Decoracao decoracao && atualizacaoItem instanceof DadosAtualizacaoDecoracao atualizacaoDecoracao) {
            decoracao.atualizarInformacoes(atualizacaoDecoracao);
            DadosListagemDecoracao listagemDecoracao = new DadosListagemDecoracao(decoracao);
            return listagemDecoracao;
        } else {
            throw new IllegalArgumentException("\"Tipo de item incompatível com os dados de atualização enviados.\"");
        }
    }

    @Transactional
    public DadosStatusItem colocarEmManutencao(Long id) {
        var item = repository.findById(id).orElseThrow(() -> new IdNaoEncontradoException("Item", id));
        item.colocarEmManutencao();
        return new DadosStatusItem(item);
    }
}
