# Project Backend-01 🚀

A professional, production-ready Node.js & Express modular backend template designed for scalability, maintainability, and clear separation of concerns.

## 📖 Overview

This project serves as a robust foundation for building modern web applications. It follows a **Modular Architecture** pattern, ensuring that each feature is self-contained while sharing common utilities and configurations.

---

## ✨ Features

- **Modular Architecture**: Feature-based organization (Auth, Cart, etc.) for better maintainability.
- **Service-Oriented Design**: Business logic is decoupled from controllers using services.
- **Data Validation**: Request payloads are validated using **Joi** before reaching the controllers.
- **Standardized API Responses**: Consistent JSON response formatting for success and error cases.
- **Robust Error Handling**: Centralized error management to prevent application crashes and provide meaningful feedback.
- **Authentication**: Secure JWT-based authentication system.
- **Security**: Environment-based configuration using `dotenv`.
- **Modern ES Modules**: Built using native Node.js ES Modules (`import/export`).

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Joi
- **Authentication**: JSON Web Token (JWT)
- **Environment**: Dotenv
- **Version Control**: Git

---

## 📂 Project Structure

```bash
backend-01/
├── src/
│   ├── common/           # Shared resources across the application
│   │   ├── config/       # Database and app configurations
│   │   ├── constants/    # Global constants and enums
│   │   ├── dto/          # Data Transfer Objects for common types
│   │   ├── middleware/   # Shared Express middlewares (Auth, Validation)
│   │   └── utils/        # Helper functions (API Response/Error, JWT)
│   ├── modules/          # Feature-based folders
│   │   ├── auth/         # Authentication module
│   │   │   ├── dto/      # Auth-specific validation schemas
│   │   │   ├── controller # Handles incoming requests
│   │   │   ├── service    # Contains business logic
│   │   │   ├── model      # Mongoose schemas/models
│   │   │   └── routes     # API endpoints definition
│   │   └── cart/         # Cart module (Placeholder/Planned)
│   └── app.js            # Express app initialization
├── server.js             # Main entry point (starts the server)
└── .env.example          # Template for environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend-01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example file to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```

4. **Run the application:**
   - **Development mode:**
     ```bash
     npm start # or node server.js
     ```

---

## 🔑 Environment Variables

The application uses the following environment variables. See [.env.example](.env.example) for reference.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number the server listens on | `8080` |
| `NODE_ENV` | Environment mode (`development`, `production`) | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/backend` |
| `JWT_SECRET` | Secret key for signing tokens | `your_secret_here` |

---

## 🛤 API Overview (Modules)

### Auth Module
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | `RegisterDto` (Joi) |
| `POST` | `/api/auth/login` | Authenticate user & get token | `LoginDto` (Planned) |

---

## 🛡 Best Practices Followed

- **Separation of Concerns**: Controllers handle HTTP, Services handle logic, Models handle data.
- **Fail-Safe Server Start**: The server only starts if the database connection is successful.
- **DTOs**: Using Data Transfer Objects (Validation schemas) to ensure data integrity.
- **Standardized Responses**: Using `ApiResponse` and `ApiError` classes for consistency.
- **Modular Routing**: Each module defines its own routes, making the main app file clean.

---

## 🔮 Future Improvements

- [ ] Implement Refresh Token mechanism.
- [ ] Add Redis for caching.
- [ ] Unit and Integration testing with Jest/Supertest.
- [ ] Swagger/OpenAPI documentation.
- [ ] CI/CD Pipeline integration.

---

## 👤 Author

**Tanvir Islam**
- GitHub: [tanvirislam9425](https://github.com/tanvirislam9425)

---

## 📄 License

This project is licensed under the **ISC License**.
