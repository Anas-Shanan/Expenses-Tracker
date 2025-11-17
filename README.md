# Expenses Tracker

> A lightweight personal expenses tracker (MERN-style) — Node/Express backend with MongoDB, React frontend.

This repository contains a small full-stack app to register/login users, upload profile pictures, and create/read/update/delete expenses.

---

## Features

- User authentication (register, login, logout) with JWT stored in httpOnly cookies.
- Profile management: update profile, upload/delete profile pictures.
- Expense management: create, read, update, delete expenses.
- Responsive frontend built with React and Vite.
- Secure backend with Express and MongoDB.

---

## Tech Stack

- **Frontend**: React (Vite), CSS for styling.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Authentication**: JWT stored in httpOnly cookies.
- **File Uploads**: multer for handling profile picture uploads.

---

## Project Structure

```
Backend/
  package.json
  server.js
  controllers/
    authController.js
    userController.js
    expenseController.js
  middleware/
    authMiddleware.js
    uploadMiddleware.js
  models/
    User.js
    Expense.js
  routes/
    authRoutes.js
    userRoutes.js
    expenseRoutes.js
  service/
    dbConnect.js
  uploads/   <-- dev uploads

Frontend/
  package.json
  src/
    App.css
    components/
      Login.jsx
      Register.jsx
      UpdateProfile.jsx
      ExpenseList.jsx
    pages/
      Home.jsx
      UserProfile.jsx
    main.jsx
```

---

## Environment Variables

Create a `.env` file in the `Backend/` directory with the following variables:

```
PORT=5000
MONGO_URL=<your-mongo-connection-string>
DATABASE=<your-database-name>
JWT_SECRET=<your-jwt-secret>
COOKIE_EXPIRE=24
FRONTEND_URL=http://localhost:5173
```

---

## Setup Instructions

### Backend

1. Navigate to the `Backend/` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the `Frontend/` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Auth Routes

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT.
- `POST /api/auth/logout`: Logout and clear the JWT cookie.
- `GET /api/auth/me`: Get the current logged-in user.

### User Routes

- `PUT /api/user/update`: Update user profile (name, bio).
- `PUT /api/user/profilePic`: Upload a profile picture.
- `DELETE /api/user/profilePic`: Delete the profile picture.

### Expense Routes

- `GET /api/expense`: Get all expenses for the logged-in user.
- `POST /api/expense`: Add a new expense.
- `GET /api/expense/:id`: Get a specific expense by ID.
- `PATCH /api/expense/:id`: Update an expense by ID.
- `DELETE /api/expense/:id`: Delete an expense by ID.

---

## Testing

Use tools like Postman or cURL to test the API endpoints. Example cURL commands:

- **Register a user**:

  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
  ```

- **Login**:
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
  ```

---

## Deployment

1. Build the frontend:
   ```bash
   cd Frontend
   npm run build
   ```
2. Deploy the backend and frontend to your hosting provider (e.g., Render, Heroku, Vercel).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---
