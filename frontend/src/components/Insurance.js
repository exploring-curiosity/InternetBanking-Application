import React, {useEffect, useState} from "react";
import axios from "axios";

export const Insurance = () => {
    const [insurance, setInsurance] =useState([]);
    //const [userName, setUserName] = useState("");
    const [index, setIndex] = useState(0);
    const length= insurance.length;
    
    const getInsurance = async() => {
        const res = await axios.get("http://localhost:5000/insurance");
        console.log(res.data);
        setInsurance(res.data);
    };

    useEffect(() => {
        getInsurance();
      }, []);
    
    const next = () =>
    {
        if(index<length)
            setIndex(index+1);
    };

    const pre = () =>
    {
        if(index>=0)
            setIndex(index-1);
    };
    
    if(length===0)
    {
        return(
            <div className="insurance-results">
                <p>! No Insurance Schemes opted</p>    
            </div> 
        );
    }
    else
    return(
        <div className="main-data">
            <div className="insurance-results">
                <form>
                    <label htmlFor="policy-no">User ID :  </label>
                    <input
                        type="text"
                        name="userId"
                        id="userId_insurance"
                        value={insurance[index]?.user_id || {}}
                        readOnly={true}
                    /><br />
                    <label htmlFor="policy-no">Policy Number :   </label>
                    <input
                        type="text"
                        name="policy-no"
                        id="policy-no"
                        value={insurance[index]?.policy_number || {}}
                        readOnly={true}
                    /><br />
                    <label htmlFor="date-issue">Date Of Issue :    </label>
                    <input
                        type="text"
                        name="date-issue"
                        id="date-issue"
                        value={insurance[index]?.date_of_issue || {}}
                        readOnly={true}
                    /><br />
                    <label htmlFor="monthly-due">Monthly Due :   </label>
                    <input
                        type="text"
                        name="monthly-due"
                        id="monthly-due"
                        value={insurance[index]?.monthly_due_day || {}}
                        readOnly={true}
                    /><br />
                    <label htmlFor="policy-type">Policy Type :   </label>
                    <input
                        type="text"
                        name="policy-type"
                        id="policy-type"
                        value={insurance[index]?.policy_type || {}}
                        readOnly={true}
                    /><br />
                    <label htmlFor="policy-term">Policy Term :    </label>
                    <input
                        type="text"
                        name="policy-term"
                        id="policy-term"
                        value={insurance[index]?.policy_term || {}}
                        readOnly={true}
                    /><br />
                </form>
                    
                
                <div className='navbuttons'>
                <button id='prev' disabled ={index===0} onClick={pre}>Previous</button>
                <button id='next' disabled={(index===length-1) || (length===0)} onClick={next}>Next</button>
                </div>
                </div>
                
            </div>
    );
};

export default Insurance;
