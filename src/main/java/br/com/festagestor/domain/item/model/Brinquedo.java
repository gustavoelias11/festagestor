package br.com.festagestor.domain.item.model;

import br.com.festagestor.domain.item.dto.DadosAtualizacaoBrinquedo;
import br.com.festagestor.domain.item.dto.DadosCadastroBrinquedo;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Brinquedo")
@NoArgsConstructor
@Getter
public class Brinquedo extends Item{
    private int capacidade;
    private String dimensao;

    //this.nome, this.descricao, this.precoAluguel, this.status, this.capacidade, this.dimensao
    public Brinquedo(String nome, String descricao, BigDecimal precoAluguel, Status status, int capacidade, String dimensao) {
        super(nome, descricao, precoAluguel, status);
        this.capacidade = capacidade;
        this.dimensao = dimensao;
    }

    public void atualizarInformacoes(DadosAtualizacaoBrinquedo dados) {
        if (dados.nome() != null) {
            this.setNome(dados.nome());
        }
        if (dados.descricao() != null) {
            this.setDescricao(dados.descricao());
        }
        if (dados.precoAluguel() != null) {
            this.setPrecoAluguel(dados.precoAluguel());
        }
        if (dados.status() != null) {
            this.setStatus(dados.status());
        }
        if (dados.capacidade() != null) {
            this.capacidade = dados.capacidade();
        }
        if (dados.dimensao() != null) {
            this.dimensao = dados.dimensao();
        }
    }
}
