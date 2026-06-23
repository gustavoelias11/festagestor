package br.com.festagestor.infra.api.viacep.service;

import br.com.festagestor.infra.api.viacep.dto.ViaCepResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ViaCepClient {

    private final RestClient restClient;

    public ViaCepClient(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("https://viacep.com.br").build();
    }

    public ViaCepResponse buscaCepViaCep(String cep) {
        ViaCepResponse respostaSuja = restClient.get()
                .uri("/ws/{cep}/json/", cep)
                .retrieve()
                .body(ViaCepResponse.class);

        if (respostaSuja == null || respostaSuja.cep() == null) {
            throw new RuntimeException("Cep não encontrado!");
        }
        return respostaSuja;
    }
}
