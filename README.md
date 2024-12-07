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

1. Build the docker image

```sh
docker compose build
```

2. Install the dependencies
    
```sh
docker compose run app npm install
```

### Running the application

1. Using nestjs as backend framework

```sh
# Development
docker compose run app npm run start:dev:nest
# Production
docker compose run app npm run start:nest
```

2. Using express as backend framework

```sh
# Development
docker compose run app npm run start:dev:express
# Production
docker compose run app npm run start:express
```