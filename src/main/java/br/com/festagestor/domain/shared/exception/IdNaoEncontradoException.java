package br.com.festagestor.domain.shared.exception;

public class IdNaoEncontradoException extends RuntimeException{
    public IdNaoEncontradoException(String tipo, Long id) {
        super(String.format("%s não encontrado com o ID: %d", tipo, id));
    }
}
