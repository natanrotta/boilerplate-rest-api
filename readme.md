# Boilerplate REST API

Complete boilerplate for developing REST APIs with Node.js, TypeScript, Prisma, and Docker.

## 🚀 Technologies

- **Node.js** - JavaScript Runtime
- **TypeScript** - Typed JavaScript Superset
- **Prisma** - Modern ORM for Node.js and TypeScript
- **Docker** - Application Containerization
- **Express** - Minimalist Web Framework (inferred from structure)

## 📋 Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## ⚙️ Environment Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd boilerplate-rest-api
```

### 2. Configure environment variables

Create the `.env` file in the project root based on the example file:

```bash
cp .env.local .env
```

Edit the `.env` file and configure the variables according to your environment.

### 3. Configure Docker Compose

Create the `docker-compose.yml` file based on the example file:

```bash
cp docker-compose-local.yml docker-compose.yml
```

### 4. Configure Dockerfile

Create the `Dockerfile` based on the example file:

```bash
cp Dockerfile-local Dockerfile
```

### 5. Install dependencies

```bash
yarn install
```

### 6. Start the application

```bash
yarn up
```

The application will be running and accessible as configured in your `.env` file.

### 7. Stop the application

To stop all containers:

```bash
yarn down
```

## 🗄️ Prisma Commands

The boilerplate includes useful scripts for database management with Prisma:

### Complete database reset

```bash
yarn prisma:reset
```

Removes all data and recreates the database from scratch.

### Reset with migrations

```bash
yarn prisma:migrate:reset
```

Resets the database and applies all migrations again.

### Create first migration

```bash
yarn prisma:migrate first
```

Creates the first migration for your Prisma schema.

### Synchronize schema

```bash
yarn prisma:sync
```

Synchronizes the Prisma schema with the database without creating migrations.

## 📁 Project Structure

```
.
├── src/
│   ├── config/       # Application configurations
│   ├── core/         # Core functionalities (errors, prisma)
│   ├── http/         # HTTP layer (middlewares, handlers)
│   ├── modules/      # Application modules
│   │   └── user/     # Module example (controller, model, repository, route, service)
│   ├── routes/       # Route definitions
│   ├── services/     # External services (cron, redis, zapi)
│   └── utils/        # Utilities
├── prisma/           # Prisma schema and migrations
├── seeds/            # Seeds to populate the database
└── .env              # Environment variables
```

## 🧪 Available Scripts

- `yarn up` - Start Docker containers
- `yarn down` - Stop Docker containers
- `yarn install` - Install project dependencies
- `yarn prisma:reset` - Complete database reset
- `yarn prisma:migrate:reset` - Database reset with migrations
- `yarn prisma:migrate first` - Create first migration
- `yarn prisma:sync` - Synchronize schema with database

## 📝 Development

During development, you can use Prisma commands to manage your schema:

1. Modify the `prisma/schema.prisma` file
2. Run `yarn prisma:migrate first` to create the migration
3. Run `yarn prisma:sync` to apply the changes

## 🤝 Contributing

Contributions are always welcome! Feel free to open issues and pull requests.

## 📄 License

This project is under the MIT license.