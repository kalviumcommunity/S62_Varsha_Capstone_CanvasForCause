import React from "react"

import {Routes, Route, Router, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUsPage";
import LandingPage from "./pages/LandingPage";

function App() {
  
  return(
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/about-us" element={<AboutUsPage/>}/>
      </Routes>
  )
}

export default App