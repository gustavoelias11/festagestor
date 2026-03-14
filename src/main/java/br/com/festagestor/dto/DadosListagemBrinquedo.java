package br.com.festagestor.dto;

import br.com.festagestor.model.Brinquedo;
import br.com.festagestor.model.Decoracao;
import br.com.festagestor.model.Status;

import java.math.BigDecimal;

public record DadosListagemBrinquedo(
        Long id,
        String nome,
        String descricao,
        BigDecimal precoAluguel,
        Status status,
        int capacidade,
        String dimensao
) implements DadosListagemItem {
    public DadosListagemBrinquedo(Brinquedo brinquedo) {
        this(
                brinquedo.getId(),
                brinquedo.getNome(),
                brinquedo.getDescricao(),
                brinquedo.getPrecoAluguel(),
                brinquedo.getStatus(),
                brinquedo.getCapacidade(),
                brinquedo.getDimensao()
        );
    }
}
