package br.com.festagestor.domain.shared.endereco;

public record DadosListagemEndereco(
        String logradouro,
        String numero,
        String bairro,
        String complemento,
        String cidade,
        String uf,
        String cep
) {
    public DadosListagemEndereco(Endereco endereco) {
        this(endereco.getLogradouro(), endereco.getNumero(), endereco.getBairro(), endereco.getComplemento(), endereco.getCidade(), endereco.getUf(), endereco.getCep());
    }
}
