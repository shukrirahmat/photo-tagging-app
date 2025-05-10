import photo from "../assets/images/photo.jpg";
import hiddenItems from "../assets/images/hiddenitems.jpg";
import styles from "../styles/GamePic.module.css";
import { useState, useEffect, useRef } from "react";

const GamePic = () => {
  const hiddenItemsList = [
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
  const [position, setPosition] = useState([0, 0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get coordinates upon click which also opens dropdown
  const handlePhotoClick = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    setPosition([x, y]);
    setDropdownOpen(true);
  };

  // Fetch API to verify whether the item found is corrects
  const handleItemFound = (itemName) => {
    setDropdownOpen(false);
    const photo = picRef.current;
    const rect = photo.getBoundingClientRect();
    const xpos = position[0] - (rect.left + window.scrollX);
    const ypos = position[1] - (rect.top + window.scrollY);
    //continue here

  };

  // Set event for mouse clicks to close dropdown on image
  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className={styles.base}>
      <img
        src={photo}
        className={styles.photo}
        onClick={handlePhotoClick}
        ref={picRef}
      ></img>
      <img src={hiddenItems} className={styles.hiddenItems}></img>
      <ul
        className={dropdownOpen ? styles.dropdownOpened : styles.dropdownClosed}
        style={{ left: position[0], top: position[1] }}
        ref={ref}
      >
        {hiddenItemsList.map((hiddenItem, index) => {
          return (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                handleItemFound(hiddenItem);
              }}
            >
              {hiddenItem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GamePic;
