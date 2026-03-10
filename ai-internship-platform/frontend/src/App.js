import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Internships from "./pages/Internships";
import ResumeUpload from "./pages/ResumeUpload";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";

function App(){

return(

<Router>

<div style={{textAlign:"center"}}>

<h1>AI Internship Platform</h1>

<nav style={{marginBottom:"20px"}}>

<Link to="/">Login</Link> | {" "}

<Link to="/register">Register</Link> | {" "}

<Link to="/internships">Internships</Link> | {" "}

<Link to="/upload">Upload Resume</Link> | {" "}

<Link to="/recommend">AI Recommend</Link> | {" "}

<Link to="/profile">Profile</Link>

</nav>

<Routes>

<Route path="/" element={<Login/>} />

<Route path="/register" element={<Register/>} />

<Route path="/internships" element={<Internships/>} />

<Route path="/upload" element={<ResumeUpload/>} />

<Route path="/recommend" element={<Recommendations/>} />

<Route path="/profile" element={<Profile/>} />

</Routes>

</div>

</Router>

)

}

export default App