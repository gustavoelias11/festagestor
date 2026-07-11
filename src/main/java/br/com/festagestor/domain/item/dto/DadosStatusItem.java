package br.com.festagestor.domain.item.dto;

import br.com.festagestor.domain.item.model.Item;
import br.com.festagestor.domain.item.model.Status;

public record DadosStatusItem(
        Long id,
        String nome,
        String descricao,
        Status status
) {
    public DadosStatusItem(Item item) {
        this(item.getId(), item.getNome(), item.getDescricao(), item.getStatus());
    }
}
