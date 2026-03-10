import React, { useState } from "react";
import axios from "axios";

function ResumeUpload(){

const [file,setFile] = useState(null)

const uploadResume = async () => {

const formData = new FormData()

formData.append("resume",file)

const res = await axios.post(
"http://127.0.0.1:5000/upload-resume",
formData
)

alert(res.data.message)

}

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h2>Upload Resume</h2>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
/>

<br/><br/>

<button onClick={uploadResume}>
Upload Resume
</button>

</div>

)

}

export default ResumeUpload