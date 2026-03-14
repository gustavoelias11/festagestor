package br.com.festagestor.dto;

import br.com.festagestor.model.Status;

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
