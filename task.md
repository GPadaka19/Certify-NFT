# Granular Task List: MVP Build Plan

## General Notes

* Each task is small, testable, and focused on one specific concern.
* Tasks follow the architecture defined in `architecture.md`
* All components will run in Portainer-managed Docker containers

---

## 1. Backend (Go API)

* Initialize Go module and folder structure
* Set up `.env` loader for DB credentials and JWT secret
* Connect to PostgreSQL (hosted in Portainer) using pgx or GORM
* Define user model: `id`, `email`, `password`, `role`, `created_at`
* Define influencer profile model: `user_id`, `category`, `bio`, `stats`, `contact_links`
* Define category model: `id`, `name`
* Implement password hashing (bcrypt)
* Create JWT generation and middleware verification
* Create POST /register route (role: influencer or company)
* Create POST /login route (returns JWT)
* Create GET /influencers?category=X route (returns filtered list)
* Create GET /influencers/\:id route (profile details)
* Create PUT /profile route (update own profile)
* Create GET /admin/users (admin-only, list all users)
* Create DELETE /admin/user/\:id (admin-only, delete user)
* Write Dockerfile for Go API server
* Write `docker-compose.yml` to run backend, connecting to PostgreSQL

---

## 2. Frontend (Next.js)

* Initialize Next.js app with TypeScript (optional)
* Install Tailwind CSS (or preferred styling)
* Create layout components (Navbar, Footer, Layout wrapper)
* Create AuthContext for managing JWT and user info
* Create login page
* Create register page (with role selector: influencer or company)
* Create dashboard page (changes view based on role)
* Create influencer profile form (for influencers only)
* Create influencer profile page (public view)
* Create search page (company filters by category)
* Create admin user management page (simple table CRUD)
* Set up API client wrapper (fetch or axios) to call backend
* Store JWT securely via cookie or memory state
* Write Dockerfile for frontend app
* Write `docker-compose.yml` for frontend service

---

## 3. Docker + DevOps

* Ensure PostgreSQL container exposes port 5432 and is accessible by backend
* Set up network bridge between frontend and backend containers (shared network)
* Pass all sensitive values via `.env` to Docker containers
* Validate frontend can connect to backend
* Validate backend can connect to PostgreSQL

---

## 4. Testing / Validation

* Test user registration and role assignment (influencer, company)
* Test user login and JWT issuance
* Test role-based profile editing and viewing
* Test influencer search via category filter
* Test admin-only endpoints with valid JWT role
* Test full integration: frontend > backend > DB

---

Each task is intended to be executed incrementally and tested immediately before continuing.
