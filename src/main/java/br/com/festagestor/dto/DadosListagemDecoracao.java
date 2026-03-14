package br.com.festagestor.dto;

import br.com.festagestor.model.Decoracao;
import br.com.festagestor.model.Status;

import java.math.BigDecimal;

public record DadosListagemDecoracao(
        Long id,
        String nome,
        String descricao,
        BigDecimal precoAluguel,
        Status status,
        String tema
) implements DadosListagemItem {
    public DadosListagemDecoracao(Decoracao decoracao) {
        this(
                decoracao.getId(),
                decoracao.getNome(),
                decoracao.getDescricao(),
                decoracao.getPrecoAluguel(),
                decoracao.getStatus(),
                decoracao.getTema()
        );
    }
}
