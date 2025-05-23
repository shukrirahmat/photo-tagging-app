import PropTypes from "prop-types";
import GamePic from "./GamePic";
import styles from "../styles/GamePage.module.css";

const GamePage = ({quitGame, hiddenItemsList, finishGame}) => {
    return (
        <div className={styles.base}>
            <h1 className={styles.header}>Click on the object that you found!</h1>
            <GamePic hiddenItemsList={hiddenItemsList} finishGame={finishGame}/>
            <button className={styles.quitBtn} onClick={quitGame}>QUIT</button>
        </div>
    )
}

GamePage.propTypes = {
    quitGame: PropTypes.bool,
    hiddenItemsList: PropTypes.array,
    finishGame: PropTypes.func
}

export default GamePage;