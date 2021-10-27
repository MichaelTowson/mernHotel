//LOGIN PAGE VIEW

//Imports
import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import backGround from '../images/lobby.jpg';
import styles from '../components/index.module.css';
import axios from 'axios';
import LoginComponent from '../components/LoginComponent';
import {navigate} from '@reach/router';
import {ToastContainer, toast} from 'react-toastify'; //Used to easily display toast notifcations
import 'react-toastify/dist/ReactToastify.css'; //Styling for toastify notifications

function Login() {

    //REACT State Setup
        const [errors, setErrors] = useState([]);
        const [first_name, setFirstName] = useState("");
        const [last_name, setLastName]= useState("");
        const [number, setNumber] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("")

    //Upon clicking register button:
        const registerUser = (e) => {
            e.preventDefault();
            
            //Update database using axios
            axios.post('http://localhost:5000/register', {
                first_name,
                last_name,
                number,
                email,
                password,
                confirmPassword
            })

            //If successful, display toast message and redirect home
                .then(res => {
                    toast.success("Success! Logging in.");
                    setTimeout(() => {navigate("/home")}, 2000)
                    }
                )
            //If errors are found, update error state and display error toast
                .catch(err =>{
                    console.log("****error*** ",err.response.data.errors);
                    setErrors(err.response.data.errors)
                    toast.error('Error: Please correct fields');
                    }
                )
        }

    //Page Render Using JSX
        return (
        <div>
            <ToastContainer /> {/* Enables usage of "toast", which is used in "registerUser function*/}
            <NavBar />
            <Hero
                back={backGround}
                title="Welcome"
                desc=""
                btnText="RETURN HOME"
                btnTo="/home"
            />  {/* Background image*/}

            <div className={styles.flex}>
                <div className={styles.registerdiv}>
                    <h3>Register</h3>
                    <form onSubmit={registerUser} className={styles.register}>
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.hasOwnProperty("first_name") ? (
                        <p style={{ color: "red" }}>
                        {" "}
                        * {errors["first_name"].message}{" "}
                        </p>
                    ) : (
                        ""
                    )}
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.hasOwnProperty("last_name") ? (
                        <p style={{ color: "red" }}>
                        {" "}
                        * {errors["last_name"].message}{" "}
                        </p>
                    ) : (
                        ""
                    )}
                    <input
                        type="text"
                        placeholder="Cell Number/ optional"
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.hasOwnProperty("email") ? (
                        <p style={{ color: "red" }}>
                        {" "}
                        * {errors["email"].message}{" "}
                        </p>
                    ) : (
                        ""
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.hasOwnProperty("password") ? (
                        <p style={{ color: "red" }}>
                        {" "}
                        * {errors["password"].message}{" "}
                        </p>
                    ) : (
                        ""
                    )}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        className={styles.logButton}
                        type="submit"
                        value="Create Account"
                    />
                    </form>
                </div>
                <LoginComponent />
            </div>
        </div>
        );
    }

export default Login