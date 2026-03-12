# 🎪 FestaGestor API

![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)

O **FestaGestor** é uma API REST desenvolvida em Java com Spring Boot para resolver os desafios logísticos e operacionais de uma empresa de aluguel de artigos para festas. O sistema substitui controles manuais, automatizando a gestão do acervo, o cadastro de clientes e o ciclo de vida dos contratos de aluguel.

## 🚀 O Problema que Resolvemos
Evitar o "overbooking" de itens (alugar o mesmo pula-pula para duas festas no mesmo dia), manter o histórico de clientes e ter controle absoluto sobre o que está no galpão disponível e o que está alugado.

## 🛠️ Tecnologias Utilizadas
* **Java 21** (Core Logic e Orientação a Objetos avançada)
* **Spring Boot** (Framework principal e criação da API REST)
* **Spring Data JPA / Hibernate** (Persistência de dados e ORM)
* **MySQL** (Banco de dados relacional)
* **Lombok** (Redução de boilerplate de código)

## 🏗️ Arquitetura e Modelagem de Dados
Um dos grandes diferenciais técnicos deste projeto é a aplicação do princípio de **Polimorfismo e Herança** no banco de dados.
O acervo é modelado com uma classe abstrata `Item`, que possui duas especializações: `Brinquedo` e `Decoracao`. 

Para a persistência, utilizamos a estratégia JPA **Single Table** (`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`), otimizando consultas ao banco de dados e permitindo o uso de um único `ItemRepository` para todo o acervo, diferenciado pela coluna discriminadora `tipo_item`.

## ⚙️ Como executar o projeto localmente

### 1. Pré-requisitos
* Java JDK 21+ instalado.
* Servidor MySQL rodando localmente (na porta `3306`).
* Maven instalado.

### 2. Configuração do Banco de Dados
Antes de rodar a aplicação, crie um banco de dados no seu MySQL ou garanta que o seu arquivo `src/main/resources/application.properties` esteja configurado com as suas credenciais locais:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/festagestor_db?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

### 3. Rodando a Aplicação
Clone o repositório, navegue até a pasta raiz e execute:

```bash
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

## 📌 Endpoints Principais (Acervo)

**Criar um novo Item (Brinquedo)**

`POST /item`

O payload deve obrigatoriamente conter o campo tipo_item para que o Jackson instancie a subclasse correta.

```bash
{
  "tipo_item": "Brinquedo",
  "nome": "Cama Elástica",
  "estoque": 2,
  "disponivel": true,
  "capacidade": 4
}
```

**Deletar um Item**

`DELETE /item/{id}`

Deleta um item do acervo com base no seu ID gerado pelo banco.

_Projeto em constante evolução como parte de aprimoramento em Arquitetura de Software e Java Backend._

