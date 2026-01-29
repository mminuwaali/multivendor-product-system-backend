# Product System API (Backend)

A robust, modular Backend API built with **NestJS** and **MongoDB** designed to support a multi-vendor e-commerce platform. This system enforces strict vendor isolation, ensuring that vendors can only manage their own products.

## 🚀 Features

-   **Vendor Isolation:** Strict ownership checks to prevent cross-vendor data access.
-   **Product Management:**
    -   Create, Read, Update, and Soft Delete products.
    -   Vendor-scoped product listing with pagination.
-   **Authentication:** Secure JWT-based authentication for vendors.
-   **Validation:** Comprehensive DTO validation using `class-validator`.
-   **Documentation:** Auto-generated API documentation via Swagger.
-   **Architecture:** Modular and SOLID-compliant design with Service/Repository patterns.
-   **Security:** Helmet headers and compression enabled.

## 🛠️ Tech Stack

-   **Framework:** [NestJS](https://nestjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
-   **Authentication:** Passport JWT
-   **Documentation:** Swagger / OpenAPI
-   **Containerization:** Docker & Docker Compose

## 📋 Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nestjs-product-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory (or use the provided defaults for development).
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/nest-product-system
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRATION=1d
    ```

4.  **Run the Application:**
    ```bash
    # Development mode
    npm run start:dev

    # Production mode
    npm run start:prod
    ```

## 📖 API Documentation

Once the application is running, access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📂 Project Structure

```
src/
├── common/         # Global filters, guards, pipes, and utilities
├── config/         # Configuration files (Database, App, JWT)
├── database/       # Database connection and base repository
├── modules/        # Feature modules
│   ├── auth/       # Authentication logic
│   ├── category/   # Product categories
│   ├── product/    # Product CRUD and logic
│   └── vendor/     # Vendor management
└── main.ts         # Application entry point
```

## 📄 License

This project is licensed under the MIT License.