package br.com.festagestor.domain.aluguel.dto;

import br.com.festagestor.domain.aluguel.model.AluguelItem;

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
