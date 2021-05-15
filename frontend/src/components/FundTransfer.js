import React, { useState, useEffect } from "react";
import axios from "axios";
import Amount from "./Amount";
import uuid from "react-uuid";

const FundTransfer = () => {
  const [ac1, setAc1] = useState("");
  const [ac2, setAc2] = useState("");
  const [valid, setvalid] = useState(0);
  const [acc, setAcc] = useState([]);
  // const getStatement = async () => {
  //     const res = await axios.get("http://localhost:5000/validateAcc");
  //     console.log("Results:");
  //     console.log(res.data.length);
  //     if(res.data.length===2)
  //     {
  //         setvalid(1);
  //     }
  //     else
  //         setvalid(0);
  // };

  const SubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      acc1: ac1,
      acc2: ac2,
    };
    console.log("posting:", data);
    axios
      .post("http://localhost:5000/validateAcc", {
        data: data,
      })

      .then((res) => {
        // const res = axios.get("http://localhost:5000/validateAcc");
        console.log("Results:");
        console.log(res.data.length);
        if (res.data.length === 2) {
          setvalid(1);
        } else setvalid(0);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Dates posted to /validateAcc");
    // getStatement();
  };
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    const res = await axios.get("http://localhost:5000/accounts");
    console.log("Results:");
    console.log(res.data);
    setAc1(res.data[0].account_number);
    setAcc(res.data);

    console.log("posted");
  };
  return (
    <div className="fndtrns">
      <form onSubmit={SubmitHandler}>
        <select
          name="accounts"
          id="acc"
          onChange={(e) => setAc1(e.target.value)}
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
          type="text"
          id="toacc"
          autoComplete="off"
          name="toacc"
          placeholder="Receiver account number"
          value={ac2}
          onChange={(e) => setAc2(e.target.value)}
          required
        />
        <br />

        {valid ? <br /> : <input type="submit" value="proceed" />}
      </form>
      {valid ? <Amount ac1={ac1} ac2={ac2} /> : <br />}
    </div>
  );
};

export default FundTransfer;
