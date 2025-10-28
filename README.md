# Controle de Vagas de Condomínio - Frontend 

## 📋 Descrição

Este projeto é a interface de usuário (frontend) para o sistema de **Controle de Vagas de Estacionamento de Condomínio**. Ele permite visualizar o status das vagas, ocupá-las (registrando moradores ou visitantes), liberá-las, e gerenciar cadastros de moradores e veículos. A aplicação se conecta a uma API backend para persistir os dados.

## ✨ Funcionalidades Principais

* **Visualização de Vagas:** Exibição em grid do status (Livre/Ocupada) e detalhes das vagas.
* **Ocupar Vaga:** Modal inteligente para registrar a ocupação por:
    * **Morador:** Seleção de morador e veículo (com seleção se houver múltiplos), definição de previsão de saída e opções de notificação via WhatsApp.
    * **Visitante:** Cadastro rápido de nome, telefone e dados do veículo.
* **Liberar Vaga:** Atualização do status da vaga com confirmação.
* **Gerenciamento de Moradores:** CRUD (Criar, Ler, Atualizar, Deletar) completo com modal de cadastro/edição.
* **Gerenciamento de Veículos:** CRUD completo com modal, incluindo seleção do morador proprietário.
* **Autenticação:** Sistema de login com JWT para proteger o acesso às páginas.
* **Pesquisa:** Campo de busca na tela de vagas.
* **Notificações WhatsApp:** Opção de notificar moradores (individual, todos, ou nenhum) ao ocupar uma vaga (requer configuração no backend).
* **Modo Dark/Light:** Botão para alternar o tema, com persistência no `localStorage` e detecção da preferência do sistema.
* **Design Responsivo:** Interface adaptada para diferentes tamanhos de tela (desktop e mobile) usando Tailwind CSS.
* **Feedback Visual:** Skeleton Loaders durante o carregamento e componentes "Empty State" para listas vazias.
* **Notificações Toast:** Mensagens de sucesso e erro para as operações.

## 🚀 Tecnologias Utilizadas

* **React:** Biblioteca principal para construção da interface.
* **Vite:** Ferramenta de build e servidor de desenvolvimento rápido.
* **JavaScript:** Linguagem de programação.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida e responsiva.
* **Axios:** Cliente HTTP para comunicação com a API backend.
* **React Router DOM:** Para gerenciamento de rotas (navegação entre páginas).
* **Lucide React:** Biblioteca de ícones SVG.
* **React Context API:** Para gerenciamento do estado de autenticação.

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18.x ou superior recomendada)
* [npm](https://www.npmjs.com/) (geralmente vem com o Node.js) ou [Yarn](https://yarnpkg.com/)

## 🛠️ Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione a URL base da sua API backend neste arquivo:
        ```.env
        VITE_API_BASE_URL=https://SUA_URL_DA_API_BACKEND/api
        ```
        *(Substitua `https://SUA_URL_DA_API_BACKEND/api` pela URL real onde seu backend está rodando).*

## ▶️ Rodando o Projeto

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```
2.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## 🏗️ Build para Produção

Para gerar os arquivos otimizados para deploy:
```bash
npm run build
# ou
# yarn build

src/
├── assets/         # Imagens, logos, fontes
├── components/     # Componentes React
│   ├── ui/         # Componentes genéricos (Button, Modal, Input, Toast, etc.)
│   └── ...         # Componentes específicos (CardVaga, CardMorador, etc.)
├── contexts/       # React Contexts (ex: AuthContext)
├── hooks/          # Custom Hooks (se houver)
├── layouts/        # Componentes de layout (ex: DefaultLayout)
├── pages/          # Componentes que representam páginas inteiras (Login, Vagas, etc.)
├── routes/         # Configuração do React Router
├── services/       # Lógica de comunicação com API (ex: api.js)
├── App.jsx         # Componente principal da aplicação (ou similar)
└── main.jsx        # Ponto de entrada da aplicação React