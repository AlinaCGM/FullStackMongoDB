export type Product = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
  category: string;
  quantity: number;
};
export type ProductOrder = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
};
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
};

export type ProductDetail = {
  product: Product;
};

export type Order = {
  _id: string;
  productOrder: ProductOrder[];
  createdAt: number;
  userId: string;
};
export type Cart = {
  _id: string;
  userId: string;
  product: Product[];
};
