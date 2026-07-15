package br.com.festagestor.domain.item.dto;

import br.com.festagestor.domain.item.model.Brinquedo;
import br.com.festagestor.domain.item.model.Status;
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
        String dimensao,
        @Positive
        int quantidade
) implements DadosCadastroItem {
    public Brinquedo instanciarEntidade() {
        return new Brinquedo(this.nome, this.descricao, this.precoAluguel, this.status, this.capacidade, this.dimensao);
    }
}
