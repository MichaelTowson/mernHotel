import { Link } from '@reach/router';
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { FaAlignRight } from "react-icons/fa"
import { FaUserCircle } from "react-icons/fa"
import axios from 'axios';
// import Login from '../components/Login';
import { navigate } from '@reach/router';
import hotelLogo from '../images/UI/hotel-symbol.png'



function NavBar() {
    const [isOpen, setOpen] = useState(false);
    const [show, setShow] = useState(null);
    const userName = localStorage.getItem("userName");
    // const [errors, setErrors] = useState([]);


    const handleToggle = () => {
        setOpen(!isOpen);
    }
    // console.log(isOpen);

    const showList = () => {
        var dvSites = document.querySelector('#loginList');
        console.log("I CLICK", show)
        setShow(true)//SHOW=TRUE
        console.log( "after state",show)
        if(show) {
            dvSites.style.display = '';
            setShow(false)
        }
        else if (!show){
            dvSites.style.display = 'none';
        }
    }

    const logoutUser = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:5000/logout')
            .then(res => {
                localStorage.clear();
                localStorage.setItem("userName", "Guest");
                navigate('/home')
            })
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <div className={styles.navHeader}>
                        <Link to="/home">
                            <img src={hotelLogo} height= "50px" width="100px" alt="hotel-logo" />
                        </Link>
                        <button type="button" className={styles.navBtn} onClick={handleToggle}>
                            <FaAlignRight className={styles.navIcon} />
                        </button>
                    </div>
                    <ul className={isOpen ? styles.navShow : styles.navLinks}>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/rooms">Rooms</Link>
                        </li>
                        <li>
                            <Link to="/makereservation">Make a Reservation</Link>
                        </li>
                        <li>
                            <FaUserCircle onClick={showList} className={styles.userIcon}></FaUserCircle>
                            {/* <img onClick={showList} src={userIcon} height="25px" width="25px"></img> */}
                            <p style={{ position: "absolute", height: "25px", margin: '5px', display: 'inline-block' }} className={styles.userName}>{userName}</p>
                            <div class={styles.loginList} id="loginList" style={{ display: 'none' }}>
                                <ul className={styles.ulList}>

                                    <li> <Link to="/register">Login</Link></li>
                                    <li onClick={logoutUser}><a> Logout</a></li>
                                    <li> <Link to="/reservation">My reservations</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar