"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/books", book_controller_1.booksRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management System!!");
});
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
    });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("Error: ", error);
        res.status(400).json({
            message: "Something wrong from global error",
            error,
        });
    }
});
exports.default = app;
