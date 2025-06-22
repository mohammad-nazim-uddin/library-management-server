import express, { Request, Response } from "express";
import { z } from "zod";
import { Book } from "../models/book.model";

export const booksRoutes = express.Router();

const CreateBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
});

// Create New Book
booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    // Zod Validation
    const zodBody = await CreateBookZodSchema.parseAsync(req.body);

    const data = await Book.create(zodBody);
    // const data = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to create book",
      success: false,
      error,
    });
  }
});

// Get All Books
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    // console.log("Get ALl Books");
    const genre = req.query.filter as string;
    const sortBy = req.query.sortBy as string;
    const sortAscOrDesc = req.query.sort as string;
    const limitBooks = (req.query.limit as string) || "10";

    let query = Book.find();
    // console.log("Line 49: ", query);

    // Filtering
    if (genre) {
      query = Book.find({ genre });
    }

    // Sorting
    if (sortBy && sortAscOrDesc) {
      const sortOption: { [key: string]: any } = {};
      sortOption[sortBy] = sortAscOrDesc === "desc" ? -1 : 1;
      query = query.sort(sortOption);
    }

    // Limiting
    if (limitBooks) {
      query = query.limit(parseInt(limitBooks));
    }

    const books = await query;
    // console.log("Line 69: ", books);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error,
    });
  }
});

// Get Single Book
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);

    if (!data) {
      res.status(404).json({
        status: false,
        message: "Failed to retrive books",
      });
    }

    res.status(201).json({
      status: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error,
    });
  }
});

// Delete Single Book
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  //   const data = await Book.findByIdAndDelete(bookId);
  //   const data = await Book.deleteOne({ _id: bookId });
  const data = await Book.findOneAndDelete({ _id: bookId });

  if (!data) {
    res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  res.status(201).json({
    success: true,
    messaage: "Book deleted successfully",
    data,
  });
});

// Update a singel book data
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updateBody = req.body;

  const findBook = await Book.findById(bookId);
  if (!findBook) {
    res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  const data = await Book.findByIdAndUpdate(bookId, updateBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    data,
  });
});