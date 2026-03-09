package br.com.festagestor.model;

import br.com.festagestor.dto.DadosCadastroBrinquedo;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("Brinquedo")
@NoArgsConstructor
public class Brinquedo extends Item{
    private int capacidade;
    private String dimensao;

    public Brinquedo(DadosCadastroBrinquedo dados) {
        super(dados.nome(), dados.descricao(), dados.precoAluguel(), dados.status());
        this.capacidade = dados.capacidade();
        this.dimensao = dados.dimensao();
    }
}
