package br.com.festagestor.model;

import br.com.festagestor.dto.DadosAtualizacaoBrinquedo;
import br.com.festagestor.dto.DadosCadastroBrinquedo;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("Brinquedo")
@NoArgsConstructor
@Getter
public class Brinquedo extends Item{
    private int capacidade;
    private String dimensao;

    public Brinquedo(DadosCadastroBrinquedo dados) {
        super(dados.nome(), dados.descricao(), dados.precoAluguel(), dados.status());
        this.capacidade = dados.capacidade();
        this.dimensao = dados.dimensao();
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
