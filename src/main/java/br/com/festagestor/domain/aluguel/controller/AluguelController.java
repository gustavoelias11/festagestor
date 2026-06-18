package br.com.festagestor.domain.aluguel.controller;

import br.com.festagestor.domain.aluguel.dto.DadosCadastroAluguel;
import br.com.festagestor.domain.aluguel.dto.DadosDetalhamentoAluguel;
import br.com.festagestor.domain.aluguel.service.AluguelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/alugueis")
public class AluguelController {
    @Autowired
    private AluguelService service;

    @PostMapping
    public ResponseEntity<DadosDetalhamentoAluguel> cadastrar(@RequestBody @Valid DadosCadastroAluguel dados, UriComponentsBuilder uriBuilder) {
        var aluguelDto = service.cadastrar(dados);
        var uri = uriBuilder.path("/alugueis/{id}").buildAndExpand(aluguelDto.id()).toUri();
        return ResponseEntity.created(uri).body(aluguelDto);
    }

    @GetMapping
    public ResponseEntity<Page<DadosDetalhamentoAluguel>> listar(@PageableDefault(size = 10, sort = {"dataCriacao"}) Pageable paginacao){
        return ResponseEntity.ok(service.listar(paginacao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoAluguel> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<DadosDetalhamentoAluguel> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelarAluguel(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<DadosDetalhamentoAluguel> finalizar(@PathVariable Long id) {
        return ResponseEntity.ok(service.finalizarAluguel(id));
    }
}
