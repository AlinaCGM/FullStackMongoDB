import { Request, Response } from "express";
import OrderServices from "../services/orders";
import Order from "../models/Order";

export const getAllOrderByUserId = async (
  request: Request,
  response: Response
) => {
  try {
    const orderList = await OrderServices.getOrderList(request.params.id);
    response.json(orderList);
  } catch (error) {
    console.log(error);
  }
};

export const createOrderController = async (
  request: Request,
  response: Response
) => {
  try {
    const newOrder = new Order({
      userId: request.params.userId,
      productOrder: request.body.productOrder,
    });
    const order = await OrderServices.createOrder(newOrder);
    response.json(order);
  } catch (error) {
    console.log(error);
  }
};
