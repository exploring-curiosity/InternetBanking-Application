import React from 'react';
import axios from 'axios';

const Logout = (props) => {
    const removeDetails =async() =>{
        const res = await axios.get("http://localhost:5000/logout");
        console.log("loggedOut",res);
        props.onChange(0);
    }
    removeDetails();
    
    return ( <div>
    </div> );
}
 
export default Logout;