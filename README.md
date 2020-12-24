# Linx Impulse - Desafio Técnico Desenvolvedor Fullstack

Este projeto é um sistema para exibir as vitrines de recomendação
de um site.


# Tecnologias utilizadas

* Nodejs
* Postgresql
* Reactjs
* Knex
* Bootstrap
* Docker


## Estrutura das pastas
Explicarei a seguir a função de cada pasta


### Backend
A api do sistema tem como função integrar os dados fornecidos pelo arquivo catalog.json e pela api de recomendações que retorna um arquivo json que é consumido pela api.

### Frontend
Aplicação que consome o backend para dispor as informações ao cliente.


## Como executar o projeto?

### Requisito
Crie um banco de dados chamado "dbloja"

### Clone
Faça o clone do projeto utilizando a url acima.

### Instalação
Execute o comando "npm install" nas pastas frontend e backend. Após isso, estando na pasta backend, digite o comando "npx knex migrate:latest".

### Execução
Execute o comando "npm start" nas pastas frontend e backend.
ou 
Execute diretamente o comando "docker-compose up --build"

Acesse o sistema pela url: http://localhost:3000



