import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import backGround from '../images/reservation-page.jpg';
import styles from '../components/index.module.css';
import ReservationListing from '../components/ReservationListing';
import axios from 'axios';

function ViewReservation() {
    const user_id = '614be2bba269376f081096cc';
    const [reservationsList, setReservationsList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/reservation/user', { params: { user_id } })
            .then(response => setReservationsList(response.data))
            .catch(err => console.log(err));
            console.log("Reservations: " + reservationsList);
    }, []);

    return (
        <div className={styles.serviceBack}>
            <NavBar />
            <Hero back={backGround}
                title="Your Reservations"
                desc=""
                btnText="RETURN HOME"
                btnTo="/rooms"
            />
            {
                reservationsList.map(reservation => <ReservationListing reservationId={reservation._id} room={reservation.room_type} date={new Date(reservation.date)} adult={reservation.rsvps} />)
            }
        </div>
    )
}

export default ViewReservation;