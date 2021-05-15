import React, { useState } from "react";

export const DepositCalculator = () => {
  const [calcDetails, setCalcDetails] = useState([{}]);

  const [showMaturityAmount, setShowMaturityAmount] = useState(false);

  const calculateReturns = (e) => {
    e.preventDefault();

    let interest_rate;
    switch (calcDetails.scheme) {
      case "RDP":
        interest_rate = 5.25;
        break;
      case "SDR":
        interest_rate = 5.4;
        break;
      default:
        console.log("Incorrect scheme chosen");
        break;
    }

    let amt = 0;
    let n = parseInt(calcDetails.tenure) / 12;
    let r = parseFloat(interest_rate) / 4;
    let p = parseFloat(calcDetails.amount);

    amt = p * Math.pow(1 + r / 100, 4 * n);
    setCalcDetails((prevState) => ({
      ...prevState,
      maturityAmount: parseFloat(amt.toFixed(2)),
    }));

    setShowMaturityAmount(true);

    // console.log(calcDetails);
  };

  return (
    <div>
      <h3>Calculate returns on your deposits to make the right choice!</h3>
      <form className="calculate-deposit-form">
        <select
          name="scheme"
          id="scheme"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              scheme: e.target.value,
            }));
          }}
          value={calcDetails.scheme}
        >
          <option value="default">--select scheme--</option>
          <option value="RDP">RDP</option>
          <option value="SDR">SDR</option>
          <option value="RDTAX">RDTAX</option>
        </select>
        <br />

        <input
          type="text"
          name="amount"
          id="amount"
          placeholder="Amount"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }));
          }}
          value={calcDetails.amount}
        />
        <br />

        <input
          type="text"
          placeholder="Tenure (months)"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              tenure: e.target.value,
            }));
          }}
          value={calcDetails.tenure}
        />
        <br />
        {showMaturityAmount && !isNaN(calcDetails.maturityAmount) && (
          <div className="maturity-res">
            <label htmlFor="maturity-amount">Maturity Amount</label>
            <p>₹{calcDetails.maturityAmount}</p>
          </div>
        )}
        <input type="submit" value="Submit" onClick={calculateReturns} />
      </form>
    </div>
  );
};
