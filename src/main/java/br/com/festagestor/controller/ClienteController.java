package br.com.festagestor.controller;

import br.com.festagestor.dto.DadosCadastroCliente;
import br.com.festagestor.dto.DadosListagemCliente;
import br.com.festagestor.model.Cliente;
import br.com.festagestor.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<DadosListagemCliente> cadastrar(@RequestBody @Valid DadosCadastroCliente dados) {
        var clienteDto = service.cadastrar(dados);
        return ResponseEntity.ok(clienteDto);
    }

}
