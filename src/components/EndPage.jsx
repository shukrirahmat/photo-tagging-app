import styles from "../styles/EndPage.module.css";
import { useState } from "react";
import url from "../api_url";
import PropTypes from "prop-types";

const EndPage = ({ time, resetPage }) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isPostingData, setIsPostingData] = useState(false);
  const [createRecordErr, setCreateRecordErr] = useState(null);

  const editUsername = (e) => {
    const newname = e.target.value;
    setUsername(newname);
  };

  const editComment = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPostingData(true);
    setCreateRecordErr(null);

    if (!username && !comment) {
      setIsPostingData(false);
      resetPage();
    } else {
      fetch(url + "/records", {
        mode: "cors",
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          time,
          username,
          comment,
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Server error. Maybe try again?");
        })
        .then((data) => {
          setIsPostingData(false);
          resetPage();
        })
        .catch((err) => {
          setIsPostingData(false);
          setCreateRecordErr(err.message);
          setTimeout(() => {
            setCreateRecordErr("");
          }, 3000)
        });
    }
  };

  return (
    <div className={styles.base}>
      <h1 className={styles.title}>GOOD JOB!</h1>
      <div className={styles.content}>
        <div className={styles.record}>
          <p>You found all the hidden items! It took you:</p>
          <h2>
            {time / 1000} <span>seconds.</span>
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p>
            Enter a name for your placement in "Fastest Finders". You can also
            enter a comment on the app (Both are optional)
          </p>
          <input
            name="username"
            placeholder="Name"
            value={username}
            onChange={editUsername}
          />
          <textarea
            name="comment"
            placeholder="Write what you think of the app"
            value={comment}
            onChange={editComment}
          />
          <button disabled={isPostingData}>CONTINUE</button>
        </form>
      </div>
      {createRecordErr && <p className={styles.errorMessage}>{createRecordErr}</p>}
    </div>
  );
};

EndPage.propTypes = {
    time: PropTypes.number,
    resetPage: PropTypes.func
}

export default EndPage;
