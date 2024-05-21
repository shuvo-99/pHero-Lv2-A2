import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/getAllProducts", ProductController.getAllProducts);

export const ProductRoutes = router;
