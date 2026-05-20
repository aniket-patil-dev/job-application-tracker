# Trackr — Job Application Tracker

A full-stack web application to track job applications through every stage of the hiring process. Built with a FastAPI backend and a React frontend, with JWT-based authentication and a clean dark-themed UI.

---

## Features

- **Authentication** — Register, login, and secure routes via JWT Bearer tokens
- **Application Management** — Create, view, update, and delete job applications
- **Status Tracking** — Five stages: Applied, Interview, Offered, Hired, Rejected
- **Dashboard** — Stat cards, recent applications panel, and status breakdown chart
- **Responsive Layout** — Sidebar on desktop, bottom tab bar on mobile
- **Persistent Session** — Token in `localStorage`; context auto-hydrates on page load

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI |
| ORM | SQLAlchemy |
| Validation | Pydantic v2 |
| Auth | JWT (`python-jose`), bcrypt (`passlib`) |
| Database | SQLite / PostgreSQL (via `DATABASE_URL`) |
| Config | `pydantic-settings` + `.env` |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| State | React Context API |
| Styling | Plain CSS (custom dark design system) |

---

## Project Structure

```
backend/
├── core/config.py
├── db/base.py, database.py, deps.py
├── models/users.py, applications.py
├── schemas/auth.py, user_schema.py, application_schema.py
├── services/auth_service.py, user_service.py, application_service.py
├── routers/auth_router.py, user.py, application_router.py
└── main.py

frontend/
├── api/api.js
├── components/Dashboard, Applications, Login, Register, Profile, Sidebar, Layout, shared/
├── context/AppContext.jsx
└── App.jsx
```

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

`.env`:
```env
DATABASE_URL=sqlite:///./trackr.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

```bash
uvicorn main:app --reload
# Docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install && npm run dev
# App at http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/users/` | ✗ | Register |
| `POST` | `/auth/login` | ✗ | Login → JWT |
| `GET` | `/auth/me` | ✓ | Current user |
| `GET` | `/applications/` | ✓ | List applications |
| `POST` | `/applications/` | ✓ | Create application |
| `PATCH` | `/applications/{id}` | ✓ | Update application |
| `DELETE` | `/applications/{id}` | ✓ | Delete application |

---

## Implementation Notes

- Authorization ordering: fetch → 404 → ownership check, to avoid information leakage via 403 on non-existent IDs
- Pydantic v2 `HttpUrl` serialized to plain string via `field_serializer`
- Partial updates use `is not None` guards so fields can be intentionally cleared
- JWT `sub` stored as string per spec; cast to `int` at decode time

---
