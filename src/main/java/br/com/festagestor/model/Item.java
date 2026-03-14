package br.com.festagestor.model;

import br.com.festagestor.dto.DadosAtualizacaoItem;
import br.com.festagestor.dto.DadosCadastroItem;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "itens")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
@Getter
@Setter
@NoArgsConstructor
public abstract class Item {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String nome;

    private String descricao;

    @Column(name = "preco_aluguel")
    private BigDecimal precoAluguel;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean ativo;

    public Item(String nome, String descricao, BigDecimal precoAluguel, Status status) {
        this.nome = nome;
        this.descricao = descricao;
        this.precoAluguel = precoAluguel;
        this.status = status;
        this.ativo = true;
    }

    public void inativar() {
        this.ativo = false;
    }
}
