import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

export const ViewBalance = () => {
  const [balance, setBalance] = useState([]);
  const [acno, setAcno] = useState("");
  const [acc, setAcc] = useState([]);

  // const getBalance = async () => {
  //   const res = await axios.get("http://localhost:5000/balance");
  //   console.log(res.data);
  //   setBalance(res.data);
  //   document.getElementById("balRes").style.display = "block";
  // };

  const handleClick = () => {
    let data = {
      acc: acno,
    };
    console.log("posting:", data);
    axios
      .post("http://localhost:5000/balance", {
        data: data,
      })
      .then((res) => {
        // const res = axios.get("http://localhost:5000/balance");
        console.log("View balance:", res.data);
        setBalance(res.data);
        document.getElementById("balRes").style.display = "block";
      });

    console.log("Dates posted to /statment");
    // getBalance();
  };
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    const res = await axios.get("http://localhost:5000/accounts");
    console.log("Results:");
    console.log(res.data);
    // setAcno(res.data[0].account_number);
    setAcc(res.data);
    let data = {};
    console.log("posting:", data);
  };
  return (
    <div className="main-data">
      <div className="data-form">
        <label htmlFor="account-no">Account Number :</label>
        <br />
        <br />
        <select
          name="accounts"
          id="acc"
          onChange={(e) => setAcno(e.target.value)}
          value={acno}
        >
          <option value="default">-- select account --</option>
          {acc.map((acn) => {
            return (
              <option key={uuid()} value={acn.account_number}>
                {acn.account_number}
              </option>
            );
          })}
        </select>
        <br />

        <button onClick={handleClick}>Go</button>
      </div>
      <br />
      <div id="balRes" className="data-result" style={{ display: "none" }}>
        {balance.map((option) => (
          <form key={uuid()}>
            <label key={uuid()} htmlFor="acc-holder">
              Account Holder :
            </label>
            <input
              key={uuid()}
              type="text"
              name="acc-holder"
              id="acc-holder"
              value={option.account_holder_name}
              readOnly={true}
            />
            <br />
            <br />
            <label key={uuid()} htmlFor="acc_no">
              Account Number :
            </label>
            <input
              key={uuid()}
              type="text"
              name="acc-no"
              id="acc-no"
              value={option.account_number}
              readOnly={true}
            />
            <br />
            <br />
            <label key={uuid()} htmlFor="acc_type">
              Account Type :
            </label>
            <input
              key={uuid()}
              type="text"
              name="acc-type"
              id="acc-type"
              value={option.account_type}
              readOnly={true}
            />
            <br />
            <br />
            <label key={uuid()} htmlFor="balance">
              Balance :
            </label>
            <input
              key={uuid()}
              type="text"
              name="balance"
              id="balance"
              value={option.balance}
              readOnly={true}
            />
            <br />
            <br />
          </form>
        ))}
      </div>
    </div>
  );
};

export default ViewBalance;
