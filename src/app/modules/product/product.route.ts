import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:productId", ProductController.getSingleProduct);
router.post("/products/:productId", ProductController.updateSingleProduct);
router.delete("/products/:productId", ProductController.deleteSingleProduct);

export const ProductRoutes = router;
