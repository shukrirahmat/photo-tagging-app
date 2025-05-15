import photo from "../assets/images/photo.jpg";
import hiddenItems from "../assets/images/hiddenitems.jpg";
import styles from "../styles/GamePic.module.css";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import url from "../api_url";
import { differenceInMilliseconds } from "date-fns";

const GamePic = ({ hiddenItemsList, finishGame }) => {
  const ref = useRef();
  const picRef = useRef();

  const [itemsList, setItemsList] = useState(hiddenItemsList);
  const [foundItems, setFoundItems] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [isMainImgLoaded, setIsMainImgLoaded] = useState(false);
  const [isSideImgLoaded, setIsSideImgLoaded] = useState(false);

  const START_TIME = new Date();
  const IMG_HEIGHT = 933;
  const IMG_WIDTH = 717
  const NUMBER_OF_ITEMS = hiddenItemsList.length;
  const [time, setTime] = useState(0);


  //confirms that image is loaded
  const mainImgLoaded = () => {
    setIsMainImgLoaded(true);
    setTime(0);
  }

  const sideImgLoaded = () => {
    setIsSideImgLoaded(true);
    setTime(0);
  }

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
    let xpos = position[0] - (rect.left + window.scrollX);
    let ypos = position[1] - (rect.top + window.scrollY);

    if (rect.height !== IMG_HEIGHT || rect.width !== IMG_WIDTH) {
      xratio = rect.height/IMG_HEIGHT;
      yratio = rect.width/IMG_WIDTH;

      xpos = xpos * xratio;
      ypos = ypos * yratio;
    }

    setIsVerifying(true);
    setMessage("Verifying...");

    fetch(
      url + `/items/verify?itemName=${itemName}&xpos=${xpos}&ypos=${ypos}`,
      {
        mode: "cors",
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error verifying. Maybe try again?");
      })
      .then((data) => {
        setIsVerifying(false);
        if (data.found) {
          const newItemList = itemsList.filter((i) => i !== data.item.name);
          setItemsList(newItemList);

          const newFoundItems = foundItems.slice();
          newFoundItems.push(data.item);
          setFoundItems(newFoundItems);

          setMessage("Found " + data.item.name);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setMessage("Nope!");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      })
      .catch((err) => {
        setIsVerifying(false);
        setMessage(err.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const updateTime = () => {
    const timer = differenceInMilliseconds(new Date(), START_TIME);
    setTime(timer);
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

  // Update times for timer
  useEffect(() => {
    const interval = setInterval(() => updateTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  // Checking if everything found 
  useEffect(() => {
    if (foundItems.length >= NUMBER_OF_ITEMS) {
      finishGame(time);
    }
  }, [foundItems])

  return (
    <>
      <div className={isMainImgLoaded && isSideImgLoaded? styles.base : styles.hiddenBase}>
        <div className={styles.photoContainer}>
          <img
            src={photo}
            className={isVerifying ? styles.photoWait : styles.photo}
            onClick={!isVerifying ? handlePhotoClick : undefined}
            ref={picRef}
            onLoad={mainImgLoaded}
          ></img>
          {foundItems.map((item) => {
            return (
              <div
                className={styles.foundTag}
                key={item.name}
                style={{
                  left: item.xstart,
                  top: item.ystart,
                  width: item.xend - item.xstart,
                  height: item.yend - item.ystart,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>check-bold</title>
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              </div>
            );
          })}
        </div>
        <img src={hiddenItems} className={styles.hiddenItems} onLoad={sideImgLoaded}></img>
        {message && <p className={styles.message}>{message}</p>}
        {isMainImgLoaded && isSideImgLoaded && <p className={styles.timer}>
          Times elapsed: {Math.floor(time / 1000)} seconds
        </p>}
      </div>
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
    </>
  );
};

GamePic.propTypes = {
  hiddenItemsList: PropTypes.array,
  finishGame: PropTypes.func
};

export default GamePic;
