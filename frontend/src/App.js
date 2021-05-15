import { useState } from 'react';
import { Route, Switch } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ChatBot from './Components/ChatBot';
import { Deposit } from './Components/Deposit';
import FundTransfer from './Components/FundTransfer';
import Getotp from './Components/Getotp';
import { Home } from './Components/Home';
import Insurance from './Components/Insurance';
import Login from './Components/Login';
import ViewBalance from './Components/ViewBalance';
import { ViewStatement } from './Components/ViewStatement';
import chat from './img/chat.png';
import home from './img/home.png';
import log from './img/logout.png';
import axios from 'axios';


function App() {
  const [auth,setAuth]=useState(0);
  function handleChange(newValue) {
    setAuth(newValue);
  }
  const removeDetails =async() =>{
    const res = await axios.get("http://localhost:5000/logout");
    console.log("loggedOut",res);
    setAuth(0);
  }
  if(!auth){
    return(
        <Login auth={auth} onChange={handleChange} />
    );
  }
  else
  return (
    <div className="App">
      <nav>
      <NavLink activeClassName='active' className='left-most' to='/ChangePIN'>Change PIN</NavLink> 
      <NavLink activeClassName='active' to='/FundsTransfer'>Transfer Funds</NavLink>
      <NavLink activeClassName='active' to='/Balance'>Balance</NavLink>
      <NavLink activeClassName='active' to='/Insurance'>Insurance</NavLink>
      <NavLink activeClassName='active' to='/Transactions'>Transactions</NavLink>
      <NavLink activeClassName='active' className='right-most' to='/Deposits'>Deposit</NavLink>
      </nav>
      <Link to='/Chatbot'><img id='chatbot' src={chat} alt='Chatbot' /></Link>
      <Link to='/Home'><img id='home' src={home} alt='Home' /></Link>
      <img id='logout' src={log} alt='Home' onClick={removeDetails} />
      <Switch>
        <Route path="/ChangePIN">
          <Getotp />
        </Route>
        <Route path="/Chatbot">
          <ChatBot />
        </Route>
        <Route path="/FundsTransfer">
          <FundTransfer />
        </Route>
        <Route path="/Balance">
          <ViewBalance />
        </Route>
        <Route path="/Insurance">
          <Insurance />
        </Route>
        <Route path="/Transactions">
          <ViewStatement />
        </Route>
        <Route path="/Deposits">
          <Deposit />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
