import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchema from "./product.joi.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { error, value } = productSchema.validate(productData);
    const result = await ProductServices.createProductIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Data validation unsuccessfully!",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log("error creating product ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Product fetched  successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
  } catch (err) {
    console.log("error fetching product ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

    if (result) {
      res.status(200).json({
        success: true,
        message: "Product updated  successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not updated!",
      });
    }
  } catch (err) {
    console.log("error updating product ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductToDB(productId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Product deleted  successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not deleted!",
      });
    }
  } catch (err) {
    console.log("error deleteing product ---", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
