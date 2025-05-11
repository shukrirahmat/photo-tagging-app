import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import styles from "./App.module.css";
import url from "./api_url.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenItemsList, setHiddenItemsList] = useState([]);
  const [loadError, setLoadError] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  };

  const quitGame = () => {
    setIsPlaying(false);
  };

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
      {!isPlaying ? (
        <StartPage
          startGame={startGame}
          isLoading={isLoading}
          loadError={loadError}
        />
      ) : (
        <GamePage quitGame={quitGame} hiddenItemsList={hiddenItemsList} />
      )}
      <p className={styles.footer}> Created by © shkrrhmt 2025</p>
    </div>
  );
}

export default App;
