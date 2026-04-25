package br.com.festagestor.service;

import br.com.festagestor.dto.DadosCadastroAluguel;
import br.com.festagestor.dto.DadosCadastroAluguelItem;
import br.com.festagestor.dto.DadosDetalhamentoAluguel;
import br.com.festagestor.model.*;
import br.com.festagestor.repository.AluguelRepository;
import br.com.festagestor.repository.ClienteRepository;
import br.com.festagestor.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AluguelService {
    @Autowired
    private AluguelRepository aluguelRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ItemRepository itemRepository;

    //@PostMapping / Cadastrar
    @Transactional
    public DadosDetalhamentoAluguel cadastrar(DadosCadastroAluguel dados) {

        var cliente = buscarCliente(dados.idCliente());
        var endereco = obterEndereco(dados, cliente);

        var aluguel = new Aluguel(cliente, dados, endereco);
        var itens = mapearItens(dados.item(), aluguel);

        aluguel.setItens(itens);
        aluguel.calcularValorTotal();

        aluguelRepository.save(aluguel);
        return new DadosDetalhamentoAluguel(aluguel);
    }

    //@GetMapping / Listar
    public Page<DadosDetalhamentoAluguel> listar(Pageable paginacao) {
        return aluguelRepository.findAll(paginacao).map(DadosDetalhamentoAluguel::new);
    }

    private Cliente buscarCliente(Long id) {
        return clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado com o id: " + id));
    }

    private Endereco obterEndereco(DadosCadastroAluguel dados, Cliente cliente) {
        Endereco endereco;
        if (dados.endereco() != null) {
            return endereco = new Endereco(dados.endereco());
        }
        return cliente.getEndereco();
    }

    private List<AluguelItem> mapearItens(List<DadosCadastroAluguelItem> itensDto, Aluguel aluguel) {
        return itensDto.stream().map(itemDto -> {
            Item item = itemRepository.findById(itemDto.idItem())
                    .orElseThrow(() -> new RuntimeException("Item não encontrado com o id: " + itemDto.idItem()));
            return new AluguelItem(aluguel, item, itemDto);
        }).toList();
    }
}
