CREATE TABLE alugueis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_criacao DATE NOT NULL,
    data_entrega DATETIME NOT NULL,
    data_retirada DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    cliente_id BIGINT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    complemento VARCHAR(50),
    cidade VARCHAR(50) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    CONSTRAINT fk_alugueis_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);