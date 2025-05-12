import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import EndPage from "./components/EndPage.jsx";
import styles from "./App.module.css";
import url from "./api_url.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [loadItemsError, setLoadItemsError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finishTime, setFinishTime] = useState(0);
  const [hiddenItemsList, setHiddenItemsList] = useState([]);

  const startGame = () => {
    setIsPlaying(true);
  };

  const quitGame = () => {
    setIsPlaying(false);
  };

  const finishGame = (time) => {
    setFinishTime(time);
    setIsFinished(true);
    setIsPlaying(false);
  }

  const resetPage = () => {
    setIsFinished(false);
    setIsPlaying(false);
    setFinishTime(0);
  }

  //Fetching object names
  useEffect(() => {
    setIsLoadingItems(true);
    fetch(url + "/items", {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong. Try reloading the page");
      })
      .then((data) => {
        setHiddenItemsList(data);
        setIsLoadingItems(false);
      })
      .catch((err) => {
        setLoadItemsError(err.message);
        setIsLoadingItems(false);
      });
  }, []);

  return (
    <div className={styles.base}>
      {isFinished? (
        <EndPage time={finishTime} resetPage={resetPage}/>
      ) : isPlaying? (
        <GamePage quitGame={quitGame} hiddenItemsList={hiddenItemsList}  finishGame={finishGame}/>
      ) : (
        <StartPage
          startGame={startGame}
          isLoadingItems={isLoadingItems}
          loadItemsError={loadItemsError}
        />
      )}
      <p className={styles.footer}> Created by © shkrrhmt 2025</p>
    </div>
  );
}

export default App;
