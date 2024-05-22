import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  let result;

  if (email) {
    result = await OrderModel.find({
      email: { $regex: email, $options: "i" },
    });
  } else {
    result = await OrderModel.find();
  }
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
