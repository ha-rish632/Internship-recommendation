import React, { useState } from "react";
import axios from "axios";

function Profile(){

const [email,setEmail] = useState("")
const [profile,setProfile] = useState(null)

const getProfile = async () => {

const res = await axios.get(
"http://127.0.0.1:5000/profile/"+email
)

setProfile(res.data)

}

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h2>Student Profile</h2>

<input
placeholder="Enter your email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<button onClick={getProfile}>
Load Profile
</button>

<br/><br/>

{profile && (

<div style={{
border:"1px solid gray",
padding:"10px",
width:"300px",
margin:"auto"
}}>

<p><b>Name:</b> {profile.name}</p>

<p><b>Email:</b> {profile.email}</p>

</div>

)}

</div>

)

}

export default Profile