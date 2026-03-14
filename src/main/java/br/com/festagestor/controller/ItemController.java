package br.com.festagestor.controller;

import br.com.festagestor.dto.DadosAtualizacaoItem;
import br.com.festagestor.dto.DadosCadastroItem;
import br.com.festagestor.dto.DadosListagemItem;
import br.com.festagestor.model.Item;
import br.com.festagestor.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
public class ItemController {

    @Autowired
    private ItemService service;

    @PostMapping
    @Transactional
        public ResponseEntity<Item> cadastrar(@RequestBody @Valid DadosCadastroItem dados) {
        Item itemCriado = service.cadastrar(dados);
        return ResponseEntity.ok(itemCriado);
    }

    @GetMapping
    public List<DadosListagemItem> listar() {
        return service.listar();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosListagemItem> atualizar(@PathVariable Long id, @RequestBody @Valid DadosAtualizacaoItem atualizacaoItem) {
        var retorno = service.atualizar(id, atualizacaoItem);
        return ResponseEntity.ok(retorno);
    }
}
