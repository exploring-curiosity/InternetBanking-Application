import React, { useState } from "react";
import axios from "axios";

const Amount = (props) => {
  const [ammount, setAmmount] = useState(0);
  const [vld, setVld] = useState(-1);

  //   const getStatement = async () => {
  //     const res = await axios.get("http://localhost:5000/checkBalance");
  //     console.log("Results:");
  //     console.log(res.data[0].balance);

  //     if (res.data[0].balance > ammount) {
  //       let data = {
  //         acc1: props.ac1,
  //         acc2: props.ac2,
  //         amm: ammount,
  //       };
  //       axios
  //         .post("http://localhost:5000/TransferMoney", {
  //           data: data,
  //         })

  //         .then(() => {
  //           const res = axios.get("http://localhost:5000/TransferMoney");
  //           console.log("Results:");
  //           console.log(res);
  //           res.data.affectedRows ? setVld(1) : setVld(0);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       //   getStatement1();
  //     } else {
  //       setVld(0);
  //     }
  //   };

  //   const getStatement1 = async () => {
  //     const res = await axios.get("http://localhost:5000/TransferMoney");
  //     console.log("Results:");
  //     console.log(res);
  //     res.data.affectedRows ? setVld(1) : setVld(0);
  //   };

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      acc1: props.ac1,
      acc2: props.ac2,
      amm: ammount,
    };
    console.log("posting:", data);

    axios
      .post("http://localhost:5000/checkBalance", {
        data: data,
      })

      .then((res) => {
        // const res = axios.get("http://localhost:5000/checkBalance");
        console.log("Results:");
        console.log(res.data[0].balance);

        if (res.data[0].balance > ammount) {
          let data = {
            acc1: props.ac1,
            acc2: props.ac2,
            amm: ammount,
          };
          axios
            .post("http://localhost:5000/TransferMoney", {
              data: data,
            })

            .then((res) => {
              //   const res = axios.get("http://localhost:5000/TransferMoney");
              console.log("Results:");
              console.log(res);
              res.data.affectedRows ? setVld(1) : setVld(0);
            })
            .catch((err) => {
              console.log(err);
            });
          // getStatement1();
        } else {
          setVld(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Dates posted to /checkBalance");
    // getStatement();
  };
  return (
    <div className="amnt">
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={ammount}
          onChange={(e) => setAmmount(e.target.value)}
          required
        />
        <input type="submit" value="Transfer!" />
      </form>
      {vld ? (
        vld + 1 ? (
          <p style={{ color: "green" }}>Transfer Success</p>
        ) : (
          <br />
        )
      ) : (
        <p style={{ color: "red" }}>!No sufficient balance</p>
      )}
    </div>
  );
};

export default Amount;
