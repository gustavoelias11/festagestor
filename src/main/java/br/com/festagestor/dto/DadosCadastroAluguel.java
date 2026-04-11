package br.com.festagestor.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record DadosCadastroAluguel(
        @NotNull
        Long idCliente,
        @Valid
        DadosCadastroEndereco endereco,
        @NotNull
        LocalDateTime dataEntrega,
        @NotNull
        LocalDateTime dataRetirada,
        @NotNull
        @NotEmpty
        @Valid
        List<DadosCadastroAluguelItem> item
) {
}
