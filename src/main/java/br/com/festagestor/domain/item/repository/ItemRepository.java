package br.com.festagestor.domain.item.repository;

import br.com.festagestor.domain.item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository <Item, Long> {
    List<Item> findAllByAtivoTrue();
}
