import React, { useState } from "react";
import "./Cart.css";
import { useLocation } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import Cart_item from "../Component/cart_item";
import Discount_Pop from "../Component/Discount_pop";

function Cart_page() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  let total = 0;
  data.forEach((item) => {
    total += item.totalprice;
  });

  const N_main = () => {
    navigate("/");
  };
  return (
    <div className="Body">
      <div className="navbar py-4 navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between align-items-start">
          <div className="d-flex">
            <ShoppingBagIcon sx={{ fontSize: 45, color: "white" }} />
            <h1 onClick={N_main}>Shop | Cart</h1>
          </div>
        </div>
      </div>
      <Discount_Pop show={isPopupOpen} onClose={()=>setIsPopupOpen(!isPopupOpen)} />
      <div className=" mx-5 py-3 mt-4 d-flex justify-content-between align-items-center header">
        <div className=" d-flex  gap-2 mx-3  ">
          <p style={{ width: 70, textAlign: "center" }}>Item</p>
        </div>
        <div className="d-flex  mx-3 hd-left ">
          <p>Price</p>
          <p>Amount</p>
          <p>Total Price</p>
        </div>
      </div>
      {data.map((item, index) => {
        return <Cart_item key={index} items={item} />;
      })}
      <div className="mx-5 py-3 mt-4 d-flex justify-content-between align-items-center header">
        <h4 className="mx-2" style={{ color: "black" }}>
          Total Price : {total}
        </h4>
        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className=" btn btn-success mx-3"
        >
          Discount code
        </button>
      </div>
    </div>
  );
}
export default Cart_page;
