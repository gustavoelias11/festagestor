package br.com.festagestor.infra.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class TratadorDeErrosGlobais {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErroValidacaoDTO>> tratadorErro400(MethodArgumentNotValidException ex) {
        var errosDoSpring = ex.getFieldErrors();

        var listaDeErros = errosDoSpring.stream()
                .map(ErroValidacaoDTO::new)
                .toList();

        return ResponseEntity.badRequest().body(listaDeErros);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroPadraoDTO> tratarErroDeDesserializacao(HttpMessageNotReadableException ex) {
        String message = "Corpo da requisição ausente ou mal formatado.";

        return ResponseEntity.badRequest().body(new ErroPadraoDTO(message));
    }
}
