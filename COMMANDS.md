# Comandos Disponíveis

## 🚀 Desenvolvimento

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Inicia o servidor em modo desenvolvimento com hot reload |
| `yarn build` | Compila TypeScript para JavaScript na pasta `dist/` |
| `yarn start` | Inicia o servidor em modo produção (requer build) |

## 🐳 Docker

| Comando | Descrição |
|---------|-----------|
| `yarn up` | Sobe todos os containers (app, db, redis) |
| `yarn down` | Para e remove todos os containers |

## 🗄️ Prisma (Banco de Dados)

| Comando | Descrição |
|---------|-----------|
| `yarn prisma:generate` | Gera o Prisma Client baseado no schema |
| `yarn prisma:migrate <nome>` | Cria uma nova migration com o nome especificado |
| `yarn prisma:deploy` | Aplica migrations pendentes no banco |
| `yarn prisma:reset` | Reseta o banco (apaga todos os dados e reaplica migrations) |
| `yarn prisma:studio` | Abre interface visual para gerenciar o banco |

## 🌱 Seeds

| Comando | Descrição |
|---------|-----------|
| `yarn seed` | Popula o banco com dados iniciais de teste |

## 🧪 Testes

| Comando | Descrição |
|---------|-----------|
| `yarn test` | Executa todos os testes uma vez |
| `yarn test:watch` | Executa testes em modo watch (re-executa ao salvar) |
| `yarn test:coverage` | Executa testes e gera relatório de cobertura |

## 🔍 Qualidade de Código

| Comando | Descrição |
|---------|-----------|
| `yarn lint` | Verifica e corrige problemas de lint |
| `yarn format` | Formata código com Prettier |

## 📋 Fluxos Comuns

### Primeira execução (com Docker)
```bash
cp .env.example .env
cp docker-compose.local.yml docker-compose.yml
cp Dockerfile.local Dockerfile
yarn up
# Em outro terminal:
docker-compose exec app yarn prisma:deploy
docker-compose exec app yarn seed
```

### Criar nova migration
```bash
docker-compose exec app yarn prisma:migrate add_new_table
```

### Resetar banco de dados
```bash
docker-compose exec app yarn prisma:reset
docker-compose exec app yarn seed
```

### Popular banco com dados de teste
```bash
# Com Docker
docker-compose exec app yarn seed

# Sem Docker
yarn seed
```

### Rodar testes
```bash
yarn test
```

### Build para produção
```bash
yarn build
yarn start
```