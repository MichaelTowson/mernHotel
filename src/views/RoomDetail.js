import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RoomDetail.module.css';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import { navigate } from '@reach/router';

//Import background images for various rooms
import imgSingle from '../images/rooms/Single.jpg';
import imgDouble from '../images/rooms/Double.jpg';
import imgTriple from '../images/rooms/Triple.jpg';
import imgSuite from '../images/rooms/Suite.jpg';


function RoomDetail(props) {
    const { id } = props;
    const [room, setRoom] = useState(null);
    const extraList = ["Plush pillows and breathable bed linens", "Soft, oversized bath towels", 
                        "Full-sized, pH-balanced toiletries", "Complimentary refreshments", "Adequate safety/security",
                        "Internet", "Comfortable beds"
                    ]
    useEffect(() => {
        axios.get('http://localhost:5000/room/findOne/' + id)
            .then(res => setRoom(res.data))
            .catch(err => console.log(err));
    }, [id]);
    console.log("all rooms: ", room);
    if (room === null) {
        return (
            <p>Loading....</p>
        )
    }
    else {
        const title = room.type + " Room";
        var room_img

        if(room.type == "single") {
            room_img = imgSingle
        } else if (room.type == "double") {
            room_img = imgDouble
        } else if (room.type == "triple") {
            room_img = imgTriple
        } else if (room.type == "suite") {
            room_img = imgSuite
        }

        return (
            <div className={styles.serviceBack}>
                <NavBar />
                <Hero back={room_img}
                    title={title}
                    desc=""
                    btnText="BACK TO ROOMS"
                    btnTo="/rooms"
                />
                <div className={styles.singleRoom}>
                    <div className={styles.singleRoomInfo}>
                        <div className={styles.desc}>
                            <h2>Details</h2>
                            <p>
                                {room.description}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <h2>Info</h2>
                            <h5>price : ${room.price}</h5>
                            <h5>size : 800 SQFT</h5>
                            <h5>max capacity : {room.capacity} People</h5>
                            {
                                (room.pets) ? <h5>pets allowed</h5> : <h5>pets not allowed</h5>
                            }
                            {
                                (room.breakfast_included) ? <h5>free breakfast</h5> : <h5>breakfast not included</h5>
                            }
                            {
                                (room.parking_included) ? <h5>parking included</h5> : <h5>parking not included</h5>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.roomExtras}>
                    <h2>extras</h2>
                    <ul>
                        {
                            extraList.map((item, idx) => (
                                <li>- {item}</li>
                            ))
                        }
                    </ul>
                </div>
                <div><button className={styles.bookRoom} onClick={()=> navigate('/makereservation')}>Book a Room</button></div>
                <br></br>
            </div>
        )
    }
}


export default RoomDetail