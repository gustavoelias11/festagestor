package br.com.festagestor.dto;

import br.com.festagestor.model.AluguelItem;

import java.math.BigDecimal;

public record DadosDetalhamentoAluguelItem(
        Long id,
        String nomeItem,
        Integer quantidade,
        BigDecimal precoUnitario
) {
    public DadosDetalhamentoAluguelItem (AluguelItem aluguelItem) {
        this(aluguelItem.getId(), aluguelItem.getItem().getNome(), aluguelItem.getQuantidade(), aluguelItem.getPrecoUnitario());
    }
}
