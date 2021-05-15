import React from "react";

export const ViewDeposit = ({ deposits }) => {
  return (
    <div className="view-deposit-result">
      <table>
        <thead>
          <tr>
            <th>Deposit Number</th>
            <th>Scheme</th>
            <th>Open Date</th>
            <th>Deposit Amount</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
            <th>Interest Rate</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {deposits.length && deposits.map((deposit, i) => (
            <tr key={i}>
              <td>{deposit.deposit_number}</td>
              <td>{deposit.scheme}</td>
              <td>{deposit.open_date.slice(0, 10)}</td>
              <td>₹{deposit.deposit_amount}</td>
              <td>{deposit.maturity_date.slice(0, 10)}</td>
              <td>₹{deposit.maturity_amount}</td>
              <td>{deposit.interest_rate}</td>
              <td>₹{deposit.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
