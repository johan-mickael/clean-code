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

frontend/                   # Code front-end (React, par exemple)
├── public/                 # Fichiers publics (index.html, favicon, etc.)
├── src/                    # Code source React
    ├── components/         # Composants UI
    ├── services/           # Services pour les appels API vers le back-end
    ├── pages/              # Pages principales de l'application
    ├── hooks/              # Custom hooks
    ├── context/            # Gestion des contextes (ex. user, auth)
    └── utils/              # Utilitaires communs
```

## Installation

1. Build the docker image

```sh
docker compose build
```

2. Install the dependencies
Ensure that `node_modules` is present in each of the following directories:
> - `./node_modules`
> - `./src/infrastructure/frameworks/express/node_modules`
> - `./src/infrastructure/frameworks/nest/node_modules`

If not, just run `npm install` in each of the directories above.

### Running the application

1. Using nestjs as backend framework

```sh
docker compose run -e BACKEND_FRAMEWORK=nest app
```

2. Using express as backend framework

```sh
docker compose run -e BACKEND_FRAMEWORK=express app
```