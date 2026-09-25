import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-category",authMiddleware,categoryController.createcategory);

router.patch("/update-category/:id",authMiddleware,categoryController.updateCategory);

router.get("/get-categories",authMiddleware,categoryController.getAllCategories);

router.delete("/delete-category/:id",authMiddleware,categoryController.deleteCategories)

export default router;