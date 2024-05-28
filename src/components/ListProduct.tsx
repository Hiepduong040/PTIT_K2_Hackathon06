import React, { useEffect, useState } from "react";
import ListCart from "./ListCart";

class Product {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  isDisabled: boolean;

  constructor(
    name: string,
    description: string,
    image: string,
    price: number,
    quantity: number
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.isDisabled = quantity === 0;
  }
}

type HandleAddToCartType = (product: Product, quantity: number, index: number) => void;

export default function ListProduct({ handleAddToCart }: { handleAddToCart: HandleAddToCartType }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
    //   setProducts([
    //     new Product(
    //       'Pizza',
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
    //       'images/pizza.jpg',
    //       30,
    //       0
    //     ),
    //     new Product(
    //       'Hamburger',
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
    //       './images/Hamburger.jpg',
    //       15,
    //       4
    //     ),
    //     new Product(
    //       'Bread',
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
    //       'images/bread.jpg',
    //       20,
    //       1
    //     ),
    //     new Product(
    //       'Cake',
    //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
    //       './images/Cake.jpg',
    //       10,
    //       1
    //     ),
    //   ]);
    // 
  }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    updatedProducts[index].isDisabled = newQuantity === 0;
    setProducts(updatedProducts);
  };

  return (
    <>
      <div className="panel-body" id="list-product">
        {products.map((product, index) => (
          <div key={index}>
            <div className="media product">
              <div className="media-left">
                <a href="#">
                  <img
                    className="media-object"
                    src={product.image}
                    alt={product.name}
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{product.name}</h4>
                <p>{product.description}</p>
                <input
                  name={`quantity-product-${index}`}
                  type="number"
                  defaultValue={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                />
                {product.quantity < 1 ? (
                  <span data-product={index} className="price disabled">
                    {product.price} USD
                  </span>
                ) : (
                  <button
                    data-product={index}
                    className="price"
                    onClick={() => handleAddToCart(product, product.quantity, index)}
                  >
                    {product.price} USD
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

