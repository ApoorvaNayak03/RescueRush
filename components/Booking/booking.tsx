import React from 'react'
import Autocomplete from './autocomplete'

function Booking() {
  const screenHeight = window.innerHeight * 0.72;

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Location Details:</h2>
      <div className='border-[1px] p-3 rounded-md' style={{ height: screenHeight }}>
        <Autocomplete />
      
      </div>
    </div>
  );
}

export default Booking;
