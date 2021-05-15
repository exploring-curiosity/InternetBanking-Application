import { useEffect, useState } from "react"
import ChangePIN from "./ChangePIN";

 

const Getotp = () => {
    const [otp,setOTP]=useState('');
    const [valid,setValid]=useState(0);
    const [v,setV]=useState('');
    const submitHandler=(e) =>{
        e.preventDefault();
        setOTP('');
        if(otp==='1234')
        setValid(1);
        else
        setV('Invalid OTP');
    }
    useEffect(()=>{
        var obj = document.getElementById('partitioned');
        obj.addEventListener('keydown', stopCarret); 
        obj.addEventListener('keyup', stopCarret); 

        function stopCarret() {
            if (obj.value.length > 3){
                setCaretPosition(obj, 3);
            }
        }

        function setCaretPosition(elem, caretPos) {
            if(elem != null) {
                if(elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                }
                else {
                    if(elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    }
                    else
                        elem.focus();
                }
            }
        }
    },[]);
    return (
        valid?<ChangePIN />:
        <div className='otpform'>
            <form name="OTP" onSubmit={submitHandler}>
                <input type='text' id='partitioned' autoComplete='off' maxLength='4' name='otp' value={otp} onChange={(e)=>setOTP(e.target.value)} /> <br />
                <input type='submit' value='Proceed' />
            </form>
            <p>{v}</p>
        </div>
    )
}

export default Getotp