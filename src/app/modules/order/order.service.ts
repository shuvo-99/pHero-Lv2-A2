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

const getSingleOrderFromDB = async (_id: string) => {
  const result = await OrderModel.find({ _id });
  return result;
};

const updateSingleOrderToDB = async (_id: string, updatedData: IOrder) => {
  const result = await OrderModel.findByIdAndUpdate({ _id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleOrderToDB = async (_id: string) => {
  const result = await OrderModel.findByIdAndDelete({ _id });
  return result ? null : result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateSingleOrderToDB,
  deleteSingleOrderToDB,
};
