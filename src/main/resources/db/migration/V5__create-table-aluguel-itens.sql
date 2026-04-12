CREATE TABLE aluguel_itens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    aluguel_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT fk_aluguel_itens_aluguel FOREIGN KEY (aluguel_id) REFERENCES alugueis(id),
    CONSTRAINT fk_aluguel_itens_item FOREIGN KEY (item_id) REFERENCES itens(id)
);