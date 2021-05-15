import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

export const ViewStatement = () => {
  const [statements, setStatements] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [acno, setAcno] = useState("");
  const [acc, setAcc] = useState([]);

  // const getStatement = async () => {
  //   const res = await axios.get("http://localhost:5000/statement");
  //   // console.log("data recv from db", res.data);
  //   setStatements(res.data);
  //   // console.log("stmt:", statements);
  //   document.getElementById('transRes').style.display='block';
  // };
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    const res = await axios.get("http://localhost:5000/accounts");
    console.log("Results:");
    console.log(res.data);
    setAcno(res.data[0].account_number);
    setAcc(res.data);
    let data = {};
    console.log("posting:", data);
  };
  const handleClick = () => {
    let data = {
      from: fromDate,
      to: toDate,
      acc: acno,
    };
    // console.log("posting:", data);
    axios
      .post("http://localhost:5000/statement", {
        data: data,
      })
      .then((res) => {
        // const res = axios.get("http://localhost:5000/statement");
        console.log("Transactions get:", res.data);
        setStatements(res.data);
        // console.log("stmt:", statements);
        document.getElementById("transRes").style.display = "block";
      })

      .catch((err) => {
        console.log(err);
      });
    // // console.log("Dates posted to /statment");
    // getStatement();
  };

  return (
    <div>
      <div className="trans-input">
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

        <input
          type="text"
          placeholder="From Date"
          name="from-date"
          id="from-date"
          onFocus={(e) => (e.target.type = "date")}
          onChange={(e) => {
            setFromDate(e.target.value);
          }}
          value={fromDate}
        />
        <input
          type="text"
          name="to-date"
          placeholder="To Date"
          id="to-date"
          value={toDate}
          onFocus={(e) => (e.target.type = "date")}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
        />
        <button onClick={handleClick}>Go</button>
      </div>
      <div
        id="transRes"
        className="statement-result"
        style={{ display: "none" }}
      >
        <table>
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((stmt, i) => (
              <tr key={i}>
                <td>{stmt.transaction_id}</td>
                <td>{stmt.date.slice(0, 10)}</td>
                <td>{stmt.time}</td>
                <td>₹{stmt.amount}</td>
                <td>{stmt.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
