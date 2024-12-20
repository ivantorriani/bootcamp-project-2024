import React from "react";
import styles from "./Comment.module.css";

interface IComment {
  user: string;
  comment: string;
  time: Date;
}

type CommentProps = {
  comment: IComment;
};

function parseCommentTime(time: Date) {
  return time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Comment({ comment }: CommentProps) {
  return (
    <div className={styles.commentContainer}>
      <h4 className={styles.userName}>{comment.user}</h4>
      <p className={styles.commentText}>{comment.comment}</p>
      <span className={styles.commentTime}>{parseCommentTime(comment.time)}</span>
    </div>
  );
}

export default Comment;
