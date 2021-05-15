import React,{useState} from 'react';

const ChatBot = () => {
    const [qns]=useState([
        {id:1,ques:'Change PIN',ans:'Changes your ATM card PIN.Requests an OTP and once entered correct it will redirect you to change PIN.\nEnter new PIN and Confirm it.\n Access: Home->Change PIN\n  '},
        {id:2,ques:'Funds Transfer',ans:'Transfer Amount to another person.Requires the receivers account number and the amount to be transfered. Enter the password to confirm transfer.Access: Home->Funds Transfer'},
        {id:3,ques:'View Balance',ans:'Checks the Balance available in your account.Takes in account number. displays the balance left. Access: Home->View Balance'},
        {id:4,ques:'Account Statement',ans:'Displays the list of previous transactions.Takes in Account Number. Access: Home->Account Statement'},
        {id:5,ques:'Manage Deposits',ans:'Displays your plan for deposit(fixed deposits etc). Takes in Account Number.You can also Create one here. Access: Home->Manage Deposits'},
        {id:6,ques:'Insurance Policy',ans:'Displays your plan for Insurance. Takes in Account Number.You can also Create one here. Access: Home->Insurance Policy'}
    ]);
    const [ans,setAns]=useState('');
    const answer=(val) => {
        console.log(qns);
        setAns(val);
    }
    return (  
        <div className='chatbox'>
            <p>Hello I am ChatBot. How may I be of Service to you</p>
            <ul>
                {qns.map(qn => {
                    return (<li key={qn.id} onClick={()=>answer(qn.ans)}><span>{qn.ques}</span></li>)
                })}
            </ul>
            <div id='answer'>
            <p>{ans}</p><br />
            </div>
        </div>
    );
}
 
export default ChatBot;