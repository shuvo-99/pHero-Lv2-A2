import Joi from "joi";
import { IProduct } from "./product.interface";

const variantSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventorySchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantSchema).required(),
  inventory: inventorySchema.required(),
});

export default productSchema;
