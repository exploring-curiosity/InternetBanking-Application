import React, { useState } from "react";
import axios from "axios";
import { ViewDeposit } from "./ViewDeposit";
import { DepositCalculator } from "./DepositCalculator";
import { OpenDeposit } from "./OpenDeposit";

export const Deposit = () => {
  const [deposits, setDeposits] = useState([]);
  const [showOpen, setShowOpen] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const getDepositDetails = async () => {
    const res = await axios.get("http://localhost:5000/viewdeposits");
    // console.log("data recv from db", res.data);
    setDeposits(res.data);
    // console.log("stmt:", statements);
  };

  return (
    <div className='deposits-home'>
      <div className="deposit-buttons">
        <button className='left-most'
          onClick={() => {
            setShowView(!showView);
            setShowOpen(false);
            setShowCalculator(false);
            getDepositDetails();
          }}
        >
          View Deposits
        </button>
        <button
          onClick={() => {
            setShowView(false);
            setShowCalculator(false);
            setShowOpen(!showOpen);
          }}
        >
          Open Deposits
        </button>
        <button className='right-most' 
          onClick={() => {
            setShowView(false);
            setShowOpen(false);
            setShowCalculator(!showCalculator);
          }}
        >
          Deposit Calculator
        </button>
      </div>
      <div className="results">
        {showView && <ViewDeposit deposits={deposits} />}
        {showOpen && <OpenDeposit />}
        {showCalculator && <DepositCalculator />}
      </div>
    </div>
  );
};
