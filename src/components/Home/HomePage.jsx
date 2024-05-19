import React from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
      // Navigate to the new page
      navigate('/login');
  };

  return (
    <div>
        <div className='wrapper-register'>
            <button onClick={handleLogin}>Login</button>
            <button>Check Seat Availability</button>
            <button>View profile</button>
            <button>View Previous Bookings</button>
            <button>Cancel Ticket</button>
        </div>
    </div>
  )
}

export default HomePage
