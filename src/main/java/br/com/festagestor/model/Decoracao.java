package br.com.festagestor.model;

import br.com.festagestor.dto.DadosCadastroDecoracao;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("Decoracao")
@NoArgsConstructor
@Getter
public class Decoracao extends Item{
    private String tema;

    public Decoracao(DadosCadastroDecoracao dados) {
        super(dados.nome(), dados.descricao(), dados.precoAluguel(), dados.status());
        this.tema = dados.tema();
    }
}
