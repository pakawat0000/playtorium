import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useLocation } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import CartItem from "../Component/cart_item";
import DiscountPop from "../Component/Discount_pop";

function Cart_page() {
  const [total_dis, settotal_dis] = useState(0);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  let init_total = 0;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [total, settotal] = useState(init_total);
  data.forEach((item) => {
    init_total += item.totalprice;
  });
  localStorage.setItem("total_price", JSON.stringify(init_total));

  const N_main = () => {
    navigate("/");
  };

  const Confirm = (total_price, total_discount) => {
   settotal_dis(total_discount);
    settotal(total_price);
  };
  const openPop = () => {
    localStorage.setItem("total_price", JSON.stringify(total));
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    settotal(init_total);
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener('beforeunload', clearLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);
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
      <DiscountPop
        confirm={Confirm}
        total={total}
        data={data}
        show={isPopupOpen}
        onClose={() => setIsPopupOpen(!isPopupOpen)}
      />
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
        return <CartItem key={index} items={item} />;
      })}
      <div className="mx-5 py-3 mt-4 d-flex justify-content-between align-items-center header">
        <div></div>
        <p className="mx-3">Total discount : {total_dis} bath </p>
      </div>
      <div className="mx-5 py-3 mt-4 d-flex justify-content-between align-items-center header">
        <h4 className="mx-2" style={{ color: "black" }}>
          Total Price : {total} bath
        </h4>
        <button onClick={openPop} className=" btn btn-success mx-3">
          Discount code
        </button>
      </div>
    </div>
  );
}
export default Cart_page;
