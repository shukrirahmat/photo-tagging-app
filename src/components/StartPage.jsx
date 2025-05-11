import styles from "../styles/StartPage.module.css";
import PropTypes from "prop-types";

const StartPage = ({startGame, isLoading, loadError}) => {

    return (
        <div className={styles.base}>
            <h1 className={styles.title}>HIDDEN OBJECTS</h1>
            {isLoading && <p className={styles.loadMessage}>Loading... (It will take longer the first time)</p>}
            {loadError && <p className={styles.loadMessage}>{loadError}</p>}
            <button className={styles.playBtn} onClick={startGame} disabled={isLoading || loadError}>START</button>
        </div>
    )
}

StartPage.propTypes = {
    startGame: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadError: PropTypes.string
}

export default StartPage;