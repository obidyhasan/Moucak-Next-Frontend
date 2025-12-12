# Moucak

Moucak is a full-stack web application built with the MERN stack,
designed to provide a seamless and secure platform with advanced
authentication and cookie-based session handling.

## 🚀 Project Overview

Moucak enables efficient user authentication and session management
using cookies.
The project includes login, logout, and role-based access control to
ensure a secure user experience.

## 🛠️ Tech Stack

- **Frontend:** React.js / Next.js (if applicable)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Cookies
- **Other:** CORS, dotenv, bcrypt, etc.

## ✨ Features

- User authentication with secure cookie handling
- Role-based access control (Admin / User)
- Login and logout functionality with cookie management
- Cross-domain session support using `sameSite=none`
- API endpoints for user management and authentication
- Scalable backend with Express.js

## 📦 Dependencies

Some important dependencies used: - express - cors - jsonwebtoken -
bcrypt - dotenv - cookie-parser

## ⚙️ Installation & Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/moucak-next-frontend.git
    cd moucak
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and configure it:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret_key
    CLIENT_URL=http://localhost:3000
    ```

4.  Run the server in development mode:

    ```bash
    npm run dev
    ```

5.  Open <http://localhost:5000> in your browser.
