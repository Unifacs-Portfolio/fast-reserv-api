# Projeto da A3 de Sistemas Distribuídos - 404 Café

Este README serve como guia para devs e usuários, explicando desde a instalação até os requisitos técnicos e funcionais do **404 Café**. Se surgirem dúvidas ou novas necessidades de configuração, sinta-se à vontade para atualizar este documento conforme o projeto evolua!!

## Descrição do Projeto

O **404 Café** é um sistema desenvolvido para otimizar o fluxo de trabalho em restaurantes, facilitando o gerenciamento de reservas e o acompanhamento do atendimento. O sistema foi projetado para atender às necessidades de três perfis de usuário dentro de uma empresa:

- **Atendente:**  
  Recebe ligações ou clientes presencialmente que desejam reservar uma mesa. Disponibiliza uma interface intuitiva para criar reservas preenchendo campos obrigatórios (data, horário, número da mesa, quantidade de pessoas e nome do responsável). Após o registro, o sistema informa se a operação foi realizada com sucesso ou se ocorreu algum erro.

- **Garçom:**  
  Ao identificar que uma mesa reservada está sendo utilizada, o garçom confirma a reserva por meio de uma tela específica. Essa ação automaticamente altera o status da mesa para "reservável" e fornece um feedback visual indicando o sucesso ou a falha da operação.

- **Gerente:**  
  Permite o acesso a relatórios detalhados para otimizar o atendimento. O gerente pode verificar quantas reservas foram atendidas, quais mesas tiveram maior utilização e até quantos pedidos foram confirmados por cada garçom. Caso não existam dados suficientes, o sistema informa que nenhum relatório relevante pode ser gerado.

---

## Instalação

Siga os passos abaixo para instalar e configurar o projeto:

1. **Clone o repositório:**

   ```bash
   git clone https://seu-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**

   - **Back-End:**  
     Navegue até a raiz do projeto e execute:
     
     ```bash
     npm install
     ```

   - **Front-End:**  
     Navegue até a pasta `Front-End/` e execute:
     
     ```bash
     npm install
     ```

3. **Configure as variáveis de ambiente:**

   - Edite o arquivo `.env` na raiz do projeto com as configurações necessárias (credenciais, porta do servidor, etc).

4. **Configuração do Docker (opcional):**

   - Se desejar rodar os containers, utilize o arquivo `docker-compose.yml`:
     
     ```bash
     docker-compose up -d
     ```

5. **Executar testes:**

   - Os testes automatizados (ex.: com Cypress) podem ser encontrados na pasta `tests/cypress/`.

---

## Uso

### Executando o Back-End

1. **Desenvolvimento:**  
   Utilize o comando abaixo para iniciar o servidor em modo de desenvolvimento (com hot-reload, se configurado):

   ```bash
   npm run dev
   ```

2. **Produção:**  
   Gere o build e execute o servidor:
   
   ```bash
   npm run build
   npm start
   ```

3. **Acesso:**  
   Após iniciar o servidor, ele estará disponível geralmente em [http://localhost:3000](http://localhost:3000) (confira a porta configurada no `.env`).

### Executando o Front-End

1. Navegue até a pasta `Front-End/public/` e abra o arquivo `index.html` no navegador para acessar a página principal.

2. Outras páginas estão disponíveis:
   - `attendant.html`: Tela para o atendente criar ou deletar reservas.
   - `waiter.html`: Tela para o garçom confirmar reservas utilizadas.
   - `manager.html`: Tela para o gerente emitir relatórios.

3. Os scripts de comunicação com o back-end (por exemplo: `reservationApi.js` e `reportApi.js`) garantem a integração entre Front-End e Back-End.

---

## Tecnologias Utilizadas

- **Linguagens e Runtime:**  
  - JavaScript / TypeScript  
  - Node.js

- **Back-End:**  
  - Framework Express.js para gerenciamento das rotas e middlewares  
  - SQLite para o banco de dados 
  - Docker para orquestração de containers

- **Front-End:**  
  - HTML5, CSS3 e JavaScript  
  - Estrutura modular para separar páginas e recursos (assets, scripts, imagens)

- **Testes:**  
  - Vitest para testes unitários  
  - Cypress para testes end-to-end e mocks de dados

---

## Estrutura do Projeto

A organização do repositório foi pensada para garantir escalabilidade, manutenção e clareza. Veja a estrutura completa:

```plaintext
project-root/
├── .env                      # Variáveis de ambiente
├── .gitignore                # Arquivos/pastas ignoradas pelo Git
├── .npmrc                    # Configurações do npm
├── biome.json                # Configuração do Biome (lint e formatação)
├── docker-compose.yml        # Configuração de containers Docker
├── package.json              # Configurações do Node.js e scripts
├── tsconfig.json             # Configuração do TypeScript
├── vitest.config.ts          # Configuração dos testes com Vitest
├── build/                    # Arquivos gerados após build (produção)
├── src/                      # Código-fonte do Back-End
│   ├── app.ts                # Arquivo principal (inicialização da aplicação)
│   ├── env.ts                # Gerenciamento das variáveis de ambiente
│   ├── server.ts             # Configuração e inicialização do servidor
│   ├── entities/             # Definição de entidades e modelos do domínio
│   ├── http/                 # Camada HTTP (requisições/respostas)
│   │   ├── controllers/      # Controladores das requisições
│   │   └── middlewares/      # Middlewares de processamento de requisições
│   ├── repositories/         # Acesso a dados
│   │   ├── memory/           # Repositórios em memória (para testes/desenvolvimento)
│   │   └── sqlite/           # Repositórios utilizando banco de dados SQLite
│   └── useCases/             # Casos de uso e regras de negócio
│       ├── errors/           # Definição de erros específicos dos casos de uso
│       └── factories/        # Fábricas para criação dos casos de uso
├── tests/                    # Testes automatizados
│   └── cypress/              # Testes end-to-end com Cypress e mocks de dados
└── Front-End/                # Código-fonte do Front-End
    ├── public/
    │   ├── index.html        # Página principal (hub da aplicação)
    │   ├── attendant.html    # Página para atendentes (reservas)
    │   ├── waiter.html       # Página para garçons (confirmação de reservas)
    │   ├── manager.html      # Página para gerentes (relatórios)
    │   └── assets/
    │       ├── css/
    │       │   └── styles.css    # Estilos customizados
    │       ├── js/
    │       │   ├── main.js         # Funcionalidades gerais para manipulação do DOM
    │       │   ├── reservationApi.js  # Comunicação com o Back-End para reservas
    │       │   └── reportApi.js       # Comunicação com o Back-End para relatórios
    │       └── images/       # Recursos visuais (imagens, ícones)
    ├── README.md             # Documentação do Front-End
    └── package.json          # Gerenciamento de dependências do Front-End
```

---

## Especificação de Requisitos de Software

### 📜 Regras de Negócio

- **RN001:** A reserva deve ter data, hora, número de mesa, quantidade de pessoas e nome do responsável que encomendou a reserva.
- **RN002:** Ao criar ou deletar uma reserva, uma mensagem de erro ou sucesso deve ser informada.
- **RN003:** Ao confirmar a utilização de uma reserva, o status da mesa deve mudar para reservável.
- **RN004:** Ao confirmar uma reserva, uma mensagem de erro ou sucesso deve ser informada.
- **RN005:** Ao emitir um relatório, o gerente pode escolher um relatório de relação de reservas atendidas ou não, filtrando em um certo período.
- **RN006:** Ao emitir um relatório, o gerente pode escolher um relatório de relação de reservas feitas para determinada mesa.
- **RN007:** Ao emitir um relatório, o gerente pode escolher um relatório de relação de mesas confirmadas por garçom.
- **RN008:** Ao solicitar um relatório, o gerente recebe os dados do relatório ou uma mensagem informando que não há dados que atendem o relatório solicitado.

### ⚙️ Requisitos Funcionais

- **RF001:** Deve ser possível para um atendente criar uma reserva.
- **RF002:** Deve ser possível para um atendente deletar uma reserva.
- **RF003:** Deve ser possível para um garçom confirmar uma reserva utilizada pelo consumidor.
- **RF004:** Deve ser possível para um gerente criar um relatório de acompanhamento.

### 🚀 Requisitos Não Funcionais

- **RNF001:** O sistema deve ter uma interface gráfica ou de texto.
- **RNF002:** O servidor deve hospedar o banco de dados.
- **RNF003:** O sistema deve hospedar o Back-End.
- **RNF004:** O Back-End deve ser consumido pelo Front-End.
- **RNF005:** O sistema deve se comunicar com um banco de dados relacional.
- **RNF006:** O sistema deve ser implementado em uma linguagem de programação de baixo ou alto nível (ex.: JavaScript, Python, Java, C ou C++).
- **RNF007:** Front-End e Back-End devem se comunicar via Socket, API ou RPC.

