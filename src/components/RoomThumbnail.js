import React from 'react'
import { Link } from '@reach/router';
import styles from '../components/index.module.css'
import imgSingleRoom from '../images/rooms/Single.jpg'
import imgDoubleRoom from '../images/rooms/Double.jpg'
import imgTripleRoom from '../images/rooms/Triple.jpg'
import imgSuiteRoom from '../images/rooms/Suite.jpg'


function RoomThumbnail(props) {
    const { room } = props;

    if (room.type == "single") {
        var imgUrl = imgSingleRoom;
    } else if (room.type == "double") {
        imgUrl = imgDoubleRoom;
    } else if (room.type == "triple") {
        imgUrl = imgTripleRoom;
    } else if (room.type == "suite") {
        imgUrl = imgSuiteRoom;
    }

    return (
        <div style={ {backgroundImage: `url(${imgUrl})`} } className={styles.eachRoom}>
            <div className={styles.priceTop}>${ room.price }</div>
            <div className={styles.roomName}>{ room.type }</div>
            <div className={styles.roomLink}>
                <Link className={styles.linkText} to={`/home/singleRooms/${room._id}`} >Details</Link>
            </div>
        </div>
    )
}
export default RoomThumbnail