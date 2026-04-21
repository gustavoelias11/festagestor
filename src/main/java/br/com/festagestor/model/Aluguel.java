package br.com.festagestor.model;

import br.com.festagestor.dto.DadosCadastroAluguel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "alugueis")
@Getter
@Setter
@NoArgsConstructor
public class Aluguel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_criacao")
    private LocalDate dataCriacao;
    @Column(name = "data_entrega")
    private LocalDateTime dataEntrega;
    @Column(name = "data_retirada")
    private LocalDateTime dataRetirada;

    @Enumerated(EnumType.STRING)
    private StatusAluguel status;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    @OneToMany(mappedBy = "aluguel", cascade = CascadeType.ALL)
    private List<AluguelItem> itens;

    @Column(name = "valor_total")
    private BigDecimal valorTotal;

    @Embedded
    private Endereco endereco;

    public Aluguel(Cliente cliente, DadosCadastroAluguel dadosCadastroAluguel, Endereco endereco) {
        this.dataCriacao = LocalDate.now();
        this.dataEntrega = dadosCadastroAluguel.dataEntrega();
        this.dataRetirada = dadosCadastroAluguel.dataRetirada();
        this.status = StatusAluguel.PENDENTE;
        this.cliente = cliente;
        this.endereco = endereco;
    }

    public void calcularValorTotal() {
        this.valorTotal = BigDecimal.ZERO;

        BigDecimal subTotal;

        for (AluguelItem item : itens) {
            subTotal = item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));
            this.valorTotal = this.valorTotal.add(subTotal);
        }
    }
}
