import React from "react";
import { useReducer } from "react";

function Item(props) {
  const [state, dispatch] = useReducer(reducer, { amount: 0 });

  function reducer(state, action) {
    const item_detail = {
      name: props.item.name,
      price: props.item.price,
      xmlns: props.item.xmlns,
      amount: state.amount, 
      category : props.item.category,
      totalprice: props.item.price * state.amount,
    };
    switch (action.type) {
      case "decrease":
        if (state.amount > 0) {
          return { amount: state.amount - 1 };
        } else {
          return { amount: state.amount };
        }
      case "increase":
        return { amount: state.amount + 1 };
      case "reset":
        props.Submit(item_detail);
        return { amount: 0 };
      default:
        console.log("tyep not match");
    }
  }

  return (
    <div className="col p-3">
      <div className="card shadow-sm" style={{maxWidth: '17rem'}}>
        <img
          alt=""
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="200"
          src={props.item.xmlns}
        ></img>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="card-text">{props.item.name}</h3>
            <p className="card-text">{props.item.price}</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div></div>
            <div className="amount">
              <div className="btn-group">
                <button
                  onClick={() => {
                    dispatch({ type: "decrease" });
                  }}
                  className="bt-d"
                >
                  -
                </button>

                <div className="dis-a">{state.amount}</div>
                <button
                  onClick={() => {
                    dispatch({ type: "increase" });
                  }}
                  className="bt-i"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  dispatch({ type: "reset" });
                }}
                disabled={state.amount > 0 ? false : true}
                className=" btn-sm submit"
              >
                Add Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
