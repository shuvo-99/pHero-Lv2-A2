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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_joi_validation_1 = __importDefault(require("./order.joi.validation"));
const product_model_1 = require("../product/product.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const { error, value } = order_joi_validation_1.default.validate(orderData);
        if (error) {
            res.status(500).json({
                success: false,
                message: "Data validation unsuccessfully!",
                error: error.details,
            });
        }
        const product = yield product_model_1.ProductModel.findById(value.productId);
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
        const result = yield order_service_1.OrderServices.createOrderIntoDB(value);
        product.inventory.quantity -= value.quantity;
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        yield product.save();
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error creating order ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB(email);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: "Orders fetched  successfully!",
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Orders not found!",
            });
        }
    }
    catch (err) {
        console.log("error fetching order ---", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
};
