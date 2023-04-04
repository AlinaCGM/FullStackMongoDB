// product services here - logic to communicate with database
import Order, { OrderDocument } from "../models/Order";

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save();
};

const getOrderList = async (
  userIdRequest: string
): Promise<OrderDocument[]> => {
  return Order.find({ userId: userIdRequest }).populate("userId");
};

export default {
  createOrder,
  getOrderList,
};
