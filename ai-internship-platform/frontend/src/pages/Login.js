import React, { useState } from "react";
import axios from "axios";

function Login() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async () => {

    const res = await axios.post("http://127.0.0.1:5000/login",{
        email:email,
        password:password
    })

    alert(res.data.message)
}

return(

<div style={{textAlign:"center",marginTop:"100px"}}>

<h2>Student Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>Login</button>

</div>

)

}

export default Login