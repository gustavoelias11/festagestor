package br.com.festagestor.domain.cliente.dto;

import br.com.festagestor.domain.shared.endereco.DadosAtualizacaoEndereco;

public record DadosAtualizacaoCliente(
        String nome,
        String telefone,
        DadosAtualizacaoEndereco endereco
) {
}
