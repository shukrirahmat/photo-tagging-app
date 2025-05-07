import styles from "../styles/StartPage.module.css";
import PropTypes from "prop-types";

const StartPage = ({startGame}) => {
    return (
        <div className={styles.base}>
            <h1 className={styles.title}>HIDDEN OBJECTS</h1>
            <button className={styles.playBtn} onClick={startGame}>START</button>
        </div>
    )
}

StartPage.propTypes = {
    startGame: PropTypes.bool
}

export default StartPage;