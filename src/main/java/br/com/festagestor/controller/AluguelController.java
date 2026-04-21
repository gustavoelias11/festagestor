package br.com.festagestor.controller;

import br.com.festagestor.dto.DadosCadastroAluguel;
import br.com.festagestor.dto.DadosDetalhamentoAluguel;
import br.com.festagestor.service.AluguelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
