package br.com.festagestor.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "tipo"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = DadosCadastroBrinquedo.class, name = "brinquedo"),
        @JsonSubTypes.Type(value = DadosCadastroDecoracao.class, name = "decoracao")
})

public interface DadosCadastroItem{
}
