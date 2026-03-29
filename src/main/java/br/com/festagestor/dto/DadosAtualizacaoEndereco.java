package br.com.festagestor.dto;

public record DadosAtualizacaoEndereco(
        String logradouro,
        String numero,
        String bairro,
        String complemento,
        String cidade,
        String uf,
        String cep
) {
}
