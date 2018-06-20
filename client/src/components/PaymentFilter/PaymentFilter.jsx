import React from "react";
import visa from "./images/visa.png";
import amex from "./images/amex.png";
import masterCard from "./images/mastercard.png";
import discover from "./images/discover.png";

const PaymentFilter = ({ paymentFilter, resetFilter }) => (
  <div className="ratings">
    <ul className="payment">
      <li>
        <img 
          src={visa} 
          onClick={() => paymentFilter("Visa")} 
          alt="visa" />
      </li>
      <li>
        <img 
          src={amex} 
          onClick={() => paymentFilter("AMEX")} 
          alt="amex" />
      </li>
      <li>
        <img
          src={masterCard}
          onClick={() => paymentFilter("MasterCard")}
          alt="mastercard"
        />
      </li>
      <li>
        <img
          src={discover}
          onClick={() => paymentFilter("Discover")}
          alt="discover"
        />
      </li>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          resetFilter();
        }}
        alt="reset"
        style={{ cursor: "pointer" }}
      >
        reset filter
      </a>
    </ul>
  </div>
);

export default PaymentFilter;
