import React, { useEffect, useState } from "react";
import Swal from "sweetalert";

class MyCart {
  name: string;
  price: number;
  quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

export default function ListCart() {
  const [myCarts, setMyCarts] = useState<MyCart[]>([
    new MyCart("Cake", 10, 15),
    new MyCart("Hamburger", 15, 32),
  ]);

  useEffect(() => {
    localStorage.setItem("myCarts", JSON.stringify(myCarts));
  }, [myCarts]);

  const handleDeleteItem = (index: number) => {
    const updatedCarts = [...myCarts];
    updatedCarts.splice(index, 1);
    setMyCarts(updatedCarts);
    Swal("Delete successfully", "", "success");
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const updatedCarts = [...myCarts];
    updatedCarts[index].quantity = quantity;
    setMyCarts(updatedCarts);
  };

  const handleUpdateButtonClick = (index: number, quantity: number) => {
    handleUpdateQuantity(index, quantity);
    Swal("Update successfully", "", "success");
  };

  return (
    <>
      <div className="panel-body">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>STT</th>
              <th>Name</th>
              <th style={{ width: "15%" }}>Price</th>
              <th style={{ width: "4%" }}>Quantity</th>
              <th style={{ width: "25%" }}>Action</th>
            </tr>
          </thead>
          <tbody id="my-cart-body">
            {myCarts.length === 0 ? (
              <tr>
                <td colSpan={5}>Chưa có sản phẩm trong giỏ hàng</td>
              </tr>
            ) : (
              myCarts.map((myCart, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{myCart.name}</td>
                  <td>{myCart.price} USD</td>
                  <td>
                    <input
                      name={`cart-item-quantity-${index}`}
                      type="number"
                      value={myCart.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(index, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="label label-info update-cart-item"
                      data-product=""
                      onClick={() =>
                        handleUpdateButtonClick(index, myCart.quantity)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="label label-danger delete-cart-item"
                      data-product=""
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot id="my-cart-footer">
            <tr>
              <td colSpan={4}>
                There are <b>{myCarts.length}</b> items in your shopping cart.
              </td>
              <td colSpan={2} className="total-price text-left">
                {myCarts.reduce(
                  (total, myCart) => total + myCart.price * myCart.quantity,
                  0
                )}{" "}
                USD
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}