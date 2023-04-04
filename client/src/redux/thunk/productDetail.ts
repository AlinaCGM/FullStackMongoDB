import { detailActions } from "../slice/productDetails";
import { AppDispatch } from "../store";

export function fetchProductDetailData(id: string | undefined) {
  const url = `https://mobilic-back-end.onrender.com/products/${id}`;
  return (dispatch: AppDispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(detailActions.getDetailData(data));
      });
  };
}
