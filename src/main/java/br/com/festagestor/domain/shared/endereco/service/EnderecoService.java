package br.com.festagestor.domain.shared.endereco.service;

import br.com.festagestor.domain.shared.endereco.DadosListagemEndereco;
import br.com.festagestor.infra.api.viacep.dto.ViaCepResponse;
import br.com.festagestor.infra.api.viacep.service.ViaCepClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    @Autowired
    private ViaCepClient viaCepClient;

    public DadosListagemEndereco consultarCep(String cep) {
        ViaCepResponse respostaSuja = viaCepClient.buscaCepViaCep(cep);

        return new DadosListagemEndereco(
                respostaSuja.logradouro(),
                null,
                respostaSuja.bairro(),
                respostaSuja.complemento(),
                respostaSuja.localidade(),
                respostaSuja.uf(),
                respostaSuja.cep()
        );
    }
}
