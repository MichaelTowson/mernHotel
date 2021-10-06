import styles from "../components/RoomImage.module.css";

//Import background images for various rooms
import imgSingle from "../images/rooms/Single.jpg";
import imgDouble from "../images/rooms/Double.jpg";
import imgTriple from "../images/rooms/Triple.jpg";
import imgSuite from "../images/rooms/Suite.jpg";

function RoomImage(props) {
  console.log(props);

  if (props.roomType == "single") {
    return <img class={styles.componentImg} src={imgSingle}></img>;
  } else if (props.roomType == "double") {
    return <img class={styles.componentImg}  src={imgDouble}></img>;
  } else if (props.roomType == "triple") {
    return <img class={styles.componentImg}  src={imgTriple}></img>;
  } else if (props.roomType == "suite") {
    return <img class={styles.componentImg} src={imgSuite}></img>;
  } else {
    return "";
  }
}

export default RoomImage;
