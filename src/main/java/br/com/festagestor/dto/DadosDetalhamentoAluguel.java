package br.com.festagestor.dto;

import br.com.festagestor.model.Aluguel;
import br.com.festagestor.model.StatusAluguel;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record DadosDetalhamentoAluguel(
        Long id,
        String nomeCliente,
        LocalDateTime dataEntrega,
        LocalDateTime dataRetirada,
        DadosListagemEndereco endereco,
        List<DadosDetalhamentoAluguelItem> itens,
        StatusAluguel status,
        BigDecimal valorTotal
) {
    public DadosDetalhamentoAluguel(Aluguel aluguel) {
        this(aluguel.getId(), aluguel.getCliente().getNome(), aluguel.getDataEntrega(), aluguel.getDataRetirada(),
                new DadosListagemEndereco(aluguel.getEndereco()),
                aluguel.getItens().stream().map(DadosDetalhamentoAluguelItem::new).toList(),
                aluguel.getStatus(), aluguel.getValorTotal());
    }
}
