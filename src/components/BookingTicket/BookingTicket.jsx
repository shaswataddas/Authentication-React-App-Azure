import React,{useState} from 'react'
import { IoMdTrain } from "react-icons/io";
import { Dropdown } from 'primereact/dropdown';
import './BookingTicket.css';

function BookingTicket() {
    const[fromStation,setFromStation] = useState('');
    const[toStation,setToStation] = useState('');
    const[date,setDate] = useState('');
    const cities = [
        { name: 'Station A', code: 'NY' },
        { name: 'Station B', code: 'RM' },
        { name: 'Station C', code: 'LDN' },
        { name: 'Station D', code: 'IST' },
        { name: 'Station E', code: 'IST' },
        { name: 'Station F', code: 'IST' },
        { name: 'Station G', code: 'IST' },
        { name: 'Station H', code: 'IST' },
        { name: 'Station I', code: 'IST' },
        { name: 'Station J', code: 'PRS' }
    ];




    return (
    <div className='wrapper-register'>
            <form action="">
                <h1>Booking Ticket</h1>
                <p className="from-to-station-tag">From Station</p>
                <div className="drop-box">
                    <Dropdown value={fromStation} onChange={(e) => setFromStation(e.value)} options={cities} optionLabel="name" 
                        placeholder="From Station" />
                    <IoMdTrain className='icon'/>
                </div>
                <p className="from-to-station-tag" style={{marginTop: '20px'}}>To Station</p>
                <div className="drop-box">
                    <Dropdown value={toStation} onChange={(e) => setToStation(e.value)} options={cities} optionLabel="name" 
                        placeholder="To Station" />
                    <IoMdTrain className='icon'/>
                </div>
                <div className="input-box">
                    <p style={{marginLeft: '15px', marginBottom: '10px'}}>Date of Journey</p>
                    <input 
                        type="date" 
                        placeholder='Date' 
                        required 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Find Trains</button>
            </form>
        </div>
  )
}

export default BookingTicket
