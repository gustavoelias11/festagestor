package br.com.festagestor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DadosCadastroEndereco(
        @NotBlank
        String logradouro,
        @NotBlank
        String numero,
        @NotBlank
        String bairro,
        String complemento,
        @NotBlank
        String cidade,
        @NotBlank
        @Size(min = 2, max = 2)
        String uf,
        @NotBlank
        @Pattern(regexp = "^\\d{5}-?\\d{3}$", message = "Formato de CEP inválido")
        String cep
) {
}
