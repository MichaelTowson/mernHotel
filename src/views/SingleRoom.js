import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/index.module.css';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import { navigate } from '@reach/router';
// import backGround from '../components/images/familyRoom.jpg';
// import roomImg from '../components/images/roomDetail.jpg';
function SingleRoom(props) {
    const { id } = props;
    const [rooms, setRooms] = useState(null);
    const extraList = ["Plush pillows and breathable bed linens", "Soft, oversized bath towels", 
                        "Full-sized, pH-balanced toiletries", "Complimentary refreshments", "Adequate safety/security",
                        "Internet", "Comfortable beds"
                    ]
    useEffect(() => {
        axios.get('http://localhost:8000/room/findOne/' + id)
            .then(res => setRooms(res.data))
            .catch(err => console.log(err));
    }, [id]);
    console.log("all room", rooms);
    if (rooms === null) {
        return (
            <p>Loading....</p>
        )
    }
    else {
        const title = rooms.type + " Room";
        const gal_img = rooms.gallery_images;
        console.log("**** ",gal_img);
        return (
            <div className={styles.serviceBack}>
                <NavBar />
                <Hero back={rooms.featured_image}
                    title={title}
                    desc=""
                    btnText="BACK TO ROOMS"
                    btnTo="/rooms"
                />
                <div className={styles.singleRoom}>
                    <div className={styles.singleRoomImages}>
                        {
                            gal_img.map((item, idx) => 
                                <img key={idx} src={ item } alt="" />
                            )
                        }
                    </div>
                    <div className={styles.singleRoomInfo}>
                        <div className={styles.desc}>
                            <h2>Details</h2>
                            <p>
                                {rooms.description}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <h2>Info</h2>
                            <h5>price : ${rooms.price}</h5>
                            <h5>size : 800 SQFT</h5>
                            <h5>max capacity : {rooms.capacity} People</h5>
                            {
                                (rooms.pets) ? <h5>pets allowed</h5> : <h5>pets not allowed</h5>
                            }
                            {
                                (rooms.breakfast_included) ? <h5>free breakfast</h5> : <h5>breakfast not included</h5>
                            }
                            {
                                (rooms.parking_included) ? <h5>parking included</h5> : <h5>parking not included</h5>
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


export default SingleRoom