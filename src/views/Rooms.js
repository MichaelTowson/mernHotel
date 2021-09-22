import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import RoomsFeat from '../components/RoomsFeat';
import backGround from '../components/images/room.jpg';
import styles from '../components/index.module.css';

function Rooms() {
    const [rooms, setRooms] = useState(null);
    useEffect(() => {
        console.log("inside use effect");
        axios.get("http://localhost:8000/room/findAll")
            .then(result => setRooms(result.data))
            .catch(err => console.log(err));
    }, []);
    if (rooms === null) {
        return (
            <p>Loading....</p>
        )
    }
    else {
        return (
            <div className={styles.serviceBack}>
                <NavBar />
                <Hero back={backGround} title="Our Rooms" desc="" btnText="RETURN HOME" btnTo="/home" />
                <div className={styles.roomslist}>
                    <div className={styles.roomslistCenter}>
                        {
                            rooms.map((item, _idx) => {
                                return <RoomsFeat room = {item} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Rooms