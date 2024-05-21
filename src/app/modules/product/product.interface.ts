export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IProductVariants[];
  inventory: IProductInventory;
}

export interface IProductVariants {
  type: string;
  value: string;
}

export interface IProductInventory {
  quantity: number;
  inStock: boolean;
}
