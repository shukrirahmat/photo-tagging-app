import photo from "../assets/images/photo.jpg";
import hiddenItems from "../assets/images/hiddenitems.jpg";
import styles from "../styles/GamePic.module.css";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const GamePic = ({hiddenItemsList}) => {

  const ref = useRef();
  const picRef = useRef();

  const [itemsList, setItemsList] = useState(hiddenItemsList);
  const [position, setPosition] = useState([0, 0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");

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
    //testing
    setIsVerifying(true);
    setMessage("Verifying...");

    setTimeout(() => {
      setIsVerifying(false);
      setMessage("");
    }, 2000);
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
      <div className={styles.photoContainer}>
        <img
          src={photo}
          className={isVerifying? styles.photoWait : styles.photo}
          onClick={!isVerifying? handlePhotoClick : undefined}
          ref={picRef}
        ></img>
      </div>
      <img src={hiddenItems} className={styles.hiddenItems}></img>
      <ul
        className={dropdownOpen ? styles.dropdownOpened : styles.dropdownClosed}
        style={{ left: position[0], top: position[1] }}
        ref={ref}
      >
        {itemsList.map((item, index) => {
          return (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                handleItemFound(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

GamePic.propTypes = {
    hiddenItemsList: PropTypes.array,
}

export default GamePic;
