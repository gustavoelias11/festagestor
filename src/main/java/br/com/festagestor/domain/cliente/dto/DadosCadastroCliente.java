package br.com.festagestor.domain.cliente.dto;

import br.com.festagestor.domain.shared.endereco.DadosCadastroEndereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

public record DadosCadastroCliente(
        @NotBlank
        String nome,
        @NotBlank
        @CPF
        String cpf,
        @NotBlank
        String telefone,
        @NotNull
        @Valid
        DadosCadastroEndereco endereco
) {
}
