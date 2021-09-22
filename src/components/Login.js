import React , {useState} from 'react'
import styles from './index.module.css'
import axios from 'axios';
import {navigate} from '@reach/router';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const loginUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', {
            email,
            password
        })
            .then(res => { 
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("userId", res.data.id);
                if(localStorage.getItem('bookmark') != null){
                    navigate(localStorage.getItem('bookmark'))
                }
                else navigate('/home')
        })
            .catch(err =>{
                console.log( "error" , err.response.data)
                setErrors(err.response.data)
                console.log("errors", errors)
        })
    }


    return (
        <div>
            <div className={styles.logindiv}>
                    <h3>Login</h3>
                    {errors}
                    <form onSubmit={loginUser} className={styles.login}>
                        <input onChange={(e) =>setEmail(e.target.value)} placeholder="Email" />
                        <input onChange={(e) =>setPassword(e.target.value)} placeholder="Password" />
                        <input className={styles.logButton} type="submit" value="Login" />
                    </form>
            </div>
        </div>
    )
}

export default Login