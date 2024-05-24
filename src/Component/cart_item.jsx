import React from "react";
function CartItem(props) {
    const item = props.items
  return (
    <div className=" mx-5 mt-2 d-flex justify-content-between align-items-center header">
      <div className=" d-flex  gap-3 mx-3 ">
        <img
        alt=""
         width="70"
         height="70"
         viewBox="0 0 100 100"
         src={item.xmlns}></img>
      </div>
      <div className="d-flex  mx-3 hd-left">
        <p>{item.price}</p>
        <p>{item.amount}</p>
        <p>{item.price*item.amount}</p>
      </div>
    </div>
  );
}

export default CartItem;
