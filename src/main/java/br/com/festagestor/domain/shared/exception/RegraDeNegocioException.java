package br.com.festagestor.domain.shared.exception;

public class RegraDeNegocioException extends RuntimeException{
    public RegraDeNegocioException(String mensagem) {
        super(mensagem);
    }
}
