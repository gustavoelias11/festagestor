package br.com.festagestor.domain.item.dto;

import br.com.festagestor.domain.item.model.Status;

import java.math.BigDecimal;

public record DadosAtualizacaoDecoracao(
        String nome,
        String descricao,
        BigDecimal precoAluguel,
        Status status,
        String tema
) implements DadosAtualizacaoItem {
}
