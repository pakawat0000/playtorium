import React, {useState } from "react";
import "./Main.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Item from "../Component/Item";
import { useNavigate } from "react-router-dom";

function Main_page() {
  const list_item = require("../list_item.json");
  const navigate = useNavigate();
  const [item_in_cart, setitem_in_cart] = useState([]);

  function Submit(item) {
    setitem_in_cart((previse) => {
  const sum_previse = [...previse];
  let itemFound = false;

  sum_previse.forEach((e_item) => {
    if (e_item.name === item.name) {
      e_item.amount += item.amount;
      itemFound = true;
    }
  });

  if (!itemFound) {
    sum_previse.push(item);
  }
  return sum_previse;
});
  }

  const N_Cart = () => {
    navigate("/cart", {state:item_in_cart});
  };

  return (
    <div className="Body">
      <div className="navbar py-4 navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between align-items-start">
          <div className="d-flex">
            <ShoppingBagIcon sx={{ fontSize: 45, color: "white" }} />
            <h1>Shop</h1>
          </div>
          <div className="cart-i" onClick={N_Cart}>
            {item_in_cart.length > 0 && (
              <div className="circle-num">{item_in_cart.length}</div>
            )}
            <ShoppingCartOutlinedIcon sx={{ fontSize: 45, color: "white" }} />
          </div>
        </div>
      </div>
      <div className="container mt-5 ">
        <div className="row row-cols-1 row-cols-sm-2 g-sm-2 row-cols-md-2 row-cols-lg-3 row-col-xl-4 g-2 ">
          {list_item.map((item, index) => {
            return <Item key={index} Submit={Submit} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Main_page;
