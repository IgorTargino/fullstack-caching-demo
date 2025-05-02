# Fullstack Caching Demo

Aplicação fullstack demonstrando estratégias de caching utilizando NestJS, Prisma, Redis, PostgreSQL e Next.js (com Vite), tudo rodando em Docker Compose.

## Tecnologias Utilizadas

- **Backend**:
  - NestJS
  - Prisma ORM
  - Redis para caching
  - PostgreSQL como banco de dados principal
  - Docker

- **Frontend**:
  - Next.js (com Vite)
  - React
  - TanStack Query (React Query)
  - Docker

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (recomendado v18+)

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd fullstack-caching-demo
   ```

2. Crie os arquivos de ambiente:
   - Backend: `.env` na pasta `backend` (baseado no `.env.example` fornecido)
   - Frontend: `.env` na pasta `frontend` (se aplicável)

3. Construa e inicie os containers:
   ```bash
   docker-compose up --build
   ```

## Estrutura do Projeto

```
.
├── backend/              # API NestJS
│   ├── src/              # Código fonte
│   ├── prisma/           # Configurações do Prisma
│   ├── Dockerfile        # Configuração Docker para a API
│   └── .env              
├── frontend/             # Aplicação Next.js
│   ├── src/              # Código fonte
│   └── Dockerfile        # Configuração Docker para o frontend
├── docker-compose.yml    # Configuração dos serviços
└── README.md
```

## Serviços em Execução

- **API**: http://localhost:3000
- **PostgreSQL**: porta 5432
- **Redis**: porta 6379
- **Frontend**: http://localhost:3001 (ajuste conforme configuração)

## Funcionalidades Implementadas

1. **CRUD Básico**:
   - Criação, leitura, atualização e remoção de entidades
   - Validação de dados

2. **Estratégias de Caching**:
   - Cache em memória com Redis
   - Invalidação de cache automática em operações de escrita
   - Cache-aside pattern

3. **Boas Práticas**:
   - Containerização com Docker
   - Variáveis de ambiente para configuração
   - Migrações de banco de dados com Prisma

## Comandos Úteis

- Iniciar todos os serviços:
  ```bash
  docker-compose up
  ```

- Parar todos os serviços:
  ```bash
  docker-compose down
  ```

- Reconstruir e reiniciar:
  ```bash
  docker-compose up --build
  ```

- Acessar logs de um serviço específico:
  ```bash
  docker-compose logs [servico]
  ```

- Executar migrações do Prisma (dentro do container da API):
  ```bash
  docker-compose exec api npx prisma migrate dev
  ```

## Variáveis de Ambiente

As principais variáveis de ambiente estão configuradas no arquivo `.env` do backend:

```env
NODE_PORT=3000
BASE_URL=localhost

DATABASE_HOST=database
DATABASE_USER=postgres
DATABASE_PASSWORD=defaultpassword
DATABASE_NAME=crud_caching
DATABASE_PORT=5432
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=defaultpassword
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}

JWT_SECRET=4515cf9fc7da778cd051d1bcb12ae1b050b4f4e9cb4fece03b2a914f09208183
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)