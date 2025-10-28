# Controle de Vagas de Condomínio - Backend 🏢🚗

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## 📋 Descrição

Este projeto é a API backend para o sistema de **Controle de Vagas de Estacionamento de Condomínio**. Ele gerencia a lógica de negócio, interage com o banco de dados MongoDB e fornece endpoints seguros para a aplicação frontend.

## ✨ Funcionalidades Principais

* **Gerenciamento de Vagas:**
    * Criação, listagem (com dados populados de morador/veículo), ocupação e liberação de vagas.
    * Verificação de disponibilidade antes de ocupar.
* **Gerenciamento de Moradores:** CRUD completo para cadastro de moradores.
* **Gerenciamento de Veículos:** CRUD completo para cadastro de veículos, com associação ao morador.
* **Autenticação:**
    * Sistema de login baseado em JWT (JSON Web Tokens).
    * Hashing seguro de senhas usando `bcryptjs`.
    * Middleware para proteção de rotas, garantindo que apenas usuários autenticados acessem os dados.
    * (Opcional: Rota de registro de usuários).
* **Notificações WhatsApp:**
    * Integração com a API oficial da Meta (WhatsApp Business API).
    * Envio de mensagens template para notificar moradores (individualmente, todos, ou nenhum) sobre a ocupação de vagas.
    * Formatação de dados (data/hora) para as mensagens.

## 🚀 Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express:** Framework web para criação da API RESTful.
* **MongoDB:** Banco de dados NoSQL para armazenamento dos dados.
* **Mongoose:** ODM (Object Data Modeling) para interagir com o MongoDB de forma estruturada.
* **JSON Web Token (`jsonwebtoken`):** Para gerar e verificar tokens de autenticação.
* **`bcryptjs`:** Para hashing seguro de senhas.
* **Axios:** Cliente HTTP para fazer requisições à API do WhatsApp.
* **`dotenv`:** Para gerenciar variáveis de ambiente.
* **`cors`:** Para habilitar Cross-Origin Resource Sharing.

## ⚙️ Pré-requisitos

* [Node.js](https://nodejs.org/) (Versão 18.x ou superior recomendada)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (Instalado localmente ou uma conta em um serviço como MongoDB Atlas)
* Conta configurada na [Meta WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/cloud-api/) com um template de mensagem aprovado (para a funcionalidade de notificação).

## 🛠️ Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO_BACKEND.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO_BACKEND.git)
    cd SEU_REPOSITORIO_BACKEND
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione as seguintes variáveis, substituindo pelos seus valores:
        ```.env
        # Configuração do Servidor
        PORT=5000 # Ou outra porta de sua preferência

        # Conexão com MongoDB
        MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority # Ou sua string de conexão local

        # Autenticação JWT
        JWT_SECRET=<SEU_SEGREDO_SUPER_SECRETO_E_LONGO> # Gere uma chave forte e aleatória

        # API do WhatsApp (Meta)
        WHATSAPP_API_URL=[https://graph.facebook.com/vXX.X/YOUR_PHONE_NUMBER_ID/messages](https://graph.facebook.com/vXX.X/YOUR_PHONE_NUMBER_ID/messages) # Substitua pela sua URL da API
        ACCESS_TOKEN=<SEU_ACCESS_TOKEN_PERMANENTE_DA_META> # Token gerado na plataforma Meta
        # PHONE_NUMBER_ID=<SEU_PHONE_NUMBER_ID> # Se necessário em outras partes
        ```
    * **IMPORTANTE:** Adicione o arquivo `.env` ao seu `.gitignore`!

## ▶️ Rodando o Projeto

1.  **Inicie o servidor:**
    ```bash
    npm run dev
    # ou
    # npm start (dependendo dos seus scripts no package.json)
    ```
2.  O servidor estará rodando em `http://localhost:PORT` (onde `PORT` é o valor definido no seu `.env` ou 5000 por padrão).

## 🗺️ Endpoints da API (Visão Geral)

* **Autenticação (`/api/auth`)**
    * `POST /login`: Autentica um usuário e retorna um token JWT.
    * `POST /register` (Opcional): Registra um novo usuário.
    * `GET /validate-token` (Opcional): Rota protegida para validar um token existente.
* **Vagas (`/api/vagas`)**
    * `GET /`: Lista todas as vagas (protegida).
    * `POST /`: Cria uma nova vaga (protegida).
    * `PUT /:id/ocupar`: Ocupa uma vaga (protegida).
    * `PUT /:id/liberar`: Libera uma vaga (protegida).
    * `DELETE /:id` (Opcional): Deleta uma vaga (protegida).
* **Moradores (`/api/moradores`)**
    * `GET /`: Lista todos os moradores (protegida).
    * `POST /`: Cria um novo morador (protegida).
    * `PUT /:id`: Atualiza um morador (protegida).
    * `DELETE /:id`: Deleta um morador (protegida).
* **Veículos (`/api/veiculos`)**
    * `GET /`: Lista todos os veículos (protegida).
    * `POST /`: Cria um novo veículo (protegida).
    * `PUT /:id`: Atualiza um veículo (protegida).
    * `DELETE /:id`: Deleta um veículo (protegida).

*(**Nota:** Todas as rotas (exceto `/api/auth/login` e `/api/auth/register`) requerem um token JWT válido enviado no cabeçalho `Authorization: Bearer <token>`)*.

