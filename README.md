# Event Engage

A real-time event engagement platform where users can browse events, join/leave them, and see live attendee updates. Built with Node.js, GraphQL, Prisma, Socket.io, PostgreSQL, and React Native (Expo).

---

## Features
- View a list of upcoming events
- Join or leave events
- See real-time attendee updates (Socket.io)
- Mock authentication (Alice/Bob)
- Responsive, modern UI (web & mobile)

---

## Tech Stack
- **Backend:** Node.js, GraphQL, Prisma, Socket.io
- **Database:** PostgreSQL (Docker)
- **Frontend:** React Native (Expo), Zustand, TanStack Query
- **Type Safety:** TypeScript

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd event-engage
```

### 2. Start PostgreSQL with Docker
```bash
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend
npm install
# Update .env if needed (see DATABASE_URL)
npx prisma migrate dev --name init
npm run seed  # (optional) Seed test data
npm run dev   # Start backend server
```
- Backend runs at: `http://localhost:4000/graphql`

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npx expo start
```
- Press `w` to open in web browser, or scan QR code with Expo Go app on your phone.
- Recommended to use Expo Go 

---

## Example Credentials (Mock Login)
On the login screen, choose one of:

- **Alice Johnson**
  - Email: `alice@example.com`
  - Token: `token-alice`
- **Bob Smith**
  - Email: `bob@example.com`
  - Token: `token-bob`

(Just select the user, no password required.)

---

## Notes
- **Mobile:** If using Expo Go, update the API URL in `frontend/src/graphql/client.ts` to your computer's LAN IP (e.g., `http://192.168.1.100:4000/graphql`).
- **Web:** Works out of the box with `localhost`.
- **Database:** Data is stored in the Dockerized PostgreSQL instance.

---

## Scripts
- **Backend:**
  - `npm run dev` — Start backend server
  - `npm run seed` — Seed test data
- **Frontend:**
  - `npm start` or `npx expo start` — Start Expo app

---

