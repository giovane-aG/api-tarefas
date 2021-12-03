# api-tarefas-giovane-aG
api-tarefas-giovane-aG created by GitHub Classroom

## Tecnologias utilizadas 💻

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org)
- [Knex](https://knexjs.org/)
- [MySQL](https://www.mysql.com/)
## Instalação 🔧
### Instalando o MySQL
- É necessário ter o NodeJS instalado.
- É necessário ter o mysql instalado rodando na porta 3306. Para facilitar o processo de instalação é possível utilizar o [Xampp](https://www.apachefriends.org/download.html).
- Após instalado o Xampp, ligar o MySQL clicando no "Start".

### Clonando projeto
- Clone o repositório
- Dentro da pasta do projeto, execute npm install, para instalar as dependências
- Certifique-se que o MySQL está ligado
- Dentro da pasta src/database/migrations existe um script chamado createTodosDatabase. Execute npx ts-node src/database/migrations/createTodosDatabase.ts, esse script criará uma base de dados chamada todos_database.
- Se nenhum erro apareceu no terminal, execute npx knex migrate:up 20211018010644_createTableTodos.ts (criará a tabela 'todos' na base de dados)
- Execute npm run dev-server para iniciar a aplicação
- Utilize um cliente http como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download) para realizar as chamadas à api

## Funcionalidades da API
- Url base: http://localhost:3000
- Get /tarefas: retornar uma lista com todas as tarefas.
- Get /tarefas/{identificador}: retornar a tarefa correspondente ao identificador.
- Post /tarefas: incluir uma tarefa; os dados da tarefa devem ser passados no corpo da requisição HTTP.
- Delete /tarefas/{identificador}: excluir a tarefa correspondente ao identificador.
- Put /tarefas/{identificador}: alterar os dados da tarefa correspondente ao identificador; os novos dados devem ser passados no corpo da requisição HTTP.


![image](https://user-images.githubusercontent.com/55203155/137647912-b8fc3346-c901-4943-8c4d-e0cca05d44d7.png)
![image](https://user-images.githubusercontent.com/55203155/137647930-ae50b987-d3ba-4e7a-ba59-b85af1d416c0.png)
