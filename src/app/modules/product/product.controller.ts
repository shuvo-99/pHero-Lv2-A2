import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error creating product ---", err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: "Products fetched  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error fetching product ---", err);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Products fetched  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error fetching product ---", err);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await ProductServices.updateSingleProductToDB(
      productId,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Products updated  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error updating product ---", err);
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductToDB(productId);

    res.status(200).json({
      success: true,
      message: "Products deleted  successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error deleteing product ---", err);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
