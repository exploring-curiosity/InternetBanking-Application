import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

const ChangePIN = () => {
  const [npin, setNpin] = useState();
  const [cpin, setCpin] = useState();
  const [acno, setAcno] = useState("");
  const [v, setV] = useState("");
  const [acc, setAcc] = useState([]);

  // const getStatement = async () => {
  //     const res = await axios.get("http://localhost:5000/ChangePIN");
  //     console.log("Results:");
  //     console.log(res.data);
  //   };
  useEffect(() => {
    getDetails();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    if (cpin === npin) {
      setV("Success");
      let data = {
        npin: npin,
        cpin: cpin,
        acc: acno,
      };
      console.log("posting:", data);
      axios
        .post("http://localhost:5000/ChangePIN", {
          data: data,
        })

        .then((res) => {
          //   const res = axios.get("http://localhost:5000/ChangePIN");
          console.log("Results:");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Dates posted to /ChangePIN");
      //   getStatement();
    } else setV("Fail");
  };
  const getDetails = async () => {
    const res = await axios.get("http://localhost:5000/accounts");
    console.log("Results:");
    console.log(res.data);
    setAcno(res.data[0].account_number);
    setAcc(res.data);
    let data = {};
    console.log("posting:", data);
  };

  return (
    <div className="chngpin">
      <form name="OTP" onSubmit={submitHandler}>
        <select
          name="accounts"
          id="acc"
          onChange={(e) => setAcno(e.target.value)}
        >
          <option value="" disabled defaultValue>
            -- select account --
          </option>
          {acc.map((acn) => {
            return (
              <option key={uuid()} value={acn.account_number}>
                {acn.account_number}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="password"
          autoComplete="off"
          placeholder="New PIN"
          id="npin"
          name="npin"
          value={npin}
          onChange={(e) => setNpin(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          autoComplete="off"
          placeholder="Confirm PIN"
          id="cpin"
          name="cpin"
          value={cpin}
          onChange={(e) => setCpin(e.target.value)}
        />{" "}
        <br />
        <input type="submit" value="Proceed" />
      </form>
      <p>{v}</p>
    </div>
  );
};

export default ChangePIN;
