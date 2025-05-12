import styles from "../styles/EndPage.module.css";

const EndPage = ({ time }) => {
  return (
    <div className={styles.base}>
      <h1 className={styles.title}>GOOD JOB!</h1>
      <div className={styles.content}>
        <div className={styles.record}>
          <p>You found all the hidden items! It took you:</p>
          <h2>{time / 1000} <span>seconds.</span></h2>
        </div>
        <form className={styles.form}>
          <p>
            Enter a name for your placement in "Fastest Finders". You can also
            enter a review of the app (Both are optional)
          </p>
          <input name="name" placeholder="Name"></input>
          <textarea name="review" placeholder="Write what you think of the app"></textarea>
          <button>CONTINUE</button>
        </form>
      </div>
    </div>
  );
};

export default EndPage;
