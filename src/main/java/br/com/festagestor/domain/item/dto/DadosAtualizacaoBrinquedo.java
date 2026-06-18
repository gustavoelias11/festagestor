package br.com.festagestor.domain.item.dto;

import br.com.festagestor.domain.item.model.Status;

import java.math.BigDecimal;

public record DadosAtualizacaoBrinquedo(
        String nome,
        String descricao,
        BigDecimal precoAluguel,
        Status status,
        Integer capacidade,
        String dimensao
) implements DadosAtualizacaoItem {
}
