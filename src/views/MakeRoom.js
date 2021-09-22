//NOTE: This page is intended for admins only. It is a developer tool.

import React, {useState} from 'react'
import axios from 'axios'
import { Link } from '@reach/router';

//Note: I am not including a category of "date" for the reservation yet because working with time might throw things off and I want to first make sure I can update a user and a room with the appropriate data.

//In the actual website, user_id should automatically come from session.
//Room should be selectable by name. On change, we can query the api for the corresponding ID to the name.

function MakeRoom(){
    const [room_number, setRoom_Number] = useState('');
    const [type, setType] = useState('Single');
    const [description, setDescription] = useState('A nice room');
    const [twin_beds, setTwin_Beds] = useState(0);
    const [queen_beds, setQueen_Beds] = useState(0);
    const [king_beds, setKing_Beds,] = useState(0);
    const [sofa_sleeper, setSofa_Sleeper] = useState(0);
    const [capacity, setCapacity] = useState(2);
    const [price, setPrice] = useState('300');
    const [breakfast_included, setBreakfast_Included] = useState('false');
    const [wifi_included, setWifi_Included] = useState('true');
    const [parking_included, setParking_Included] = useState('false');
    const [smoking, setSmoking] = useState('false');
    const [pets, setPets] = useState('false');
    const [featured_image, setFeatured_Image] = useState('https://setupmyhotel.com/images/Room-Type-Single-Room.jpg?ezimgfmt=rs:300x250/rscb263/ng:webp/ngcb263');
    const [gallery_images, setGallery_Images] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/room/create',
            {
                room_number,
                type,
                description,
                twin_beds,
                queen_beds,
                king_beds,
                sofa_sleeper,
                capacity,
                price,
                breakfast_included,
                wifi_included,
                parking_included,
                smoking,
                pets,
                featured_image,
                gallery_images
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
            <h1>Make a Room</h1>
            <Link to={"/"}>Back to Home</Link>
        </div>
        <h2>All fields are required.</h2>
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Room Number</label>
                <input
                    type = "Number"
                    value = {room_number}
                    onChange = {event => setRoom_Number(event.target.value)} 
                />
                <br></br>
                <label>Type</label>
                <input
                    type = "String"
                    value = {type}
                    onChange = {event => setType(event.target.value)} 
                />
                <br></br>
                <label>Description</label>
                <input
                    type = "String"
                    value = {description}
                    onChange = {event => setDescription(event.target.value)} 
                />
                <br></br>
                <label>Twin Beds:</label>
                <input
                    type = "Number"
                    value = {twin_beds}
                    onChange = {event => setTwin_Beds(event.target.value)} 
                />
                <br></br>
                <label>Queen Beds:</label>
                <input
                    type = "Number"
                    value = {queen_beds}
                    onChange = {event => setQueen_Beds(event.target.value)} 
                />
                <br></br>
                <label>King Beds:</label>
                <input
                    type = "Number"
                    value = {king_beds}
                    onChange = {event => setKing_Beds(event.target.value)} 
                />
                <br></br>
                <label>Sofa Sleeper:</label>
                <input
                    type = "Number"
                    value = {sofa_sleeper}
                    onChange = {event => setSofa_Sleeper(event.target.value)} 
                />
                <br></br>
                <label>Capacity:</label>
                <input
                    type = "Number"
                    value = {capacity}
                    onChange = {event => setCapacity(event.target.value)} 
                />
                <br></br>
                <label>Price:</label>
                <input
                    type = "Number"
                    value = {price}
                    onChange = {event => setPrice(event.target.value)} 
                />
                <br></br>
                <label>Breakfast Included:</label>
                <input
                    type = "Boolean"
                    value = {breakfast_included}
                    onChange = {event => setBreakfast_Included(event.target.value)} 
                />
                <br></br>
                <label>Wifi Included:</label>
                <input
                    type = "Boolean"
                    value = {wifi_included}
                    onChange = {event => setWifi_Included(event.target.value)} 
                />
                <br></br>
                <label>Parking Included:</label>
                <input
                    type = "Boolean"
                    value = {parking_included}
                    onChange = {event => setParking_Included(event.target.value)} 
                />
                <br></br>
                <label>Smoking:</label>
                <input
                    type = "Boolean"
                    value = {smoking}
                    onChange = {event => setSmoking(event.target.value)} 
                />
                <br></br>
                <label>Pets:</label>
                <input
                    type = "Boolean"
                    value = {pets}
                    onChange = {event => setPets(event.target.value)} 
                />
                <br></br>
                <label>Featured Image:</label>
                <input
                    type = "String"
                    value = {featured_image}
                    onChange = {event => setFeatured_Image(event.target.value)} 
                />
                <br></br>
                <label>Gallery Images:</label>
                <input
                    type = "String"
                    value = {gallery_images}
                    onChange = {event => setGallery_Images(event.target.value)} 
                />
                <button>Make Room</button>
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

export default MakeRoom;