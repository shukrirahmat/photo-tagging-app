import { useState, useEffect } from "react";
import styles from "../styles/StartPage.module.css";
import PropTypes from "prop-types";
import url from "../api_url";
import { format } from "date-fns";

const StartPage = ({ startGame, isLoadingItems, loadItemsError }) => {
  const [isLoadingRankings, setIsLoadingRankings] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [rankings, setRankings] = useState(null);
  const [rankingsError, setRankingsError] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  // Loading 'faster finder' ranking
  useEffect(() => {
    setIsLoadingRankings(true);
    setRankingsError(null);

    fetch(url + "/records/rankings", {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error loading rankings. Try reloading the page");
      })
      .then((data) => {
        setRankings(data);
        setIsLoadingRankings(false);
      })
      .catch((err) => {
        setRankingsError(err.message);
        setIsLoadingRankings(false);
      });
  }, []);

  // Loading app comments
  useEffect(() => {
    setIsLoadingComments(true);
    setCommentsError(null);

    fetch(url + "/records/comments", {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error loading comments. Try reloading the page");
      })
      .then((data) => {
        setComments(data);
        setIsLoadingComments(false);
      })
      .catch((err) => {
        setCommentsError(err.message);
        setIsLoadingComments(false);
      });
  }, []);

  return (
    <div className={styles.base}>
      <h1 className={styles.title}>HIDDEN OBJECTS</h1>

      <div className={styles.playBtn}>
        <button
          onClick={startGame}
          disabled={isLoadingItems || loadItemsError}
        >
          START
        </button>
        {isLoadingItems && (
          <p className={styles.itemLoadMessage}>
            Loading... (It will take longer the first time)
          </p>
        )}
        {loadItemsError && (
          <p className={styles.itemLoadMessage}>{loadItemsError}</p>
        )}
      </div>

      <div className={styles.rankings}>
        <h2>FASTEST FINDERS</h2>
        {isLoadingRankings ? (
          <p>Loading rankings...</p>
        ) : rankingsError ? (
          <p>{rankingsError}</p>
        ) : rankings.length < 1 ? (
          <p>No records found</p>
        ) : (
          <table>
            <tr class={styles.tableHead}>
              <th>#</th>
              <th>Name</th>
              <th>Time (Seconds)</th>
              <th>Played On</th>
            </tr>
            {rankings.map((ranking, index) => {
              return (
                <tr key={ranking.id}>
                  <td>{index + 1}</td>
                  <td>{ranking.username}</td>
                  <td>{ranking.time / 1000}</td>
                  <td>{format(ranking.dateAdded, "Pp")}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>

      <div className={styles.commentsSection}>
        <h2>COMMENTS</h2>
        {isLoadingComments ? (
          <p>Loading comments...</p>
        ) : commentsError ? (
          <p>{commentsError}</p>
        ) : comments.length < 1 ? (
          <p>No comments found</p>
        ) : (
          <div className={styles.commentsContainer}>
            {comments.map((comment) => {
              return (
                <div key={comment.id} className={styles.comment}>
                  <p className={styles.commentWriter}>{comment.username ? comment.username : "Anonymous"}:</p>
                  <p className={styles.commentText}>{comment.comment}</p>
                  <p className={styles.commentDate}>{format(comment.dateAdded, "Pp")}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

StartPage.propTypes = {
  startGame: PropTypes.bool,
  isLoadingItems: PropTypes.bool,
  loadItemsError: PropTypes.string,
};

export default StartPage;
