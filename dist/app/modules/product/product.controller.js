"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_joi_validation_1 = __importDefault(require("./product.joi.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const { error, value } = product_joi_validation_1.default.validate(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(value);
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
    }
    catch (err) {
        console.log("error creating product ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: "Products fetched  successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error fetching product ---", err);
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: "Product fetched  successfully!",
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (err) {
        console.log("error fetching product ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductToDB(productId, updatedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated  successfully!",
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not updated!",
            });
        }
    }
    catch (err) {
        console.log("error updating product ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteSingleProductToDB(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product deleted  successfully!",
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not deleted!",
            });
        }
    }
    catch (err) {
        console.log("error deleteing product ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
