import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import EndPage from "./components/EndPage.jsx";
import styles from "./App.module.css";
import url from "./api_url.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [finishTime, setFinishTime] = useState(0);
  const [hiddenItemsList, setHiddenItemsList] = useState([]);
  const [loadError, setLoadError] = useState(false);

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

  //Fetching object names
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.base}>
      {isFinished? (
        <EndPage time={finishTime} />
      ) : isPlaying? (
        <GamePage quitGame={quitGame} hiddenItemsList={hiddenItemsList}  finishGame={finishGame}/>
      ) : (
        <StartPage
          startGame={startGame}
          isLoading={isLoading}
          loadError={loadError}
        />
      )}
      <p className={styles.footer}> Created by © shkrrhmt 2025</p>
    </div>
  );
}

export default App;
