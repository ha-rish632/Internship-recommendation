import React,{useState} from "react"
import axios from "axios"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const registerUser = async ()=>{

const res = await axios.post("http://127.0.0.1:5000/register",{
    name:name,
    email:email,
    password:password
})

alert(res.data.message)

}

return(

<div style={{textAlign:"center",marginTop:"100px"}}>

<h2>Student Register</h2>

<input placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input type="password" placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={registerUser}>Register</button>

</div>

)

}

export default Register