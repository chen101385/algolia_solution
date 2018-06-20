import React from "react";
import visa from "./images/visa.png";
import amex from "./images/amex.png";
import mastercard from "./images/mastercard.png";
import discover from "./images/discover.png";

const PaymentFilter = props => (
  <div className="ratings">
    <ul className="payment">
      <li>
        <img src={visa} alt="visa" />
      </li>
      <li>
        <img src={amex} alt="amex" />
      </li>
      <li>
        <img src={mastercard} alt="mastercard" />
      </li>
      <li>
        <img src={discover} alt="discover" />
      </li>
      <br />
      <a href={`/#`} alt="reset">
        reset filter
      </a>
    </ul>
  </div>
);

export default PaymentFilter;
