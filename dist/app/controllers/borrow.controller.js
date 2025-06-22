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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
// const BorrowBookZodSchema = z.object({
//   book: z.string(),
//   quantity: z.number(),
//   dueDate: z.date(),
// });
const BorrowBookZodSchema = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z
        .number()
        .int({ message: "Copies must be a positive number" })
        .min(1, { message: "Copies must be at least 1" }),
    dueDate: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    })
        .transform((val) => new Date(val)),
});
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { book: bookId, quantity, dueDate } = req.body;
        // Zod Validation
        const zodBody = yield BorrowBookZodSchema.parseAsync(req.body);
        const { book: bookId, quantity, dueDate } = zodBody;
        // Verify the book has enough available copies
        const findingBook = yield book_model_1.Book.findById(bookId);
        if (!findingBook) {
            res.status(404).json({
                status: false,
                message: "Book not found",
            });
        }
        // const updateInfo = await Borrow.updateAvailability(bookId, quantity);
        // console.log("This is from borrow controller: ", updateInfo);
        if ((findingBook === null || findingBook === void 0 ? void 0 : findingBook.copies) < quantity) {
            res.status(404).json({
                status: false,
                message: "Not enough copies available",
            });
        }
        yield borrow_model_1.Borrow.updateAvailability(bookId, quantity);
        const data = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            status: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
}));
// Get All Borrowed books
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooksSummary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            // status: false,
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error: error,
        });
    }
}));
