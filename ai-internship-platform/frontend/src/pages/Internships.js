import React, { useEffect, useState } from "react";
import axios from "axios";

function Internships(){

const [internships,setInternships] = useState([])
const [email,setEmail] = useState("")

useEffect(()=>{
fetchInternships()
},[])

const fetchInternships = async () => {

const res = await axios.get("http://127.0.0.1:5000/internships")

setInternships(res.data)

}

const applyInternship = async (id) => {

const res = await axios.post(
"http://127.0.0.1:5000/apply",
{
email:email,
internship_id:id
}
)

alert(res.data.message)

}

return(

<div style={{textAlign:"center"}}>

<h2>Available Internships</h2>

<input
placeholder="Enter your email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

{internships.map((item)=>(

<div key={item._id} style={{
border:"1px solid gray",
margin:"10px",
padding:"10px"
}}>

<h3>{item.title}</h3>

<p>Company: {item.company}</p>

<p>Location: {item.location}</p>

<p>Skills: {item.skills.join(", ")}</p>

<button
onClick={()=>applyInternship(item._id)}
>
Apply
</button>

</div>

))}

</div>

)

}

export default Internships