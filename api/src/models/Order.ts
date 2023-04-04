import mongoose, { Document } from "mongoose";
import { ProductSchema } from "./Product";
import User from "./User";

export type OrderDocument = Document & {
  createdAt: Date;
  userId: string;
  productOrder: [];
};

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  //reference

  productOrder: [{ type: ProductSchema }],
  //embeded
});
export default mongoose.model<OrderDocument>("Order", OrderSchema);
