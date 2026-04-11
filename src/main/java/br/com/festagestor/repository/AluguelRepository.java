package br.com.festagestor.repository;

import br.com.festagestor.model.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
}
