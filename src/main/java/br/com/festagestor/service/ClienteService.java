package br.com.festagestor.service;

import br.com.festagestor.dto.DadosAtualizacaoCliente;
import br.com.festagestor.dto.DadosCadastroCliente;
import br.com.festagestor.dto.DadosListagemCliente;
import br.com.festagestor.model.Cliente;
import br.com.festagestor.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    //@PostMapping / Cadastrar
    public DadosListagemCliente cadastrar(DadosCadastroCliente dados) {
        Cliente cliente = new Cliente(dados);
        Cliente clienteSalvo = repository.save(cliente);
        return new DadosListagemCliente(clienteSalvo);
    }

    //@GetMapping / Listar
    public List<DadosListagemCliente> listar() {
        return repository.findAllByAtivoTrue().stream()
                .map(DadosListagemCliente::new)
                .toList();
    }

    //@DeleteMapping / Deletar
    @Transactional
    public void excluir(Long id) {
        Cliente cliente = repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado com o id: " + id));
        cliente.inativar();
    }

    //@PutMapping / Atualizar
    @Transactional
    public DadosListagemCliente atualizar(Long id, DadosAtualizacaoCliente atualizacaoCliente) {
        Cliente cliente = repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado com o id: " + id));
        cliente.atualizarInformacoes(atualizacaoCliente);
        return new DadosListagemCliente(cliente);
    }
}
