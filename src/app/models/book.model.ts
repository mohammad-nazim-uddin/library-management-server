import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Mongoose middleware to update 'available' field before saving
// Document middleware
bookSchema.pre("save", function (next) {
  console.log("Doc from pre " + this);
  next();
});

// Mongoose middleware
// Query Middleware
bookSchema.post("save", function (doc, next) {
  console.log(`${doc.title} book Saved successfully.`);
  next();
});

export const Book = model<IBooks>("Book", bookSchema);