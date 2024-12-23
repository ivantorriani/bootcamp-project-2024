// components/Comment.tsx

import React from 'react';

interface ICommentProps {
  user: string;
  comment: string;
  time: string;
}

const Comment: React.FC<ICommentProps> = ({ user, comment, time }) => {
  return (
    <div>
      <p><strong>{user}</strong> says:</p>
      <p>{comment}</p>
      <p><em>{time}</em></p> {/* time is now a string */}
    </div>
  );
};
export default Comment;
