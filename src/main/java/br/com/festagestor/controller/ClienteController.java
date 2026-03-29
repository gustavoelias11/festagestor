package br.com.festagestor.controller;

import br.com.festagestor.dto.DadosAtualizacaoCliente;
import br.com.festagestor.dto.DadosCadastroCliente;
import br.com.festagestor.dto.DadosListagemCliente;
import br.com.festagestor.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<DadosListagemCliente> cadastrar(@RequestBody @Valid DadosCadastroCliente dados, UriComponentsBuilder uriBuilder) {
        var clienteDto = service.cadastrar(dados);
        var uri = uriBuilder.path("/clientes/{id}").buildAndExpand(clienteDto.id()).toUri();
        return ResponseEntity.created(uri).body(clienteDto);
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemCliente>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosListagemCliente> atualizar(@PathVariable Long id, @RequestBody @Valid DadosAtualizacaoCliente atualizacaoCliente) {
        var retorno = service.atualizar(id, atualizacaoCliente);
        return ResponseEntity.ok(retorno);
    }
}
