import React from 'react';
import { useLocation } from 'react-router-dom';

const Booking = props => {
  const { user } = props;
  const location = useLocation();
  const { booking } = location.state;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const firstDay = booking.minDate.toLocaleDateString('en-US', options);
  const lastDay = booking.maxDate.toLocaleDateString('en-US', options);
  const { numOfDays, rentalRate, rental, deposit, total } = booking;

  return (
    <div className='container'>
      <h2>{user.first_name}, review your booking:</h2>
      <div>First Day: {firstDay}</div>
      <div>Last Day: {lastDay}</div>
      <div>Number of Days: {numOfDays}</div>
      <div>Rental Rate: ${rentalRate}</div>
      <div>Rental Cost: ${rental}</div>
      <div>Security Deposit: ${deposit}</div>
      <div>Total: ${total}</div>
    </div>
  );
};

export default Booking;
