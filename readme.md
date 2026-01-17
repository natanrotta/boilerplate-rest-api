# Boilerplate REST API

A Clean Architecture REST API boilerplate with TypeScript, Express, Prisma, and Dependency Injection.

## 🏗️ Architecture

This project follows **Clean Architecture** principles:
```
src/
├── domain/                 # Enterprise business rules
│   ├── entities/           # Business objects
│   ├── repositories/       # Repository interfaces
│   └── providers/          # Provider interfaces
│
├── application/            # Application business rules
│   ├── use-cases/          # Use cases (interactors)
│   └── dtos/               # Data transfer objects
│
├── infrastructure/         # Frameworks & drivers
│   ├── config/             # Environment configuration
│   ├── database/           # Database implementations
│   ├── http/               # Express setup, controllers, routes
│   ├── providers/          # Provider implementations
│   └── services/           # External services (Sentry, Scheduler, etc.)
│
├── shared/                 # Shared utilities
│   ├── container/          # Dependency injection
│   └── errors/             # Custom errors
│
└── main.ts                 # Application entry point
```

## 🚀 Technologies

- **Node.js** (>=18)
- **TypeScript**
- **Express**
- **Prisma** (ORM)
- **PostgreSQL**
- **Redis**
- **Tsyringe** (Dependency Injection)
- **Zod** (Validation)
- **Pino** (Logging)
- **Vitest** (Testing)
- **Docker**

## 🛡️ Security

This boilerplate includes built-in security features:

| Feature | Description |
|---------|-------------|
| **Helmet** | Secure HTTP headers (XSS, HSTS, etc.) |
| **Rate Limit** | 1000 requests per 5 minutes per IP |
| **CORS** | Configurable allowed origins |
| **Body Limit** | JSON body limited to 10kb |
| **Trust Proxy** | Support for load balancers/reverse proxies |
| **Sentry** | Error monitoring and tracking (optional) |

### Sentry Setup (Optional)

1. Create an account at [sentry.io](https://sentry.io)
2. Create a new Node.js project
3. Add the DSN to your `.env`:
```env
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

Leave `SENTRY_DSN` empty to disable error tracking.

## 📋 Prerequisites

- Node.js >= 18
- Yarn
- Docker & Docker Compose

## ⚙️ Setup

### 1. Clone and install
```bash
git clone <repository-url>
cd boilerplate-rest-api
yarn install
```

### 2. Environment variables
```bash
cp .env.example .env
```

### 3. Start with Docker
```bash
cp docker-compose.local.yml docker-compose.yml
cp Dockerfile.local Dockerfile
yarn up
```

### 4. Run migrations
```bash
yarn prisma:deploy
```

### 5. Access the API
```
http://localhost:3333/api/health
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn up` | Start Docker containers |
| `yarn down` | Stop Docker containers |
| `yarn test` | Run tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with coverage |
| `yarn lint` | Lint code |
| `yarn format` | Format code |
| `yarn prisma:migrate <name>` | Create migration |
| `yarn prisma:deploy` | Deploy migrations |
| `yarn prisma:generate` | Generate Prisma client |
| `yarn prisma:studio` | Open Prisma Studio |
| `yarn prisma:reset` | Reset database |

## 🛣️ API Endpoints

### Health
- `GET /healthz` - Health check (for load balancers)
- `GET /api/health` - API health check

### Users
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🧪 Testing
```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage
yarn test:coverage
```

## 🐳 Docker

### Development
```bash
cp docker-compose.local.yml docker-compose.yml
cp Dockerfile.local Dockerfile
docker-compose up
```

### Production
```bash
cp docker-compose.prod.yml docker-compose.yml
cp Dockerfile.prod Dockerfile
docker-compose up -d
```

## 📝 License

MIT