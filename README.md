# QuickQuiz

![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

QuickQuiz est une plateforme interactive d'apprentissage du développement web conçue pour tester les connaissances, suivre les progrès et maîtriser diverses technologies.
Le projet utilise la stack **MERN (MongoDB, Express, React, Node.js)** et est entièrement containerisé avec **Docker**.

---

## Déploiement

Le projet est déployé et accessible aux adresses suivantes :

* **Frontend** : [https://quickquiz-app.onrender.com](https://quickquiz-app.onrender.com)
* **API Backend** : [https://quickquiz-api.onrender.com](https://quickquiz-api.onrender.com)

---

## Fonctionnalités

### Utilisateurs

* **Authentification** : Système sécurisé de connexion et d'inscription
* **Interface Quiz** : Quiz interactifs avec minuteur et suivi de progression
* **Mode Pratique** : Amélioration des compétences sans pression de temps
* **Tableau de bord** : Historique personnel et statistiques de performance
* **Classement global** : Comparaison du classement entre tous les utilisateurs

### Administration

* **Tableau de bord Admin** : Aperçu des statistiques de la plateforme (utilisateurs, quiz, taux de réussite, etc)
* **Gestion des quiz** : Créer, modifier et supprimer des quiz
* **Gestion des questions** : Créer et Gérer les questions avec différents niveaux de difficulté
* **Gestion des thèmes** : Organisation des quiz par catégories
* **Gestion des utilisateurs** : Consultation et gestion des utilisateurs
* **Historique et analyses** : Consultation de l'historique global et export des données

### Banque de questions étendue

La plateforme est livrée avec des quiz couvrant un large éventail de technologies :

* **Frontend** : HTML, CSS, JavaScript, React, Angular, Vue.js, Svelte, Next.js
* **Backend** : Node.js, Express.js, NestJS, Java, Spring Boot, Python, Django, Flask, FastAPI
* **Bases de données** : SQL, MongoDB, PostgreSQL
* **DevOps** : Git, Docker, Kubernetes, CI/CD

---

## Stack technique

### Frontend

* **React 19** : Bibliothèque UI moderne
* **Vite** : Outil de build et serveur de développement rapide
* **Tailwind CSS** : Framework CSS utilitaire
* **Lucide React** : Bibliothèque d’icônes
* **Axios** : Client HTTP pour les requêtes API

### Backend

* **Node.js & Express** : Environnement serveur et framework backend
* **MongoDB & Mongoose** : Base de données NoSQL et modélisation des données
* **JWT** : Authentification sécurisée via JSON Web Tokens

---

## Structure du projet

```
QuickQuiz/
 ├── backend/                 # Node.js API
 │   ├── src/
 │   │   ├── config/          # Configuration base de données
 │   │   ├── controllers/     # Logique des routes
 │   │   ├── middlewares/     # Authentification & gestion des erreurs
 │   │   ├── models/          # Schémas Mongoose
 │   │   ├── routes/          # Routes API
 │   │   └── utils/           # Fonctions utilitaires
 │   ├── adminSeeder.js       # Script de création d’admin
 │   ├── quizSeeder.js        # Script de remplissage des quiz
 │   ├── server.js            # Point d’entrée
 |   ├── Dockerfile.dev       # Dockerfile Développement
 │   └── Dockerfile           # Dockerfile Production
 │
 ├── frontend/                # Application React
 │   ├── src/
 │   │   ├── components/      # Composants UI
 │   │   ├── context/         # Provider d’authentification
 │   │   ├── pages/           # Pages (admin / user / auth)
 │   │   ├── routes/          # Configuration du routeur
 │   │   └── services/        # Couche service API
 │   ├── nginx.conf           # Configuration Nginx Production
 |   ├── Dockerfile.dev       # Dockerfile Développement
 │   └── Dockerfile           # Dockerfile Production
 │
 ├── docker-compose.yml       # Orchestration Production
 ├── docker-compose.dev.yml   # Orchestration Développement
 └── generate-secret.js       # Générateur de JWT_SECRET
```

---

## Mise en route (Docker)

Lancez l'ensemble de la plateforme avec une seule commande.

### 1. Installation

```bash
git clone https://github.com/Mo7amed-Boukab/QuickQuiz.git
cd QuickQuiz
cp .env.example .env
```

### 2. Lancer les containers

```bash
docker-compose up -d --build
```

* **Frontend** : [http://localhost](http://localhost)
* **Backend API** : [http://localhost:3000](http://localhost:3000)
* **MongoDB** : localhost:27017

### 3. Seeder la base de données (important)

**Créer l'utilisateur Admin :**

```bash
docker exec -it quickquiz-backend node adminSeeder.js
```

* **Admin par défaut** : [admin@quickquiz.com](mailto:admin@quickquiz.com) / admin123

**Seeder les données de quiz :**

```bash
docker exec -it quickquiz-backend node quizSeeder.js
```

**Réinitialiser la base de données :**

```bash
docker exec -it quickquiz-backend node quizSeeder.js -d
```

---

## Installation locale (sans Docker)

Nécessite Node.js 20+ et MongoDB installés localement.

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Seeders

```bash
cd backend
node adminSeeder.js
node quizSeeder.js
```

---

## Variables d’environnement

Modifiez le fichier `.env` pour configurer votre environnement :

* `PORT` : Port du backend (défaut : 3000)
* `MONGO_URI` : Chaîne de connexion MongoDB
* `JWT_SECRET` : Secret JWT (généré avec `node generate-secret.js`)


---

## Licence
Licence MIT - [LICENSE](LICENSE)
