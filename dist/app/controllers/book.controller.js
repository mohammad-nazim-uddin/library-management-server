"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
const CreateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
// Create New Book
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Zod Validation
        const zodBody = yield CreateBookZodSchema.parseAsync(req.body);
        const data = yield book_model_1.Book.create(zodBody);
        // const data = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to create book",
            success: false,
            error,
        });
    }
}));
// Get All Books
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("Get ALl Books");
        const genre = req.query.filter;
        const sortBy = req.query.sortBy;
        const sortAscOrDesc = req.query.sort;
        const limitBooks = req.query.limit || "10";
        let query = book_model_1.Book.find();
        // console.log("Line 49: ", query);
        // Filtering
        if (genre) {
            query = book_model_1.Book.find({ genre });
        }
        // Sorting
        if (sortBy && sortAscOrDesc) {
            const sortOption = {};
            sortOption[sortBy] = sortAscOrDesc === "desc" ? -1 : 1;
            query = query.sort(sortOption);
        }
        // Limiting
        if (limitBooks) {
            query = query.limit(parseInt(limitBooks));
        }
        const books = yield query;
        // console.log("Line 69: ", books);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error,
        });
    }
}));
// Get Single Book
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error,
        });
    }
}));
// Delete Single Book
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    //   const data = await Book.findByIdAndDelete(bookId);
    //   const data = await Book.deleteOne({ _id: bookId });
    const data = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
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
}));
// Update a singel book data
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updateBody = req.body;
    const findBook = yield book_model_1.Book.findById(bookId);
    if (!findBook) {
        res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    const data = yield book_model_1.Book.findByIdAndUpdate(bookId, updateBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data,
    });
}));
