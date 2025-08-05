import React from "react"
import { Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/about-us" element={<AboutUsPage/>}/>
      </Routes>
    </Router>
  )
}

export default App