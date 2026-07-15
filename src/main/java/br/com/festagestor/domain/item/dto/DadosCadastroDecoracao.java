package br.com.festagestor.domain.item.dto;

import br.com.festagestor.domain.item.model.Decoracao;
import br.com.festagestor.domain.item.model.Status;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

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
        String tema,
        @Positive
        int quantidade
) implements DadosCadastroItem  {
    @Override
    public Decoracao instanciarEntidade() {
        return new Decoracao(this.nome, this.descricao, this.precoAluguel, this.status, this.tema);
    }
}
