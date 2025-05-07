import photo from "../assets/images/photo.jpg";
import hiddenObjects from "../assets/images/hiddenobjects.jpg";
import styles from "../styles/GamePic.module.css";
import { useState } from "react";

const GamePic = () => {

    const [position, setPosition] = useState(null)

  const handlePhotoClick = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    setPosition([x,y]);
  };

  return (
    <div className={styles.base}>
      <img
        src={photo}
        className={styles.photo}
        onClick={handlePhotoClick}
      ></img>
      <img src={hiddenObjects} className={styles.hiddenObjects}></img>
      <p className={styles.dropdown} style={position && {left:position[0], top:position[1]}}>HERE</p>
    </div>
  );
};

export default GamePic;
