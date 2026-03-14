package br.com.festagestor.model;

import br.com.festagestor.dto.DadosAtualizacaoDecoracao;
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
