import React from "react";
import "./Discount_pop.css";

function Discount_Pop({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close  " onClick={onClose}>
          ×
        </button>
        <div class="row mt-4 ">
          <div class="input-group-text py-3 gap-2 ">
            <input
              class="form-check-input "
              type="checkbox"
              value=""
              aria-label="Radio button for following text input"
            ></input>
            <p>Fix amount</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount_Pop;
