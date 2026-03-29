package br.com.festagestor.dto;

public record DadosAtualizacaoCliente(
        String nome,
        String cpf,
        String telefone,
        DadosAtualizacaoEndereco endereco
) {
}
