<h1 align="center">🥗 Daily Diet API</h1>

<p align="center">🥗 Uma aplicação RESTful desenvolvida para auxiliar no controle da alimentação diária.
  <br/><br/>
  <!-- Último commit -->
  <img src="https://img.shields.io/github/last-commit/joschonarth/node-daily-diet-api?style=for-the-badge&color=F28BA9&labelColor=1C1E26" alt="last-commit">
  <!-- Linguagem principal -->
  <img src="https://img.shields.io/github/languages/top/joschonarth/node-daily-diet-api?style=for-the-badge&color=B181F1&labelColor=1C1E26" alt="top-language">
  <!-- Contador de linguagens -->
  <img src="https://img.shields.io/github/languages/count/joschonarth/node-daily-diet-api?style=for-the-badge&color=61ffca&labelColor=1C1E26" alt="languages-count">
  <!-- Licença -->
  <img src="https://img.shields.io/github/license/joschonarth/node-daily-diet-api?style=for-the-badge&color=F28BA9&labelColor=1C1E26" alt="license">
</p>

## 📑 Índice

- [👀 Visão Geral](#-visão-geral)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Funcionalidades](#️-funcionalidades)
- [🔧 Instalação](#-instalação)
- [🔗 Endpoints](#-endpoints)
- [🔐 Autenticação](#-autenticação)
- [🤝 Contribuições](#-contribuições)
- [⭐ Apoie este Projeto](#-apoie-este-projeto)
- [📜 Licença](#-licença)
- [📞 Contato](#-contato)

## 👀 Visão Geral

O **Daily Diet API** é uma aplicação **RESTful** desenvolvida com o objetivo de facilitar o controle da alimentação diária dos usuários. Através dela, é possível registrar e gerenciar refeições, acompanhar estatísticas nutricionais e obter um resumo com dados relevantes da dieta. Com autenticação via JWT, integração com PostgreSQL e arquitetura moderna baseada em Node.js, Fastify e Prisma, a API proporciona uma experiência segura, eficiente e escalável para quem deseja manter hábitos alimentares mais organizados e saudáveis.

## 🛠️ Tecnologias Utilizadas

- 🟢 **Node.js**: Plataforma para execução do JavaScript no servidor.
- 🟦 **TypeScript**: Superset do JavaScript com tipagem estática.
- ⚡ **Fastify**: Framework web de alta performance para Node.js.
- 🗄️ **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- 🛠️ **Prisma**: ORM moderno para interações com o banco de dados.
- 🐳 **Docker**: Containerização para ambiente de desenvolvimento.
- 💎 **Zod**: Validação de esquemas e dados.
- 🔑 **JWT**: Autenticação baseada em tokens JSON Web Token.
- 🔐 **bcryptjs**: Biblioteca para hashing e verificação de senhas.
- 🌿 **Dotenv**: Gerenciamento de variáveis de ambiente.
- ✨ **ESLint**: Linter para garantir a qualidade do código.

## ⚙️ Funcionalidades

- 👤 **Criar usuário**: Permite registrar um novo usuário com senha criptografada.
- 🔑 **Login**: Autenticação via JWT.
- 🍽️ **Adicionar uma refeição**: Registra uma nova refeição no sistema.
- 🔍 **Retornar uma refeição específica**: Obtém detalhes de uma refeição.
- ✏️ **Atualizar uma refeição**: Altera os dados de uma refeição específica.
- ❌ **Deletar uma refeição**: Remove uma refeição do sistema.
- 📄 **Listar todas as refeições**: Retorna todas as refeições registradas pelo usuário.
- 📊 **Gerar resumo**: Calcula estatísticas das refeições do usuário.

## 🔧 Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/joschonarth/node-daily-diet-api.git
    cd node-daily-diet-api
    ```

2. **Crie um arquivo `.env` a partir do exemplo:**

    ```bash
    cp .env.example .env
    ```

    Edite o arquivo `.env` para configurar as variáveis de ambiente necessárias.

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. Inicie o banco de dados **PostgreSQL** utilizando o container **Docker** com a imagem ``bitnami/postgresql``:

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco de dados:**

    ```bash
    npx prisma migrate dev
    ```

6. **Inicie a aplicação:**

    ```bash
    npm run dev
    ```

    A API estará disponível em `http://localhost:3333`.

## 🔗 Endpoints

### 👤 Criar Usuário

- **Método**: `POST`
- **URL**: `/user`
- **Corpo da Requisição:**

    ```json
    {
        "username": "username",
        "email": "user@email.com",
        "password": "password"
    }
    ```

### 🔑 Login

- **Método**: `POST`
- **URL**: `/login`
- **Corpo da Requisição:**

    ```json
    {
        "email": "user@email.com",
        "password": "password"
    }
    ```

- **Resposta:**

    ```json
    {
        "token": "your_token"
    }
    ```

### 🍽️ Adicionar uma Refeição

- **Método**: `POST`
- **URL**: `/meals`
- **Corpo da Requisição:**

    ```json
    {
        "name": "Breakfast",
        "description": "Scrambled eggs and bread",
        "inDiet": false
    }
    ```

### 🔍 Retornar uma Refeição Específica

- **Método**: `GET`
- **URL**: `/meals/:id`
- **Resposta:**

    ```json
    {
        "id": "de3bf9e0-b9bc-4730-b615-269382edfef3",
        "name": "Breakfast",
        "description": "Scrambled eggs and wholemeal bread",
        "date": "2025-02-15T08:00:00",
        "inDiet": true,
        "userId": "f3c63f6b-9ece-4f4f-b812-e5f4dc9e0492"
    }
    ```

### ✏️ Atualizar uma Refeição

- **Método**: `POST`
- **URL**: `/meals:id`
- **Corpo da Requisição:**

    ```json
    {
        "description": "Scrambled eggs and wholemeal bread",
        "inDiet": true
    }
    ```

### ❌ Deletar uma Refeição

- **Método**: `POST`
- **URL**: `/meals/:id`
- **Resposta:**

    ```json
    {
        "message": "Meal deleted successfully"
    }
    ```

### 📄 Listar Refeições

- **Método**: `GET`
- **URL**: `/meals`
- **Resposta:**

    ```json
    [
        {
            "id": "de3bf9e0-b9bc-4730-b615-269382edfef3",
            "name": "Breakfast",
            "description": "Scrambled eggs and wholemeal bread",
            "date": "2025-02-15T08:00:00",
            "inDiet": true,
            "userId": "f3c63f6b-9ece-4f4f-b812-e5f4dc9e0492"
        },
        {
            "id": "499ef8b4-7731-4615-ba34-86d8146e2ef9",
            "name": "Lunch",
            "description": "Grilled chicken and green salad",
            "date": "2025-02-15T12:00:00",
            "inDiet": true,
            "userId": "f3c63f6b-9ece-4f4f-b812-e5f4dc9e0492"
        },
    ]

    ```

### 📊 Gerar Resumo

- **Método**: `GET`
- **URL**: `/meals/summary`
- **Resposta:**

    ```json
    {
        "totalMeals": 5,
        "totalOnDiet": 4,
        "totalOffDiet": 1,
        "bestStreak": 3
    }
    ```

## 🔐 Autenticação

As rotas da API estão protegidas por autenticação **JWT** (JSON Web Token). Para acessar as rotas que requerem autenticação, é necessário obter um token de acesso.

### Como se autenticar

1. **Faça o login** com suas credenciais (email e senha) na rota `/login` para obter um token JWT:

    - **Método**: `POST`
    - **URL**: `/login`
    - **Corpo da Requisição:**

    ```json
    {
        "email": "user@email.com",
        "password": "password"
    }
    ```

    - **Resposta**:

    ```json
    {
        "token": "your_token"
    }
    ```

2. **Utilize o token** nas requisições às rotas protegidas, incluindo-o no Postman (ou outro API Client) da seguinte forma:

    - No Postman, vá até a aba **Authorization**.
    - Selecione o tipo **Bearer Token**.
    - No campo **Token**, insira o valor do seu token JWT obtido no passo anterior.

Agora você pode fazer requisições para as rotas protegidas com o **token JWT**.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias ou correções. ✨

## ⭐ Apoie este Projeto

Se este projeto te ajudou ou te inspirou de alguma forma, não esqueça de deixar uma ⭐ no repositório! Isso faz toda a diferença! 🚀

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joschonarth/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)
