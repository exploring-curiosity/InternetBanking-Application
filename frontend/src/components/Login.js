import React, { useState } from "react";
import axios from "axios";
let list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const pwarr = list.sort(() => Math.random() - 0.5);
const Login = (props) => {
  const [userId, setUserID] = useState("");
  const [pw, setPw] = useState("");

  // const getStatement = async () => {
  //     const res = await axios.get("http://localhost:5000/login");
  //     console.log("Results:");
  //     console.log(res.data.length);
  //     if(res.data.length===1)
  //     {
  //         props.onChange(1);
  //     }
  // };

  const del = () => {
    var pass = pw;
    setPw(pass.substring(0, pass.length - 1));
  };
  const append = (e) => {
    setPw(pw + e.target.value);
  };
  const clear = () => {
    setPw("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      user: userId,
      pass: pw,
    };
    console.log("posting:", data);
    axios
      .post("http://localhost:5000/login", {
        data: data,
      })

      .then((res) => {
        //     const res = axios.get("http://localhost:5000/login");
        //     console.log("Results:");
        //     console.log(res.data.length);
        console.log(res);
        if (res.data.length === 1) {
          props.onChange(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Dates posted to /login");
    // getStatement();
  };
  return (
    <div className="central login">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          autoComplete="off"
          id="id"
          name="id"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          id="pass"
          name="pass"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          readOnly
        />
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="button"
                  id="b1"
                  value={pwarr[0]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b2"
                  value={pwarr[1]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b3"
                  value={pwarr[2]}
                  onClick={append}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="button"
                  id="b4"
                  value={pwarr[3]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b5"
                  value={pwarr[4]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b6"
                  value={pwarr[5]}
                  onClick={append}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="button"
                  id="b7"
                  value={pwarr[6]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b8"
                  value={pwarr[7]}
                  onClick={append}
                />
              </td>
              <td>
                <input
                  type="button"
                  id="b9"
                  value={pwarr[8]}
                  onClick={append}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input type="button" id="b10" value="AC" onClick={clear} />
              </td>
              <td>
                <input
                  type="button"
                  id="b0"
                  value={pwarr[9]}
                  onClick={append}
                />
              </td>
              <td>
                <input type="button" id="b11" value="DEL" onClick={del} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input className="subButton" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
