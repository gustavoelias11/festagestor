package br.com.festagestor.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "alugueis")
@Getter
@NoArgsConstructor
public class Aluguel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataCriacao;
    private LocalDateTime dataEntrega;
    private LocalDateTime dataRetirada;

    @Enumerated(EnumType.STRING)
    private StatusAluguel status;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    @OneToMany(mappedBy = "aluguel", cascade = CascadeType.ALL)
    private List<AluguelItem> itens;

    private BigDecimal valorTotal;

    @Embedded
    private Endereco endereco;
}
