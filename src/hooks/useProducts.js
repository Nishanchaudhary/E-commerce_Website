import { useEffect, useState } from "react";
import { fetchProducts } from "../apiLayer/index";

export function useProducts() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchProducts()
      .then((networkData) => {
        setProductList(networkData);
      })
      .catch((err) => console.log(err));
  }, []);
  return [productList];
}

export default useProducts;
