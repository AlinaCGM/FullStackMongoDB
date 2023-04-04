import mongoose, { Document } from "mongoose";

export type ProductDocument = Document & {
  title: string;
  brand: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
  category: string;
};

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  rating: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  category: {
    type: String,
  },
});
export default mongoose.model<ProductDocument>("Product", ProductSchema);
