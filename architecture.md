Project Architecture: Influencer Endorsement Platform

Overview

This project consists of a frontend built with Next.js, a backend built with Go (if necessary), and a PostgreSQL database already running in a Portainer environment (port 5432). Each part is containerized separately and deployed via Docker Compose.

⸻

File and Folder Structure

project-root/
│
├── frontend/                    # Next.js frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Next.js pages
│   │   ├── lib/                 # API helpers / utils
│   │   ├── context/             # Global state management
│   │   └── styles/              # Tailwind or CSS modules
│   ├── .env.local               # Frontend environment config
│   ├── Dockerfile               # Docker image definition
│   └── docker-compose.yml       # Compose file for frontend
│
├── backend/                    # Optional Go backend API
│   ├── cmd/
│   │   └── server/              # Main Go application entry
│   ├── internal/
│   │   ├── handlers/            # HTTP route handlers
│   │   ├── models/              # DB models and logic
│   │   ├── middleware/          # JWT, CORS, etc.
│   │   └── db/                  # PostgreSQL connection
│   ├── .env                     # Backend environment config
│   ├── go.mod / go.sum          # Go module definitions
│   ├── Dockerfile               # Docker image definition
│   └── docker-compose.yml       # Compose file for backend
│
└── docs/                       # Documentation
    ├── architecture.md
    ├── tasks.md
    └── req.md


⸻

What Each Part Does

Frontend (Next.js)
	•	Handles all user-facing pages (home, login, register, dashboards, profile views).
	•	Communicates with backend API using REST (via fetch or axios).
	•	Manages user session via context + cookies (or localStorage fallback).
	•	Deployable as a standalone container via its own docker-compose.yml.

Backend (Go, optional but used in this project)
	•	Provides REST API endpoints for registration, login, profile management, admin features.
	•	Implements role-based access via JWT.
	•	Handles database interaction with PostgreSQL.
	•	Deployable as a standalone container, with .env linking to external PostgreSQL instance.

PostgreSQL (external)
	•	Hosted in Portainer on port 5432.
	•	Stores all persistent data: users, influencer profiles, performance metrics, categories.

⸻

Where State Lives
	•	Frontend local state: React Context (auth, user info, theme, etc.)
	•	Frontend persistent state: Cookies or secure localStorage for JWT tokens
	•	Backend state: Stateless, with PostgreSQL holding all persistent data

⸻

How Services Connect
	•	Frontend sends requests to the backend REST API (e.g., /api/login, /api/influencers)
	•	Backend verifies JWT and queries PostgreSQL
	•	Backend returns JSON responses to the frontend
	•	All services are containerized and linked via Docker network (using service names)

⸻

Deployment Model
	•	PostgreSQL is already running via Portainer (as base DB container)
	•	frontend/docker-compose.yml and backend/docker-compose.yml run separately, connecting to shared DB
	•	Use Docker Compose .env files to pass secrets and service URLs
	•	Reverse proxy can be added later (e.g., Caddy, Traefik, Nginx) for SSL and routing

⸻

This architecture ensures modularity, scalability, and clear separation of concerns between frontend, backend, and database.