package br.com.festagestor.dto;

import br.com.festagestor.model.Cliente;

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
