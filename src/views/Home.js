import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import RoomThumbnail from '../components/RoomThumbnail';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import styles from '../components/index.module.css';
import backGround from '../images/resort.JPG';

function Home() {
    const [rooms, setRooms] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:5000/room/findAll")
            .then(result => {
                console.log("all rooms loaded: ",result.data);
                setRooms(result.data)
            })
            .catch(err => console.log(err));
    }, []);
    const services = [
        {
            icon: <FaCocktail />,
            title: "Pool-Side Bar ",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaHiking />,
            title: "Trailheads from Property",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaShuttleVan />,
            title: "Free Shuttles to Local Attractions",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaBeer />,
            title: "In-House Brewery",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
    ];
    if (rooms === null) {
        return (
            <p>Loading Main....</p>
        )
    }
    else {
        // console.log("All room here *** ",rooms);
        const filteredRoom = [];
        var single = 0, double = 0, triple = 0;
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].type === "single" && single < 1){
                filteredRoom.push(rooms[i]);
                single++;
            }else if(rooms[i].type === "double" && double < 1){
                filteredRoom.push(rooms[i]);
                double++;
            }else if(rooms[i].type === "triple" && triple < 1){
                filteredRoom.push(rooms[i]);
                triple++;
            }
        }

        console.log("Filtered list ",filteredRoom);
        return (
            <div className={styles.serviceBack}>
                <NavBar />
                <Hero back={backGround}
                    title="Luxurius Rooms"
                    desc="Deluxe Room starting at $200"
                    btnText="Our Rooms"
                    btnTo="/rooms"
                />
                <div>
                    <h1 className={styles.title}>Services</h1>
                    <div className={styles.heroLine}></div>
                    <div className={styles.allServices}>
                        {services.map((item, idx) =>
                            <div className={styles.serviceItems}>
                                <p key={idx}> {item.icon}</p>
                                <p> {item.title}</p>
                                <p> {item.info}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.stylesBack}>
                    <br></br>
                    <h1 className={styles.title}>Featured Rooms</h1>
                    <div className={styles.heroLine}></div>
                    <br></br>
                    <div className={styles.allRooms}>
                        {
                            filteredRoom.map((item, _idx) => 
                            <RoomThumbnail room = {item} />
                        )}
                    </div><br></br><br></br>
                </div>
            </div>
        )
    }
}
export default Home;