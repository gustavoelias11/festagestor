package br.com.festagestor.dto;

import br.com.festagestor.model.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosCadastroDecoracao(
        @NotBlank
        String nome,
        @NotBlank
        String descricao,
        @NotNull
        BigDecimal precoAluguel,
        @NotNull
        Status status,
        @NotBlank
        String tema
) implements DadosCadastroItem  {
}
