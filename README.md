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

## 🧪 API Endpoints

### 📘 Books

- `POST /api/books`: Create a new book.
- `GET /api/books`: Get all books (supports filtering and sorting).
- `GET /api/books/:bookId`: Get a book by ID.
- `PUT /api/books/:bookId`: Update a book.
- `DELETE /api/books/:bookId`: Delete a book.

### 📘 Borrow

- `POST /api/borrow`: Borrow a book.
- `GET /api/borrow`: Get a summary of borrowed books.

## Models

### Book

| Field       | Type    | Required | Description                                                                 |
| ----------- | ------- | -------- | --------------------------------------------------------------------------- |
| title       | string  | Yes      | The title of the book.                                                      |
| author      | string  | Yes      | The author of the book.                                                     |
| genre       | string  | Yes      | The genre of the book (FICTION, NON_FICTION, SCIENCE, etc.).                |
| isbn        | string  | Yes      | The International Standard Book Number (unique).                            |
| description | string  | No       | A brief summary or description of the book.                                 |
| copies      | number  | Yes      | Total copies available.                                                     |
| available   | boolean | No       | Indicates if the book is currently available for borrowing (default: true). |

### Borrow

| Field    | Type     | Required | Description                                  |
| -------- | -------- | -------- | -------------------------------------------- |
| book     | objectId | Yes      | References the borrowed book’s ID.           |
| quantity | number   | Yes      | The number of copies borrowed.               |
| dueDate  | date     | Yes      | The date by which the book must be returned. |

## 🛠️ Technologies Used

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- Mongoose Middleware
- RESTful API Structure
- Aggregation Pipelines

## Setting up the project locally

### Prerequisites

- Node.js (version 16 or higher)
- MongoDB

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/MdAfsarHossain/Library-Management-System-Backend.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd library-management-system
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables:

```js
PORT=<port_number> (e.g., 5000)
DATABASE_NAME=<database_name>
DATABASE_PASS=<database_pass>
```

```js
Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<port_number>` with the port you want the server to run on.
```

### Running the application

1. Start the MongoDB server.
2. Run the application:

```bash
npm run dev
```

This will start the server using `nodemon` for automatic restarts on file changes. If you don't have nodemon, you can use `npm start` but you will have to manually restart the server each time you make a change.

3. The server will be running on the specified port (default: `http://localhost:5000`).

## Example Usage

### ➕ Create a Book

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}' http://localhost:5000/api/books
```



