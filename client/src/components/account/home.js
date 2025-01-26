import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const gotoLogin=()=>{
        navigate('/login');
  }
  return (
    <div><button onClick={gotoLogin}>Go to login</button></div>
  )
}

export default Home;
