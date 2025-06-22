# 📚 Library Management System

A fully functional Library Management System built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This backend project provides RESTful APIs for managing books and borrow records, featuring schema validation, business logic, aggregation reporting, middleware, and more.

---

## 🚀 Features

### 📘 Book Management
- Add, retrieve, update, and delete books.
- Filter books by genre and sort results.
- Field validation for `title`, `author`, `genre`, `ISBN`, etc.

### 📖 Borrowing Management
- Borrow books with quantity check.
- Automatically updates available copies.
- Stores borrow record with quantity and due date.

### 📊 Aggregation Summary
- Summarizes total books borrowed using MongoDB Aggregation Pipeline.

### ⚙️ Backend Functionality
- Centralized error handling.
- Uses Mongoose pre/post middleware.
- Implements static and instance methods for logic like stock update.

---

## 📁 Folder Structure
```
library-management-system/
├── src/
│ ├── models/
│ │ ├── book.model.ts
│ │ └── borrow.model.ts
│ ├── controllers/
│ │ ├── book.controller.ts
│ │ └── borrow.controller.ts
│ ├── routes/
│ │ ├── book.route.ts
│ │ └── borrow.route.ts
│ ├── config/
│ │ └── mongoDb.ts
│ ├── app.ts
│ └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```


