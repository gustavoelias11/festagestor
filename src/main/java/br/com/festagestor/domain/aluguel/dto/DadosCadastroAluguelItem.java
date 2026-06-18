package br.com.festagestor.domain.aluguel.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DadosCadastroAluguelItem(
        @NotNull
        Long idItem,
        @NotNull
        @Positive
        Integer quantidade
) {
}
