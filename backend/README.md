# ARD-Tech-Project

A full-stack application that digitalizes rights violation and application processes in Turkey, providing management for lawyers and admins.

## Project Structure

```
ARD-Tech-Project/
│
├── backend/           # Node.js/Express/MongoDB API
├── frontend/          # Admin and lawyer panel (React)
├── frontend-victim/   # Victim application panel (React)
└── uploads/           # Uploaded files (optional)
```

## Installation

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # Fill in the required environment variables
npm run dev            # For development server
```

#### Example .env File

```
PORT=8080
MONGO_DB_URL=mongodb://localhost:27017/ardtech
JWT_SECRET_KEY=your_jwt_secret
AWS_ACCESS_KEY=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=...
AWS_REGION=...
FRONT_END_URL=http://localhost:5173
VICTIM_FRONT_END_URL=http://localhost:5174
```

### 2. Frontend (Admin/Lawyer Panel)

```bash
cd frontend
npm install
cp .env.example .env   # Fill in the required environment variables
npm run dev
```

### 3. Frontend Victim (Victim Application Panel)

```bash
cd frontend-victim
npm install
cp .env.example .env   # Fill in the required environment variables
npm run dev
```

## Usage

- **Admin Panel:** Manage applications, users, and cases via `/frontend`.
- **Victim Panel:** Submit applications via `/frontend-victim`.
- **Backend API:** Express-based REST API runs in `/backend`.

## Main Features

- JWT-based authentication
- Role-based access (admin, lawyer, victim)
- Application creation and management
- Rights violation record and file upload (AWS S3 integration)
- Case creation and management
- Dashboard with summary statistics

## Key Files

- [backend/src/app.ts](backend/src/app.ts): Express app entry and route definitions
- [frontend/src/pages/ApplicationList.jsx](frontend/src/pages/ApplicationList.jsx): Application list and management
- [frontend/src/pages/CaseList.jsx](frontend/src/pages/CaseList.jsx): Case list and details
- [frontend/src/pages/LawyerList.jsx](frontend/src/pages/LawyerList.jsx): User/lawyer management
- [frontend-victim/src/components/ApplicationPage.jsx](frontend-victim/src/components/ApplicationPage.jsx): Victim application form