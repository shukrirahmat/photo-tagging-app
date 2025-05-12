import styles from "../styles/StartPage.module.css";
import PropTypes from "prop-types";

const StartPage = ({startGame, isLoadingItems, loadItemsError}) => {

    return (
        <div className={styles.base}>
            <h1 className={styles.title}>HIDDEN OBJECTS</h1>
            {isLoadingItems && <p className={styles.loadMessage}>Loading... (It will take longer the first time)</p>}
            {loadItemsError && <p className={styles.loadMessage}>{loadItemsError}</p>}
            <button className={styles.playBtn} onClick={startGame} disabled={isLoadingItems || loadItemsError}>START</button>
        </div>
    )
}

StartPage.propTypes = {
    startGame: PropTypes.bool,
    isLoadingItems: PropTypes.bool,
    loadItemsError: PropTypes.string
}

export default StartPage;