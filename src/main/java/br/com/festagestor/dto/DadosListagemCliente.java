package br.com.festagestor.dto;

import br.com.festagestor.model.Cliente;

public record DadosListagemCliente(
        Long id,
        String nome
) {
    public DadosListagemCliente(Cliente cliente) {
        this(cliente.getId(), cliente.getNome());
    }
}
