import React from 'react';
import styles from '../components/index.module.css';
import { navigate } from '@reach/router';

function Reserve(props) {
    const { reserveId, room, date, adult, children } = props;

    function handleCancel(id){
        return navigate("/cancel/"+id)
    }

    return (
        <div className={styles.reservation}>
                <div>
                    <h3>Reservation ID: {reserveId}</h3>
                    <br></br>
                    <h6>Room: {room}</h6>
                    <h6>Date: {date.toString()}</h6>
                    <h6>Adults: {adult}</h6>
                    <h6>Children: {children}</h6>
                </div>
                <div>


                    <button className="btn btn-link" type="button" onClick={() => handleCancel(reserveId) } >Free Cancelation</button>

                </div>
            </div>
    )
}

export default Reserve;