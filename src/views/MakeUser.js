//NOTE: This page is intended for admins only. It is a developer tool.

import React, {useState} from 'react'
import axios from 'axios'
import { Link } from '@reach/router';

//Note: I am not including a category of "date" for the reservation yet because working with time might throw things off and I want to first make sure I can update a user and a room with the appropriate data.

//In the actual website, user_id should automatically come from session.
//Room should be selectable by name. On change, we can query the api for the corresponding ID to the name.

function MakeUser(){
    const [first_name,setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [cell_number, setCell_Number] = useState('###-###-####');
    const [email, setEmail] = useState('@email.com');
    const [admin, setAdmin] = useState('false');
    const [validationErrors, setValidationErrors] = useState([]);


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/user/create',
            {
                first_name, 
                last_name, 
                cell_number, 
                email,
                admin
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                const errorMessages = err.response.data.errors;
                const errorArray = [];
                for (const error in errorMessages) {
                    errorArray.push(errorMessages[error].message)
                }
                setValidationErrors(errorArray);
                console.log(err);
            })
    }

return(
    <>
        <div>
            <h1>Make a User</h1>
            <Link to={"/"}>Back to Home</Link>
        </div>
        <h2>All fields are required.</h2>
        <div>
            <form onSubmit = {handleSubmit}>
                <label>First Name</label>
                <input
                    type = "String"
                    value = {first_name}
                    onChange = {event => setFirst_Name(event.target.value)} 
                />
                <br></br>
                <label>Last Name</label>
                <input
                    type = "String"
                    value = {last_name}
                    onChange = {event => setLast_Name(event.target.value)} 
                />
                <br></br>
                <label>Cell Number</label>
                <input
                    type = "String"
                    value = {cell_number}
                    onChange = {event => setCell_Number(event.target.value)} 
                />
                <br></br>
                <label>Email:</label>
                <input
                    type = "String"
                    value = {email}
                    onChange = {event => setEmail(event.target.value)} 
                />
                <button>Make User</button>
            </form>
        </div>
        <div>
            <ul>
            {validationErrors.map((error, index) =>
                <li key={index} style={{color:"red"}}>
                    {error}
                </li>
            )}
            </ul>
        </div>
    </>
)
}

export default MakeUser;