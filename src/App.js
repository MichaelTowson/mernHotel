import { Router, Redirect } from '@reach/router';
import './App.css';

import Home from './views/Home';
import Rooms from './views/Rooms';
import SingleRoom from './views/SingleRoom';
import Error from './views/Error';
import Register from './components/Register';
import ViewReservation from './views/ViewReservation';
import MakeReservation from './views/MakeReservation'
import DBUser from "./views/databaseManagement/DBUser";
import DBRoom from "./views/databaseManagement/DBRoom";
import CancelReservation from './views/CancelReservation';

function App() {
    return (
        <div className="App">
            <Router>
                <Redirect from='/home' to='/' noThrow />
                <Home path="/" />
                <Rooms path="/rooms" />
                <SingleRoom path="/home/singleRooms/:id" />
                <Error path="/home/error" />
                <Register path="/register" />
                <ViewReservation path="/reservation" />
                <MakeReservation path = "/makereservation" />
                <DBUser path = "/dbuser" />
                <DBRoom path = "/dbroom" />
                <CancelReservation path="/cancel/:id"/>
            </Router>
        </div>
    );
}

export default App;
