package br.com.festagestor.infra.api.viacep.service;

import br.com.festagestor.domain.shared.endereco.DadosListagemEndereco;
import br.com.festagestor.infra.api.viacep.dto.ViaCepResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ViaCepService {

    private final RestClient restClient = RestClient.create();

    public DadosListagemEndereco buscaCepViaCep(String cep) {
        ViaCepResponse respostaSuja = restClient.get()
                .uri("https://viacep.com.br/ws/"+ cep + "/json/")
                .retrieve()
                .body(ViaCepResponse.class);

        if (respostaSuja == null || respostaSuja.cep() == null) {
            throw new RuntimeException("Cep não encontrado!");
        }
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
