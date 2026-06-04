package br.com.festagestor.repository;

import br.com.festagestor.model.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    @Query("""
        SELECT CASE WHEN COUNT(ai) > 0 THEN true ELSE false END
        FROM AluguelItem ai
        WHERE ai.item.id = :itemId
        AND ai.aluguel.dataEntrega <= :dataRetiradaNova
        AND ai.aluguel.dataRetirada >= :dataEntregaNova
        """)
    boolean existsAluguelConflict(@Param("itemId") Long itemId,
                                  @Param("dataEntregaNova") LocalDateTime dataEntregaNova,
                                  @Param("dataRetiradaNova") LocalDateTime dataRetiradaNova);
}
