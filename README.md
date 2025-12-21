# QuickQuiz 

QuickQuiz is a modern, interactive web development quiz platform designed to help developers test their knowledge, track progress, and master various web technologies. Built with the MERN stack (MongoDB, Express, React, Node.js) and Dockerized for easy deployment.

## Features

### User Features
*   **Authentication**: Secure Login and Registration system.
*   **Quiz Interface**: Interactive quiz taking with timers and progress tracking.
*   **Practice Mode**: Hone your skills without the pressure of a timer.
*   **User Dashboard**: 
    *   View personal quiz history and detailed scores.
    *   Track performance stats (Average score, Total time, Best streak).
    *   **Global Leaderboard**: Compare your ranking against other users.
*   **Real-time Stats**: View platform-wide statistics (Active Learners, Quizzes Completed, Success Rate) on the home page.
*   **Responsive Design**: Works seamlessly on desktop and mobile devices.

### Admin Features
*   **Admin Dashboard**: Overview of platform statistics (Users, Quizzes, Success Rates).
*   **Quiz Management**: Create, edit, and delete quizzes.
*   **Question Bank**: Manage a pool of questions with various difficulty levels.
*   **Theme Management**: Organize quizzes by categories/themes.
*   **User Management**: View and manage registered users.
*   **History & Analytics**: View global quiz history and export data.

### Extensive Question Bank
The platform comes seeded with quizzes covering a wide range of technologies:
*   **Frontend**: HTML, CSS, JavaScript, React, Angular, Vue.js, Svelte, Next.js
*   **Backend**: Node.js, Express.js, NestJS, Java, Spring Boot, Python, Django, Flask, FastAPI
*   **Database**: SQL, MongoDB, PostgreSQL
*   **DevOps**: Git, Docker, Kubernetes, CI/CD (GitHub Actions)

## Tech Stack

### Frontend
*   **React 19**: Modern UI library.
*   **Vite**: Next-generation frontend tooling.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Lucide React**: Beautiful & consistent icons.
*   **Axios**: HTTP client for API requests.

### Backend
*   **Node.js & Express**: Robust server-side runtime and framework.
*   **MongoDB & Mongoose**: NoSQL database and object modeling.
*   **JWT**: Secure authentication using JSON Web Tokens.

### DevOps
*   **Docker & Docker Compose**: Containerization and orchestration.

## Prerequisites

*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
*   **Git** for cloning the repository.

## Getting Started (Docker)

The easiest way to run the application is using Docker Compose.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd QuickQuiz
```

### 2. Build and Run Containers
This command will build the frontend and backend images and start the MongoDB container.

```bash
docker compose up -d --build
```
*   **Frontend**: Accessible at [http://localhost:5173](http://localhost:5173)
*   **Backend API**: Accessible at [http://localhost:3000](http://localhost:3000)
*   **MongoDB**: Running on port 27017

### 3. Seed the Database (Important!)
To populate the database with initial data (Admin user, Themes, Quizzes, Questions), you need to run the seeders.

You can run them directly inside the backend container:

**Create Admin User:**
```bash
docker exec -it quiz-app_backend node adminSeeder.js
```
*   **Default Admin Credentials:**
    *   Email: `admin@quickquiz.com`
    *   Password: `admin123`

**Seed Quiz Data:**
This will populate the database with thousands of questions across multiple topics.
```bash
docker exec -it quiz-app_backend node quizSeeder.js
```
*To reset the database (delete all quiz data), you can run:*
```bash
docker exec -it quiz-app_backend node quizSeeder.js -d
```

## Project Structure

```
QuickQuiz/
 ├── backend/                 # Node.js API
 │   ├── src/
 │   │   ├── config/          # DB configuration
 │   │   ├── controllers/     # Route logic
 │   │   ├── middlewares/     # Auth & Error handling
 │   │   ├── models/          # Mongoose schemas
 │   │   ├── routes/          # API routes
 │   │   └── utils/           # Helper functions
 │   ├── adminSeeder.js       # Script to create admin
 │   ├── quizSeeder.js        # Script to seed quizzes
 │   ├── server.js            # Entry point
 │   └── Dockerfile
 ├── frontend/                # React Application
 │   ├── src/
 │   │   ├── components/      # Reusable UI components
 │   │   ├── context/         # Auth context
 │   │   ├── pages/           # Application pages
 │   │   ├── services/        # API service calls
 │   │   └── routes/          # Routing configuration
 │   └── Dockerfile
 │
 └── docker-compose.yml       # Docker orchestration
```

## Environment Variables

The project comes with pre-configured environment variables in `docker-compose.yml` for development convenience.

**Backend:**
*   `PORT`: 3000
*   `MONGO_URI`: `mongodb://mongodb:27017/quiz_app`
*   `JWT_SECRET`: (Defined in docker-compose)

## Running Tests / Development

If you want to run the project locally without Docker (requires Node.js and MongoDB installed locally):

**Backend:**
```bash
cd backend
npm install
# Create a .env file with MONGO_URI and JWT_SECRET
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## License

This project is open source and available under the [MIT License](LICENSE).
