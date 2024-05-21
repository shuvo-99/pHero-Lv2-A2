import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error creating order ---", err);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getAllOrdersFromDB(email);

    res.status(200).json({
      success: true,
      message: "Orders fetched  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error fetching order ---", err);
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDB(orderId);

    res.status(200).json({
      success: true,
      message: "Orders fetched  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error fetching order ---", err);
  }
};

const updateSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedData = req.body;
    const result = await OrderServices.updateSingleOrderToDB(
      orderId,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Orders updated  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error updating order ---", err);
  }
};

const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.deleteSingleOrderToDB(orderId);

    res.status(200).json({
      success: true,
      message: "Orders deleted  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error deleteing order ---", err);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
};
