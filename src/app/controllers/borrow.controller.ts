import express, { Request, Response } from "express";
import { z } from "zod";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

// const BorrowBookZodSchema = z.object({
//   book: z.string(),
//   quantity: z.number(),
//   dueDate: z.date(),
// });

const BorrowBookZodSchema = z.object({
  book: z.string(),
  quantity: z
    .number()
    .int({ message: "Copies must be a positive number" })
    .min(1, { message: "Copies must be at least 1" }),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
});

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    // const { book: bookId, quantity, dueDate } = req.body;

    // Zod Validation
    const zodBody = await BorrowBookZodSchema.parseAsync(req.body);
    const { book: bookId, quantity, dueDate } = zodBody;

    // Verify the book has enough available copies
    const findingBook = await Book.findById(bookId);
    if (!findingBook) {
      res.status(404).json({
        status: false,
        message: "Book not found",
      });
    }

    // const updateInfo = await Borrow.updateAvailability(bookId, quantity);
    // console.log("This is from borrow controller: ", updateInfo);

    if (findingBook?.copies! < quantity) {
      res.status(404).json({
        status: false,
        message: "Not enough copies available",
      });
    }

    await Borrow.updateAvailability(bookId, quantity);

    const data = await Borrow.create(req.body);

    res.status(201).json({
      status: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

// Get All Borrowed books
borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borrowedBooksSummary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooksSummary,
    });
  } catch (error: any) {
    res.status(500).json({
      // status: false,
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error,
    });
  }
});