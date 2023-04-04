import Product, { ProductDocument } from "../models/Product";

const createProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return product.save();
};

const getProductList = async (): Promise<ProductDocument[]> => {
  return Product.find();
};
const getProductDetails = async (
  productId: string
): Promise<ProductDocument | null> => {
  Product.findById(productId);
  return Product.findById(productId);
};

export default {
  createProduct,
  getProductList,
  getProductDetails,
};
