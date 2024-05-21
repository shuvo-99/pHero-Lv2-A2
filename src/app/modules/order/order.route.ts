import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:orderId", OrderController.getSingleOrder);
router.post("/:orderId", OrderController.updateSingleOrder);
router.delete("/:orderId", OrderController.deleteSingleOrder);

export const OrderRoutes = router;
