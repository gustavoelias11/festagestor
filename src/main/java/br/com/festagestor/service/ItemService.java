package br.com.festagestor.service;

import br.com.festagestor.dto.DadosCadastroBrinquedo;
import br.com.festagestor.dto.DadosCadastroDecoracao;
import br.com.festagestor.dto.DadosCadastroItem;
import br.com.festagestor.model.Brinquedo;
import br.com.festagestor.model.Decoracao;
import br.com.festagestor.model.Item;
import br.com.festagestor.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    public Item cadastrar(DadosCadastroItem dados) {
        if (dados instanceof DadosCadastroBrinquedo brinquedoDados) {
            Brinquedo brinquedo = new Brinquedo(brinquedoDados);
            return repository.save(brinquedo);
        }
        if (dados instanceof DadosCadastroDecoracao decoracaoDados) {
            Decoracao decoracao = new Decoracao(decoracaoDados);
            return repository.save(decoracao);
        }
        return null;
    }
}
