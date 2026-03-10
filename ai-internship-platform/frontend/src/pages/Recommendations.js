import React, { useState } from "react";
import axios from "axios";

function Recommendations(){

const [skills,setSkills] = useState("")
const [results,setResults] = useState([])

const getRecommendations = async () => {

const skillArray = skills.split(",")

const res = await axios.post(
"http://127.0.0.1:5000/recommend",
{
skills:skillArray
}
)

setResults(res.data)

}

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h2>AI Internship Recommendation</h2>

<input
placeholder="Enter skills (example: Python,React)"
onChange={(e)=>setSkills(e.target.value)}
style={{width:"300px"}}
/>

<br/><br/>

<button onClick={getRecommendations}>
Get Recommendations
</button>

<br/><br/>

{results.map((item)=>(
<div key={item._id} style={{
border:"1px solid gray",
margin:"10px",
padding:"10px"
}}>

<h3>{item.title}</h3>

<p>Company: {item.company}</p>

<p>Location: {item.location}</p>

<p>Match Score: {item.match_score}</p>

</div>
))}

</div>

)

}

export default Recommendations