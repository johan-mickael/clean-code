# Clean-code Folder Structure

```plaintext
src/
├── application/            # Couche Application (Logique de l'application et cas d'utilisation)
│   ├── services/           # Services métiers
│   ├── command/            # Requêtes
│   ├── query/              # Demandes
│   └── dto/                # Data Transfer Objects (pour les échanges entre couches)
│
├── domain/                 # Couche Domain (Logique métier et règles de domaine)
│   ├── entities/           # Entités métiers
│   ├── repositories/       # Interfaces des repositories
│   └── valueObjects/       # Objets de valeurs et agrégats
│
├── infrastructure/         # Couche Infrastructure (Base de données, frameworks)
│   ├── databases/          # Gestion des bases de données (SQL, NoSQL, etc.)  
│       ├── mongo/  
│           ├── repositories/  
│       ├── postgresql/  
│           ├── repositories/  
│   └── frameworks/         # Frameworks externes (Express, NestJS, etc.)
│   └── dto/                # Data Transfer Objects (pour les échanges entre couches)
│
└── interface/              # Couche Interface (API, Interface utilisateur)
    ├── controllers/        # Contrôleurs d'API
    └── routes/             # Gestion des routes API
    └── dto/                # Data Transfer Objects (pour les échanges entre couches)
```

## Installation

 Build the docker image

```sh
docker compose build
```

### Running the application

Before running the application, you must check that the `node_modules`. If it is not present, you must run the following command:
```sh
docker compose run --rm -it --entrypoint "" app npm install
```

Then, you can run the application using the following command:

```sh
docker compose up
```

By default, the server will use nestjs as the framework. To use express, you can set the `FRAMEWORK` environment variable to `express`:

Example:

```sh
FRAMEWORK=express docker compose up
```

### Sequelize

1. Generate a new migration
```sh
docker compose run --rm -it --entrypoint "" app npm run sequelize:generate:migration <migration-name>
```

2. Run the migrations
```sh
docker compose run --rm -it --entrypoint "" app npm run sequelize:migrate
```

3. Generate a new seed
```sh
docker compose run --rm -it --entrypoint "" app npm run sequelize:generate:seed <seed-name>
```

4. Run the seeds
```sh
docker compose run --rm -it --entrypoint "" app npm run sequelize:seed
```

### Tools

1. Format the code

> In order to have a consistent code style, you can run the following command (Especially before committing your code):

Manually:
```sh
docker compose run --rm -it --entrypoint "" app npm run format
```

Automatically before each commit:

Add the following configuration to your `.git/hooks/pre-commit` file:

```sh
#!/bin/sh

# Run Prettier formatting
echo "🎨 Running Prettier..."
node ./dev-scripts/prettier-check.js
if [ $? -ne 0 ]; then
  echo "❌ Prettier check failed. Commit aborted."
  exit 1
fi

echo "✅ Prettier check passed. Committing..."
exit 0
```