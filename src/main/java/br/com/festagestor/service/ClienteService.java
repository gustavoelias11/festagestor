package br.com.festagestor.service;

import br.com.festagestor.dto.DadosCadastroCliente;
import br.com.festagestor.dto.DadosListagemCliente;
import br.com.festagestor.model.Cliente;
import br.com.festagestor.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public DadosListagemCliente cadastrar(DadosCadastroCliente dados) {
        Cliente cliente = new Cliente(dados);
        Cliente clienteSalvo = repository.save(cliente);
        return new DadosListagemCliente(clienteSalvo);
    }
}
