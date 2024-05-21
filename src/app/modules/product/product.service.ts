import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.find({ _id });
  return result;
};

const updateSingleProductToDB = async (_id: string, updatedData: IProduct) => {
  const result = await ProductModel.findByIdAndUpdate({ _id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleProductToDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id });
  return result ? null : result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductToDB,
  deleteSingleProductToDB,
};
