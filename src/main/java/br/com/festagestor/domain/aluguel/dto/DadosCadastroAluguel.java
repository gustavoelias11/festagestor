package br.com.festagestor.domain.aluguel.dto;

import br.com.festagestor.domain.shared.endereco.DadosCadastroEndereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
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
        @PositiveOrZero
        BigDecimal valorAcrescimo,
        @NotNull
        @PositiveOrZero
        BigDecimal valorDesconto,
        @NotNull
        @PositiveOrZero
        BigDecimal valorFrete,
        @NotNull
        @NotEmpty
        @Valid
        List<DadosCadastroAluguelItem> item

) {
}
