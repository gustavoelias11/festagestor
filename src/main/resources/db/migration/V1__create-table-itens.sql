CREATE TABLE itens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(31) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100),
    preco_aluguel DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    capacidade INT,
    dimensao VARCHAR(20),
    tema VARCHAR(100)
);