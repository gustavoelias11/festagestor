package br.com.festagestor.domain.item.model;

import br.com.festagestor.domain.item.dto.DadosAtualizacaoDecoracao;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Decoracao")
@NoArgsConstructor
@Getter
public class Decoracao extends Item{
    private String tema;

    public Decoracao(String nome, String descricao, BigDecimal preco, Status status, String tema) {
        super(nome, descricao, preco, status);
        this.tema = tema;
    }

    public void atualizarInformacoes(DadosAtualizacaoDecoracao dados) {
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
        if (dados.tema() != null) {
            this.tema = dados.tema();
        }
    }
}
