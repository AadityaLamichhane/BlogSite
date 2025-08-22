
# 🚀 BlogSite

<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript" />
    <img src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite" />
</p>

<p align="center">
    <b>BlogSite</b> — The modern, full-stack blog platform. Create, share, and upvote blogs with a beautiful UI and seamless experience.
</p>

---

## ✨ Features

- 📝 Create, Read, Update, Delete (CRUD) blogs
- 🔒 JWT-based authentication
- 🚀 Fast, modern frontend (Vite + React)
- 📈 Upvote and interact with posts
- 👥 Add music queue streaming (coming soon!)
- 🎨 Responsive, eye-catching UI

---

## 🧑‍💻 Quick Login

Want to try it out? Use the demo credentials:

```text
Email: random@gmail.com
Password: visiter
```

---

## 📁 Project Structure

```text
BlogSite/
├── backend/
│   ├── app.ts
│   ├── routes/
│   ├── prisma/
│   └── ...
├── common/
│   └── src/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── public/
└── README.md
```

---

## 🏗️ Architecture Overview

```mermaid
graph TD
    A[Client Interface] --> B[Express API Gateway]
    B --> C[Authentication Layer]
    C --> D[JWT Validation]
    D --> E[User Session Store]
    B --> F[Blog CRUD Controller]
    F --> G[Database Access Layer]
    G --> H[MongoDB Cluster]
    H --> I[Blog Posts Collection]
    H --> J[User Metadata Collection]

    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#bfb,stroke:#333
    style H fill:#ffb3,stroke:#333

    classDef client fill:#f9f,stroke:#333;
    classDef server fill:#bbf,stroke:#333;
    classDef database fill:#ffb3,stroke:#333;
```

---

## 🚦 Getting Started

1. Clone the repo: `git clone https://github.com/AadityaLamichhane/BlogSite.git`
2. Install dependencies for backend & frontend:
     - `cd backend && npm install`
     - `cd ../frontend && npm install`
3. Set up environment variables (see `.env.example`)
4. Run backend: `npm run dev` (from backend folder)
5. Run frontend: `npm run dev` (from frontend folder)
6. Visit the app in your browser!

---

## 🛠️ Tech Stack

- TypeScript, Node.js, Express
- React, Vite
- Prisma ORM
- MongoDB

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
