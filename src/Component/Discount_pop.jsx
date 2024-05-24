import React, { useReducer, useState } from "react";
import "./Discount_pop.css";

function DiscountPop(props) {
  const local_store_price = localStorage.getItem("total_price");
  const initialState = {
    total: local_store_price,
    appliedDiscounts: {
      cupon: null,
      ontop: null,
      seasonal: null,
    },
  };
  const discounts = require("../discount_code.json");
  const [total_discount, settotal_discount] = useState(0);
  const [each_dis, seteach_dis] = useState({
    fix: 0,
    percent: 0,
    percent_category: 0,
    point: 0,
    campaigns: 0,
  });
  const [point, setpoint] = useState(0);
  function reducer(state, action) {
    switch (action.type) {
      case "apply_discount":
        const discountToAdd = discounts.find(
          (d) => d.type === action.discountType
        );
        switch (action.discountType) {
          case "fix":
            settotal_discount((previse) => {
              return previse + discountToAdd.amount;
            });
            state.total -= discountToAdd.amount;
            state.appliedDiscounts.cupon = "fix";
            seteach_dis((previse) => {
              return {
                ...previse,
                [action.discountType]: discountToAdd.amount,
              };
            });
            return state;
          case "percent":
            const dis_percent = state.total * (discountToAdd.percent / 100);
            settotal_discount((previse) => {
              return previse + dis_percent;
            });
            state.total -= dis_percent;
            state.appliedDiscounts.cupon = "percent";
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: dis_percent };
            });
            return state;
          case "percent_category":
            let cloth_price = 0;
            props.data.forEach((item) => {
              if (item.category === "cloth") {
                cloth_price += item.totalprice;
              }
            });

            const dis_percent_category =
              cloth_price * (discountToAdd.percent / 100);
            settotal_discount((previse) => {
              return previse + dis_percent_category;
            });
            state.total -= dis_percent_category;
            state.appliedDiscounts.ontop = "percent";
            seteach_dis((previse) => {
              return {
                ...previse,
                [action.discountType]: dis_percent_category,
              };
            });
            return state;
          case "point":
            state.total -= point;
            settotal_discount((previse) => {
              return previse + point;
            });
            state.appliedDiscounts.ontop = "point";
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: point };
            });
            return state;
          case "campaigns":
            const discount_cam =
              Math.floor(state.total / discountToAdd.base_spend) *
              discountToAdd.amount;
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: discount_cam };
            });
            settotal_discount((previse) => {
              return previse + discount_cam;
            });
            state.total -= discount_cam;
            state.appliedDiscounts.seasonal = "campaigns";
            return state;
          default:
            return state;
        }
      case "remove_discount":
        const discountToRemove = discounts.find(
          (d) => d.type === action.discountType
        );
        switch (action.discountType) {
          case "fix":
            settotal_discount((previse) => {
              return previse - discountToRemove.amount;
            });
            settotal_discount(0);
            state.total += total_discount;
            state.appliedDiscounts.cupon = null;
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: 0 };
            });
            return state;
          case "percent":
            settotal_discount(0);
            state.total += each_dis[action.discountType];
            state.appliedDiscounts.cupon = null;
            return state;
          case "percent_category":
            let cloth_price = 0;
            props.data.forEach((item) => {
              if (item.category === "cloth") {
                cloth_price += item.totalprice;
              }
            });
            const dis_percent_category =
              cloth_price * (discountToRemove.percent / 100);
            settotal_discount((previse) => {
              return previse - dis_percent_category;
            });
            state.total += dis_percent_category;

            state.appliedDiscounts.ontop = null;
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: 0 };
            });
            return state;
          case "point":
            state.total += point;
            settotal_discount((previse) => {
              return previse - point;
            });
            state.appliedDiscounts.ontop = null;
            return state;
          case "campaigns":
            const discount_cam = each_dis.campaigns;
            settotal_discount((previse) => {
              return previse - discount_cam;
            });
            state.total += discount_cam;
            state.appliedDiscounts.seasonal = null;
            seteach_dis((previse) => {
              return { ...previse, [action.discountType]: 0 };
            });
            return state;
          default:
            return state;
        }
      case "reset":
        state = initialState;
        return state;

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isdis, setisdis] = useState({
    fix: true,
    percent: true,
    percent_category: false,
    point: false,
    campaigns: false,
  });

  const isDisabled = (discount, isChecked) => {
    const category = discount.category;
    const type = discount.type;
    if (discount.category === "cupon") {
      const other_dis = discounts.find(
        (d) => d.category === category && d.type !== type
      );
      const other_cate = {};
      discounts.forEach((d) => {
        if (d.category !== category && d.category !== "seasonal") {
          other_cate[d.type] = d.type;
        }
      });
      const other_type = other_dis.type;
      if (isChecked) {
        return setisdis((previse) => {
          return {
            ...previse,
            [type]: true,
            [other_type]: false,
            [other_cate.point]: true,
            [other_cate.percent_category]: true,
          };
        });
      } else {
        return setisdis((previse) => {
          return {
            ...previse,
            [type]: true,
            [other_type]: true,
            [other_cate.point]: false,
            [other_cate.percent_category]: false,
          };
        });
      }
    } else if (category === "ontop") {
      const other_dis = discounts.find(
        (d) => d.category === category && d.type !== type
      );
      const other_type = other_dis.type;
      const other_cate = discounts.find(
        (d) => d.category !== category && d.category !== "cupon"
      );
      if (isChecked) {
        if (state.total > other_cate.base_spend) {
          return setisdis((previse) => {
            return {
              ...previse,
              [type]: true,
              [other_type]: false,
              [other_cate.type]: true,
            };
          });
        } else {
          return setisdis((previse) => {
            return { ...previse, [type]: true, [other_type]: false };
          });
        }
      } else {
        return setisdis((previse) => {
          return {
            ...previse,
            [type]: true,
            [other_type]: true,
            [other_cate.type]: false,
          };
        });
      }
    } else if (category === "seasonal") {
      if (isChecked) {
        if (state.total > 300) {
          return setisdis((previse) => {
            return { ...previse, [type]: true };
          });
        } else
          return setisdis((previse) => {
            return { ...previse };
          });
      }
    } else {
      return setisdis((previse) => {
        return { ...previse, [type]: true };
      });
    }
  };
  const handleCheckboxChange = (discount, isChecked) => {
    const discountType = discount.type;
    if (isChecked) {
      dispatch({ type: "apply_discount", discountType });
    } else {
      dispatch({ type: "remove_discount", discountType });
    }
    isDisabled(discount, isChecked);
  };

  const confirm = () => {
    props.confirm(state.total, total_discount);
    props.onClose();
  };
  const reset = () => {
    setpoint(0);
    settotal_discount(0);
    setisdis({
      fix: true,
      percent: true,
      percent_category: false,
      point: false,
      campaigns: false,
    });
    dispatch({ type: "reset" });

    props.onClose();
  };
  useState(() => {
    window.addEventListener("beforeunload", localStorage.clear());
    return () => {
      window.removeEventListener("beforeunload", localStorage.clear());
    };
  }, []);

  if (!props.show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={reset}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={reset}>
          ×
        </button>
        <div className="row mt-4 mx-2">
          {discounts.map((discount) => (
            <div
              className="input-group-text py-3  mt-2 d-flex justify-content-between"
              key={discount.type}
            >
              <div className="d-flex gap-2  align-items-center">
                <input
                  onChange={(e) =>
                    handleCheckboxChange(discount, e.target.checked)
                  }
                  // checked={discount.category ==='cupon' ?undefined:isdis[discount.type]}
                  className="form-check-input"
                  type="checkbox"
                  // checked={state.appliedDiscounts[discount.category]=== discount.type}
                  disabled={!isdis[discount.type]}
                  style={{
                    border: isdis[discount.type] ? "solid 1.5px blue" : "none",
                  }}
                  aria-label={`Checkbox for ${discount.type}`}
                />
                <div className="d-flex flex-column justify-content-start">
                <p
                  className="text-start"
                  style={{
                    fontSize: "1rem",
                    color: isdis[discount.type] ? "black" : "grey",
                  }}
                >
                  {discount.type}
                </p>
                <p style={{fontSize:'0.7rem' ,color: isdis[discount.type] ? "black" : "grey"}}>{`(${discount.description} )`}</p>
                </div>
              </div>
              {discount.type === "point" ? (
                <input
                  className=""
                  disabled={!isdis[discount.type]}
                  style={{ width: 70, textAlign: "center" }}
                  onChange={(e) => {
                    setpoint(() => {
                      if (e.target.value > state.total * 0.2) {
                        return state.total * 0.2;
                      } else {
                        return e.target.value;
                      }
                    });
                  }}
                  type="number"
                  value={point > state.total * 0.2 ? state.total * 0.2 : point}
                  max={state.total * 0.2}
                ></input>
              ) : (
                <p style={{color: isdis[discount.type] ? "black" : "grey",}}>{each_dis[discount.type]} bath</p>
              )}
            </div>
          ))}
          <div className="mt-3 d-flex justify-content-between">
            <h5>Total Discount : {total_discount}</h5>
            <button
              onClick={confirm}
              style={{ width: "fit-content" }}
              className="btn btn-success"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountPop;
