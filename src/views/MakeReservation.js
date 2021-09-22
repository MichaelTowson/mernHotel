import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReservationStyle.css';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import backGround from '../components/images/reservation-page.jpg';
import {navigate} from '@reach/router';

function MakeReservation() {
    const [room_id, setRoom_Id] = useState('');
    const [date, setDate] = useState(new Date());
    const [adult_rsvps, setAdult_Rsvps] = useState(0);
    const [child_rsvps, setChild_Rsvps] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [roomsList, setRoomsList] = useState(null);
    const user_id = localStorage.getItem("userId");

    console.log("User ID: " + user_id);
    useEffect(() => {
        axios.get('http://localhost:8000/room/findAll')
            .then(response => { setRoomsList(response.data) })
            .catch(err => console.log(err));
    }, []);

    function calendarChange(date) {
        setDate(date);
    }


    function handleSubmit(event) {
        if(user_id){ 
            event.preventDefault();
            axios.post(
                'http://localhost:8000/reservation/create',
                { user_id, room_id, date, adult_rsvps, child_rsvps }
            ).then( () => {navigate('/reservation')})
            .catch(err => {
                const errorMessages = err.response.data.errors;
                const errorArray = [];
                for (const error in errorMessages) {
                    errorArray.push(errorMessages[error].message)
                }
                setValidationErrors(errorArray);
                console.log(err);
            })
        }
        else{
            event.preventDefault()
            alert('Please log in before proceeding.');
            localStorage.setItem('bookmark', '/makereservation'  )
            navigate('/register');
        }
    }

    const isRoomAvailable = room => {
        let index = room.dates_in_use.findIndex(inUse => inUse.startsWith(date.toISOString().substring(0, 10)));
        if (index === -1) return true;
        else return false;
    }

    if (roomsList == null) {
        return (
            <div>
                <p>(Loading Reservation Page)</p>
            </div>);
    }

    console.log("hereee", user_id)
    const availableRooms = roomsList.filter(isRoomAvailable)

        return (
            <>
                <NavBar/>
                <Hero back={backGround}
                    title="Make a Reservation"
                    desc="Choose your date and enjoy."
                    btnText="RETURN HOME"
                    btnTo="/rooms"
                />
    
                {/* Display a calendar and all available rooms by date. */}
                <div className="availableRooms">
                    <h2 className="title">Select a date to see available rooms:</h2>
                    <br></br>
                    <div className="calendarDisplay">
                        <Calendar className="calendarfont"
                            onChange={calendarChange}
                            value={date}
                        />
                    </div>
    
                    <div className="roomDisplay">
                        {availableRooms.map((room, index) =>
                            <div className="roomCard" key={index}>
                                <img src={room.featured_image} width='100px' alt="Make a hotel reservation."/>
                                <div className="roomInfo">
                                    <h1>{room.type}</h1>
                                    <table>
                                        <tr>
                                            <th>Max Capacity</th>
                                            <th>Price</th>
                                            <th>Smoking</th>
                                            <th>Pets</th>
                                        </tr>
                                        <tr>
                                            <td>{room.capacity}</td>
                                            <td>{room.price}</td>
                                            <td>{room.smoking ? "Yes" : "No"}</td>
                                            <td>{room.pets ? "Yes" : "No"}</td>
                                        </tr>
                                        <tr>
                                            <th>Twin Beds</th>
                                            <th>Queen Beds</th>
                                            <th>King Beds</th>
                                            <th>Sofa Sleepers</th>
                                        </tr>
                                        <tr>
                                            <td>{room.twin_beds}</td>
                                            <td>{room.queen_beds}</td>
                                            <td>{room.king_beds}</td>
                                            <td>{room.sofa_sleeper}</td>
                                        </tr>
                                        <tr>
                                            <th>Free Breakfast</th>
                                            <th>Free Wifi</th>
                                            <th>Free Parking</th>
                                        </tr>
                                        <tr>
                                            <td>{room.breakfast_included ? "Yes" : "No"}</td>
                                            <td>{room.wifi_included ? "Yes" : "No"}</td>
                                            <td>{room.parking_included ? "Yes" : "No"}</td>
                                        </tr>
                                    </table>
                                    <button
                                        className="selectButton"
                                        id={room._id}
                                        onClick={event => setRoom_Id(event.target.id)}
                                    >
                                        Select Room
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
    
                </div>
    
                <div>
                    <form onSubmit={handleSubmit}>
                        <br></br>
                        <input
                            type="hidden"
                            value={room_id}
                            onChange={event => setRoom_Id(event.target.value)}
                        />
                        <br></br>
                        <div className="inputsReservation">
                            <div>
                                <label className="labelName">Adult RSVPs</label>
                                <input
                                    type="Number"
                                    className="onlythisinput"
                                    value={adult_rsvps}
                                    onChange={event => setAdult_Rsvps(event.target.value)}
                                />
                            </div>
                            <div>
                                <label className="labelName">Child RSVPs:</label>
                                <input
                                    type="Number"
                                    className="onlythisinput"
                                    value={child_rsvps}
                                    onChange={event => setChild_Rsvps(event.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" onclick className="selectButton">Make Reservation</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {validationErrors.map((error, index) =>
                            <li key={index} style={{ color: "red" }}>
                                {error}
                            </li>
                        )}
                    </ul>
                </div>
            </>
        )
    }

export default MakeReservation;