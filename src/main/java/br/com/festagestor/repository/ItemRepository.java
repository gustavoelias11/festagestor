package br.com.festagestor.repository;

import br.com.festagestor.dto.DadosListagemItem;
import br.com.festagestor.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository <Item, Long> {
    List<Item> findAllByAtivoTrue();
}
