package br.com.festagestor.domain.aluguel.model;

import br.com.festagestor.domain.aluguel.dto.DadosCadastroAluguel;
import br.com.festagestor.domain.cliente.model.Cliente;
import br.com.festagestor.domain.shared.endereco.Endereco;
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

    @Column(name = "acrescimo")
    private BigDecimal valorAcrescimo;
    @Column(name = "desconto")
    private BigDecimal valorDesconto;
    @Column(name = "valor_frete")
    private BigDecimal valorFrete;
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
        this.valorAcrescimo = dadosCadastroAluguel.valorAcrescimo();
        this.valorDesconto = dadosCadastroAluguel.valorDesconto();
        this.valorFrete = dadosCadastroAluguel.valorFrete();
    }

    public void calcularValorTotal() {
        this.valorTotal = BigDecimal.ZERO;

        BigDecimal subTotal;

        for (AluguelItem item : itens) {
            subTotal = item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));
            this.valorTotal = this.valorTotal.add(subTotal);
        }
        this.valorTotal = this.valorTotal.add(valorAcrescimo).add(valorFrete).subtract(valorDesconto);
    }

    public void cancelar() {
        if (this.status == StatusAluguel.FINALIZADO) {
            throw new RuntimeException("Aluguel finalizado não pode ser cancelados!");
        }
        this.status = StatusAluguel.CANCELADO;
    }

    public void finalizar() {
        if (this.status != StatusAluguel.CONFIRMADO && this.status != StatusAluguel.MONTADO) {
            throw new RuntimeException("Apenas aluguéis confirmados ou montados podem ser finalizados!");
        }

        this.status = StatusAluguel.FINALIZADO;
    }

    public void montar() {
        if (this.status == StatusAluguel.CONFIRMADO) {
            this.status = StatusAluguel.MONTADO;
        } else {
            throw new RuntimeException("Apenas aluguéis confirmados podem ser montados!");
        }
    }

    public void confirmar() {
        if (this.status == StatusAluguel.PENDENTE) {
            this.status = StatusAluguel.CONFIRMADO;
        } else {
            throw new RuntimeException("Apenas aluguéis pendentes podem ser confirmados!");
        }
    }
}
