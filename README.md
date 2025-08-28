# Hotel Guest Management

Mini project using **PocketBase** (backend) and **React + Vite + TypeScript + Tailwind + TanStack Router/Query** (frontend).

---

## Project Structure

- `/server` – PocketBase binary & data  
- `/client` – React frontend

---

## Prerequisites

- Node 18+  
- Git

---

## Backend (PocketBase)

1. Download PocketBase into `/server` and run:

   - macOS/Linux: 
     ```bash
     ./pocketbase serve --http 0.0.0.0:8090
     ```
   - Windows:
     ```bash
     ./pocketbase.exe serve --http 0.0.0.0:8090
     ```

2. Open `http://127.0.0.1:8090/_/` in browser and create an admin user.  

3. Create collection `guests` with fields:

   - `first_name` (Text, required)  
   - `last_name` (Text, required)  
   - `email` (Email, required, unique)  
   - `phone` (Text)  
   - `address` (Text)  
   - `date_of_birth` (Date)  

4. Permissions: leave list/view/create/update/delete rules empty (public allow).  

5. Add 3–5 sample guest records.

**Admin credentials (for grading)**

- Email: `admin@example.com`  
- Password: `CHANGEME`  

> Replace with your own, then update here before submission.

---

## Frontend

```bash
cd client
cp .env.example .env
# Set PocketBase URL in .env
# VITE_PB_URL=http://127.0.0.1:8090
npm install
npm run dev
