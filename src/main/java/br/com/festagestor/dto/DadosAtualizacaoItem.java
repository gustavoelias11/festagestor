package br.com.festagestor.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "tipo"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = DadosAtualizacaoBrinquedo.class, name = "brinquedo"),
        @JsonSubTypes.Type(value = DadosAtualizacaoDecoracao.class, name = "decoracao")
})

public interface DadosAtualizacaoItem {
}
