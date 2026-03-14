package br.com.festagestor.service;

import br.com.festagestor.dto.*;
import br.com.festagestor.model.Brinquedo;
import br.com.festagestor.model.Decoracao;
import br.com.festagestor.model.Item;
import br.com.festagestor.repository.ItemRepository;
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
    public Item cadastrar(DadosCadastroItem dados) {
        if (dados instanceof DadosCadastroBrinquedo brinquedoDados) {
            Brinquedo brinquedo = new Brinquedo(brinquedoDados);
            return repository.save(brinquedo);
        }
        if (dados instanceof DadosCadastroDecoracao decoracaoDados) {
            Decoracao decoracao = new Decoracao(decoracaoDados);
            return repository.save(decoracao);
        }
        return null;
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
        Item item = repository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado com o ID: " + id));
        item.inativar();
    }

    //@PutMapping / Atualizar
    @Transactional
    public DadosListagemItem atualizar(Long id, DadosAtualizacaoItem atualizacaoItem) {
        Item item = repository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado com o ID: " + id));
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
}
