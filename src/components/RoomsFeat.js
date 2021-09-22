import React from 'react'
import { Link } from '@reach/router';
import styles from '../components/index.module.css'
// import backGround from '../components/images/room.jpg';


function RoomsFeat(props) {
    const { room } = props;
    // const  {img, url, name, price} = props;
    return (
        <div style={{ backgroundImage: `url(${room.featured_image})` }} className={styles.eachRoom}>
            <div className={styles.priceTop}>${ room.price }</div>
            <div className={styles.roomName}>{ room.type }</div>
            <div className={styles.roomLink}>
                <Link className={styles.linkText} to={`/home/singleRooms/${room._id}`} >Details</Link>
            </div>
        </div>
    )
}
export default RoomsFeat