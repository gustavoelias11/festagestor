package br.com.festagestor.domain.cliente.dto;

import br.com.festagestor.domain.cliente.model.Cliente;
import br.com.festagestor.domain.shared.endereco.DadosListagemEndereco;

public record DadosListagemCliente(
        Long id,
        String nome,
        String telefone,
        DadosListagemEndereco endereco
) {
    public DadosListagemCliente(Cliente cliente) {
        this(cliente.getId(), cliente.getNome(), cliente.getTelefone(), new DadosListagemEndereco(cliente.getEndereco()));
    }
}
