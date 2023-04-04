import { orderActions } from "../slice/order";
import { AppDispatch } from "../store";

export function getAllOrders(userId: string) {
  const token = localStorage.getItem("token");
  const url = `https://mobilic-back-end.onrender.com/orders/${userId}`;
  return async (dispatch: AppDispatch) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const orderData = await res.json();

    dispatch(orderActions.getOrderList(orderData));
  };
}
