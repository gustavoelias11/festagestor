package br.com.festagestor.domain.shared.endereco;

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
