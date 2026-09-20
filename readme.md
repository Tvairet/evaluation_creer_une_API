# API Port de Plaisance Russell

API privée de gestion des réservations de catways (appontements) pour le port de plaisance de Russell, avec une interface web (tableau de bord) permettant à la capitainerie de gérer les catways, les réservations et les comptes utilisateurs.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Authentification et rôles](#authentification-et-rôles)
- [Documentation de l'API](#documentation-de-lapi)
- [Routes principales](#routes-principales)
- [Structure du projet](#structure-du-projet)

## Fonctionnalités

- Authentification par JWT (cookie de session), avec mots de passe hashés (bcrypt)
- Gestion des catways : création, liste, détails, modification de l'état, suppression
- Gestion des réservations : création, liste, détails, modification, suppression
- Gestion des comptes utilisateurs : création, liste, détails, modification, suppression
- Contrôle des rôles : les actions de gestion (suppression d'utilisateur, modification/suppression de catway ou de réservation, gestion des comptes) sont réservées aux comptes `admin`. Tout utilisateur connecté peut créer une réservation.
- Tableau de bord web consommant l'API via `fetch()` (utilisateur connecté, date du jour, réservations en cours, CRUD des utilisateurs/catways/réservations)
- Documentation interactive de l'API (Swagger) accessible via `/api-docs`

## Technologies utilisées

- Node.js / Express
- MongoDB / Mongoose
- EJS (moteur de templates)
- bcrypt (hash des mots de passe)
- jsonwebtoken (authentification par JWT)
- cookie-parser
- swagger-jsdoc / swagger-ui-express (documentation de l'API)

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
- [MongoDB](https://www.mongodb.com/) installé et démarré localement (ou une instance accessible)
- npm

## Installation

```bash
git clone <url-du-dépôt>
cd API_port_Russel
npm install
```

## Configuration

Créer un fichier `env/.env` à la racine du projet (un exemple est fourni dans `env/.env`), avec les variables suivantes :

```
NODE_ENV=development
APP_NAME=API port Russel
API_URL=127.0.0.1
SECRET_KEY=une_valeur_secrete
PORT=3000
```

- `SECRET_KEY` : clé utilisée pour signer les tokens JWT
- `PORT` : port d'écoute du serveur

**Base de données** : par défaut l'application se connecte à `mongodb://localhost:27017/`.

## Lancement

En développement (rechargement automatique avec nodemon, charge `env/.env`) :

```bash
npm run dev
```

Le serveur démarre par défaut sur [http://localhost:3000]

## Authentification et rôles

- La connexion se fait via le formulaire de la page d'accueil (`POST /auth/login`), ou directement en API avec les mêmes identifiants.
- Une fois connecté, un cookie `token` (JWT) est posé et donne accès au tableau de bord (`/dashboard`) et aux routes protégées de l'API.
- Deux rôles existent :
  - `user` : peut consulter les listes, créer une réservation.
  - `admin` : a en plus accès à la création/modification/suppression des catways, des réservations, des utilisateurs, et à la liste des utilisateurs.
- Pour créer le premier compte admin, utiliser directement l'API :

```
POST http://localhost:3000/api/users/
Content-Type: application/json

{
  "nom": "Admin",
  "email": "admin@port-russel.fr",
  "password": "TEST1234",
  "role": "admin"
}
{
    "nom": "Kevin",
    "email": "test@test.fr",
    "password": "Test12345",
    "role": "user"
}
```

(cette route de création est ensuite elle-même réservée aux admins ; le tout premier compte doit donc être créé directement en base ou avant que la protection ne soit active, puis servir à créer les comptes suivants)

- Déconnexion : `GET /auth/logout`

## Documentation de l'API

La documentation interactive (Swagger) est disponible une fois le serveur lancé, à l'adresse :

```
http://localhost:3000/api-docs
```

Elle liste toutes les routes de l'API, leurs paramètres, corps de requête attendus et réponses possibles.

## Routes principales

### Authentification
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/login` | Connexion |
| GET | `/auth/logout` | Déconnexion |

### Catways (`/api/catways`)
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/api/catways/` | public | Liste des catways |
| GET | `/api/catways/:id` | public | Détail d'un catway |
| POST | `/api/catways/` | admin | Créer un catway |
| PUT | `/api/catways/:id` | admin | Modifier un catway |
| PATCH | `/api/catways/:id` | admin | Modifier partiellement un catway |
| DELETE | `/api/catways/:id` | admin | Supprimer un catway |

### Réservations (`/api/reservations`)
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/api/reservations/` | public | Liste des réservations |
| GET | `/api/reservations/:id` | public | Détail d'une réservation |
| POST | `/api/reservations/` | connecté | Créer une réservation |
| PUT | `/api/reservations/:id` | admin | Modifier une réservation |
| PATCH | `/api/reservations/:id` | admin | Modifier partiellement une réservation |
| DELETE | `/api/reservations/:id` | admin | Supprimer une réservation |

### Utilisateurs (`/api/users`)
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/api/users/` | admin | Liste des utilisateurs |
| GET | `/api/users/:id` | public | Détail d'un utilisateur |
| POST | `/api/users/` | admin | Créer un utilisateur |
| PUT | `/api/users/:id` | admin | Modifier un utilisateur |
| PATCH | `/api/users/:id` | admin | Modifier partiellement un utilisateur |
| DELETE | `/api/users/:id` | admin | Supprimer un utilisateur |

### Pages web
| Route | Description |
|---|---|
| `/` | Page d'accueil (présentation + formulaire de connexion + lien vers la doc API) |
| `/dashboard` | Tableau de bord (utilisateur connecté) |
| `/users` | Liste des utilisateurs (admin) |
| `/catways` | Liste des catways |
| `/reservations` | Liste des réservations |
| `/api-docs` | Documentation Swagger de l'API |

## Structure du projet

```
API_port_Russel/
├── app.js                 # Point d'entrée, configuration Express
├── config/
│   └── swagger.js         # Configuration de la documentation Swagger
├── controllers/           # Logique des routes (validation des entrées, réponses HTTP)
├── services/               # Accès à la base de données (Mongoose)
├── models/                 # Schémas Mongoose (User, Catway, Reservation)
├── middlewares/
│   ├── private.js          # Vérification du token JWT (checkJWT)
│   ├── requireAdmin.js      # Vérification du rôle admin
│   └── optionalAuth.js      # Décode le token si présent, sans bloquer
├── routes/                 # Déclaration des routes Express + documentation Swagger
├── views/                  # Vues EJS (pages web)
├── public/                  # Fichiers statiques (CSS, images)
└── env/.env                 # Variables d'environnement (non versionné)
```