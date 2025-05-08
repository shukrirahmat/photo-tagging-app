import photo from "../assets/images/photo.jpg";
import hiddenObjects from "../assets/images/hiddenobjects.jpg";
import styles from "../styles/GamePic.module.css";
import { useState, useEffect, useRef } from "react";

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

  const ref = useRef();
  const picRef = useRef();
  const [position, setPosition] = useState(null);

  // Get coordinates upon click which also opens dropdown
  const handlePhotoClick = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    setPosition([x, y]);
  };


  // Set event for mouse clicks to close dropdown on image
  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setPosition(null);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  // Get image position and size upon loading, this is important for normalizing coordinates
  useEffect(() => {
    const element = picRef.current;
    if (element) {
      element.onload = () => {
        const rect = element.getBoundingClientRect();
        console.log("Absolute position:", rect);
      };
    }
  }, []);

  return (
    <div className={styles.base}>
      <img
        src={photo}
        className={styles.photo}
        onClick={handlePhotoClick}
        ref={picRef}
      ></img>
      <img src={hiddenObjects} className={styles.hiddenObjects}></img>
      <ul
        className={styles.dropdown}
        style={
          position && { display: "flex", left: position[0], top: position[1] }
        }
        ref={ref}
      >
        {hiddenObjectsList.map((hiddenobject, index) => {
          return (
            <li key={index} className={styles.dropdownItem}>
              {hiddenobject}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GamePic;
