package br.com.festagestor.dto;

public record DadosAtualizacaoCliente(
        String nome,
        String telefone,
        DadosAtualizacaoEndereco endereco
) {
}
