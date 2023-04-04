import { Request, Response } from "express";
import ProductServices from "../services/products";
import Product from "../models/Product";

export const getAllProductsController = async (
  request: Request,
  response: Response
) => {
  try {
    const productList = await ProductServices.getProductList();
    response.json(productList);
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetailsController = async (
  request: Request,
  response: Response
) => {
  try {
    const productId = request.params.productId;
    const productInfo = await ProductServices.getProductDetails(productId);

    response.json(productInfo);
  } catch (error) {
    console.log(error);
  }
};

export const createProductController = async (
  request: Request,
  response: Response
) => {
  try {
    const newProduct = new Product({
      title: request.body.title,
      brand: request.body.brand,
      price: request.body.price,
      description: request.body.description,
      thumbnail: request.body.thumbnail,
      rating: request.body.rating,
      discountPercentage: request.body.discountPercentage,
      category: request.body.category,
    });
    const product = await ProductServices.createProduct(newProduct);
    response.json(product);
  } catch (error) {
    console.log(error);
  }
};
