package br.com.festagestor.model;

import br.com.festagestor.dto.DadosCadastroAluguelItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "aluguel_itens")
@Getter
@NoArgsConstructor
public class AluguelItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluguel_id")
    private Aluguel aluguel;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "preco_unitario")
    private BigDecimal precoUnitario;

    private Integer quantidade;

    public AluguelItem(Aluguel aluguel, Item item, DadosCadastroAluguelItem dadosCadastroAluguelItem) {
        this.aluguel = aluguel;
        this.item = item;
        this.precoUnitario = item.getPrecoAluguel();
        this.quantidade = dadosCadastroAluguelItem.quantidade();
    }
}
