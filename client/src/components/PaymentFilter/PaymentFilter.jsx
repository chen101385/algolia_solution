import React from "react";
import PropTypes from "prop-types";
import visa from "./images/visa.png";
import amex from "./images/amex.png";
import masterCard from "./images/mastercard.png";
import discover from "./images/discover.png";

const PaymentFilter = ({ paymentFilter, resetFilter }) => (
  <ul>
    <li>
      <img src={visa} onClick={() => paymentFilter("Visa")} alt="visa" />
    </li>
    <li>
      <img src={amex} onClick={() => paymentFilter("AMEX")} alt="amex" />
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
      <i>reset filters</i>
    </a>
  </ul>
);

PaymentFilter.propTypes = {
  paymentFilter: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired
};

export default PaymentFilter;
