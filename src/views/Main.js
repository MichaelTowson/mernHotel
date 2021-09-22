import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import RoomsFeat from '../components/RoomsFeat';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import styles from '../components/index.module.css';
import backGround from '../components/images/resort.JPG';

function Main() {
    const [rooms, setRooms] = useState(null);
    useEffect(() => {
        console.log("inside use effect");
        axios.get("http://localhost:8000/room/findAll")
            .then(result => {
                console.log("all room here ",result.data);
                setRooms(result.data)
            })
            .catch(err => console.log(err));
    }, []);
    const services = [
        {
            icon: <FaCocktail />,
            title: "Happy Ours ",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaHiking />,
            title: "Hiking places",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaShuttleVan />,
            title: "Free Shuttles",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            icon: <FaBeer />,
            title: "Best Beer",
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
        for(let i=0;i<rooms.length;i++){
            var single = 1, double = 1, family = 1;
            if(rooms[i].type === "Single Economy" && single === 1){
                filteredRoom.push(rooms[i]);
                single = 0;
            }else if(rooms[i].type === "Double Economy" && double === 1){
                filteredRoom.push(rooms[i]);
                double = 0;
            }else if(rooms[i].type === "Family Deluxe" && double === 1){
                filteredRoom.push(rooms[i]);
                family = 0;
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
                            <RoomsFeat room = {item} />
                        )}
                    </div><br></br><br></br>
                </div>
            </div>
        )
    }
}
export default Main;