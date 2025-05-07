import { useState } from 'react'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage';
import styles from './App.module.css'

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  }

  const quitGame = () => {
    setIsPlaying(false)
  }

  if (!isPlaying) {
    return (
      <StartPage startGame={startGame}/>
    )
  } else {
    return (
      <GamePage quitGame={quitGame}/>
    )
  }
}

export default App
