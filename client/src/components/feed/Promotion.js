import React from 'react';
import bg from '../assets/div-bg.png';

const Promotion = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center bg-cover bg-center p-6 text-black text-center"
      style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover', }}
    >
      <div className="p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4 " >Never miss any stories !</h2>
        <p className="mb-4">Stay on the loop with our latest articles.</p>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="border p-2 rounded mb-4 w-full"
        />
        <button className="text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: 'rgb(65, 175, 253)', cursor: 'pointer', margin:'1vh', hover: 'bg-blue-700' }}>
          Subscribe
        </button>
        <p style={{fontWeight:"light", fontSize:"2vh"}}>Ignore if already subscribed !</p>
      </div>
    </div>
  );
};

export default Promotion;
