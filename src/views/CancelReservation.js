import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styles from '../components/index.module.css';

function CancelReservation(props){
    const { id } = props;
    const user_id = localStorage.getItem("userId");

    useEffect(() => {
        axios.delete("http://localhost:8000/reservation/deleteOne/" + id)
        .then(() => navigate("/reservation"))
        .catch(err => console.log(err));
    }, []);


    // useEffect(() => {
    //     axios.get("http://localhost:8000/reservation/findOne/" + id)
    //         .then(result => { 
    //             const roomIdx = result.data.room_id;
    //             cancelReserve(id, roomIdx);
    //         })
    //         .catch(err => console.log(err));
    // }, []);
    // function cancelReserve(reserveId, roomId){
    //     axios.delete("http://localhost:8000/reservation/deleteOne/"
    //     + reserveId + "/"
    //     + roomId + "/"
    //     + user_id)
    //     .then(() => navigate("/reservation"))
    //     .catch(err => console.log(err));
    // }

    return (
        <h3>Processing .....</h3>
    )
}

export default CancelReservation;

