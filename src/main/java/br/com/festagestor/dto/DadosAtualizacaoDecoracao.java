package br.com.festagestor.dto;

import br.com.festagestor.model.Status;

import java.math.BigDecimal;

public record DadosAtualizacaoDecoracao(
        String nome,
        String descricao,
        BigDecimal precoAluguel,
        Status status,
        String tema
) implements DadosAtualizacaoItem {
}
