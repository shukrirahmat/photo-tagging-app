import photo from "../assets/images/photo.jpg";
import hiddenObjects from "../assets/images/hiddenobjects.jpg";
import styles from "../styles/GamePic.module.css";
import { useState, useEffect, useRef} from "react";

const GamePic = () => {
  const hiddenObjectsList = [
    "Bread",
    "Fishbone",
    "Bone",
    "Icecream",
    "Watermelon",
    "Duck",
    "Whale",
    "Pizza",
    "Butterfly",
    "Turtle",
  ];

  const [position, setPosition] = useState(null);

  const handlePhotoClick = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    setPosition([x, y]);
  };

  return (
    <div className={styles.base}>
      <img
        src={photo}
        className={styles.photo}
        onClick={handlePhotoClick}
      ></img>
      <img src={hiddenObjects} className={styles.hiddenObjects}></img>
      <ul
        className={styles.dropdown}
        style={position && { display: "flex", left: position[0], top: position[1] }}
      >
        {hiddenObjectsList.map((hiddenobject, index) => {
          return <li key={index} className={styles.dropdownItem}>{hiddenobject}</li>;
        })}
      </ul>
    </div>
  );
};

export default GamePic;
