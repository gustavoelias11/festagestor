package br.com.festagestor.dto;

import br.com.festagestor.model.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record DadosCadastroBrinquedo(
        @NotBlank
        String nome,
        @NotBlank
        String descricao,
        @NotNull
        BigDecimal precoAluguel,
        @NotNull
        Status status,
        @Positive
        int capacidade,
        @NotBlank
        String dimensao
) implements DadosCadastroItem {
}
