// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.

import { model, Schema } from "mongoose";
import { BookStaticMethods, IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow, BookStaticMethods>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Static Methods
borrowSchema.static(
  "updateAvailability",
  async function (bookId: string, quantity: number) {
    // console.log(this);
    const book = await Book.findById(bookId);

    if (!book) {
      throw new Error("Product not found");
    }

    if (book.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    book.copies -= quantity;

    if (book.copies === 0) {
      book.available = false;
    }

    await book.save();

    // console.log("This message from static methods.");
    return quantity;
  }
);

export const Borrow = model<IBorrow, BookStaticMethods>("Borrow", borrowSchema);