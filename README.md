# FestaGestor - Back-end 🎈

> API RESTful desenvolvida em Java e Spring Boot para o gerenciamento eficiente de aluguel de artigos para festas (Brinquedos e Decorações).

## 💻 Sobre o Projeto
O **FestaGestor** é o motor de back-end (API) de uma plataforma de gestão de eventos. Ele foi projetado para lidar com o catálogo de itens de forma polimórfica, garantindo integridade de dados e escalabilidade para futuras implementações de clientes e contratos de aluguel.

## 🛠️ Tecnologias Utilizadas
* **Linguagem:** Java 21
* **Framework:** Spring Boot 3.x
* **Persistência e ORM:** Spring Data JPA / Hibernate
* **Banco de Dados:** MySQL
* **Ferramentas:** Lombok (Redução de boilerplate), Jackson (Serialização JSON polimórfica)

## 🧠 Arquitetura e Padrões Aplicados
Este projeto não é apenas um CRUD básico. Foram aplicados padrões de mercado para garantir a qualidade do software:

* **Herança e Polimorfismo no Banco (SINGLE_TABLE):** Uso da classe abstrata `Item` mapeando para as classes filhas `Brinquedo` e `Decoracao` em uma única tabela, com colunas discriminadoras.
* **Polimorfismo em JSON:** Configuração do Jackson (`@JsonTypeInfo`, `@JsonSubTypes`) para receber e devolver payloads diferentes dependendo do tipo do item.
* **Pattern DTO (Data Transfer Object):** Isolamento total das Entidades de banco de dados. A API utiliza DTOs específicos para Cadastro, Atualização e Listagem, evitando vazamento de dados.
* **Exclusão Lógica (Soft Delete):** Os registros não são apagados fisicamente do banco de dados (para não quebrar o histórico de relatórios e contratos futuros). O sistema utiliza uma flag `ativo` e *Query Methods* customizados (`findAllByAtivoTrue`) para ocultar itens excluídos.
* **Pattern Matching (Java 21):** Uso do novo recurso de *Pattern Matching para instanceof* para conversões seguras e limpas entre Entidades e DTOs na camada de Service.

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Java 21 ou superior
* Maven
* MySQL Server rodando localmente (porta 3306)

### Passos para rodar

1. Clone este repositório:
   ```bash
   git clone https://github.com/gustavoelias11/festagestor.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd FestaGestor-Backend
   ```

3. Configure as variáveis de ambiente do banco de dados:
    * Vá até a pasta `src/main/resources/`.
    * Faça uma cópia do arquivo `application.properties.example` e renomeie para `application.properties`.
    * Preencha as credenciais do seu banco de dados local.

4. Execute a aplicação pela sua IDE ou via Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

## 📡 Endpoints Principais (API de Itens)

Abaixo estão as rotas disponíveis no `ItemController` (`/itens`):

| Método | Rota         | Descrição                                         |
| :---   | :---         | :---                                              |
| GET    | `/itens`     | Lista todos os itens disponíveis (Soft Delete)    |
| POST   | `/itens`     | Cadastra um novo item (Brinquedo ou Decoração)    |
| PUT    | `/itens/{id}`| Atualiza os dados de um item existente            |
| DELETE | `/itens/{id}`| Realiza a exclusão lógica (inativação) do item    |