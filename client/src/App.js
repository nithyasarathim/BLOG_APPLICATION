import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/account/login'; 
import Home from './components/account/home';
import SignUp from './components/account/signup';
import Feeds from './components/feedpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
