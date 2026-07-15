package br.com.festagestor.domain.item.controller;

import br.com.festagestor.domain.item.dto.DadosAtualizacaoItem;
import br.com.festagestor.domain.item.dto.DadosCadastroItem;
import br.com.festagestor.domain.item.dto.DadosListagemItem;
import br.com.festagestor.domain.item.dto.DadosStatusItem;
import br.com.festagestor.domain.item.model.Item;
import br.com.festagestor.domain.item.service.ItemService;
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
        public ResponseEntity<List<DadosListagemItem>> cadastrar(@RequestBody @Valid DadosCadastroItem dados) {
        var itemCriado = service.cadastrar(dados);
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

    @PatchMapping("/{id}/manutencao")
    public ResponseEntity<DadosStatusItem> colocarEmManutencao(@PathVariable Long id) {
        return ResponseEntity.ok(service.colocarEmManutencao(id));
    }
}
