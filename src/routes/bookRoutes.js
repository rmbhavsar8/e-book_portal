import express from "express";
import bookController from "../controllers/bookController.js";

const router =  express.Router();

router.post("/create-book",bookController.createBook);

router.post("/update-book",bookController.updateBook)

export default router;