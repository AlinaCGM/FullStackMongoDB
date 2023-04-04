import { relatedProductsActions } from "../slice/relatedProducts";
import { AppDispatch } from "../store";

export default function fetchRelatedProductsData(
  categoryName: string | undefined
) {
  const url = `https://mobilic-back-end.onrender.com/products/${categoryName}`;
  return (dispatch: AppDispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        dispatch(relatedProductsActions.getRelatedProductsData(data))
      );
  };
}
