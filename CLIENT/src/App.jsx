import React from "react"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  )
}

export default App