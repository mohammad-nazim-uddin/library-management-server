import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System!!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error: ", error);
    res.status(400).json({
      message: "Something wrong from global error",
      error,
    });
  }
});

export default app;