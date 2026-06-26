package br.com.festagestor.domain.shared.endereco.controller;

import br.com.festagestor.domain.shared.endereco.DadosListagemEndereco;
import br.com.festagestor.domain.shared.endereco.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/consulta-cep/{cep}")
    public ResponseEntity<DadosListagemEndereco> consultarCep(@PathVariable String cep){
        return ResponseEntity.ok(enderecoService.consultarCep(cep));
    }
}
