import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderSchema from "./order.joi.validation";
import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { error, value } = orderSchema.validate(orderData);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Data validation unsuccessfully!",
        error: error.details,
      });
    }

    const product = await ProductModel.findById(value.productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    if (product.inventory.quantity < value.quantity) {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
      return;
    }

    const result = await OrderServices.createOrderIntoDB(value);

    product.inventory.quantity -= value.quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }
    await product.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error creating order ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getAllOrdersFromDB(email);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Orders fetched  successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Orders not found!",
      });
    }
  } catch (err) {
    console.log("error fetching order ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
