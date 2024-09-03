import React from 'react';

const Tweet = ({ tweet }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <img src={tweet.user.profilePicture} alt={tweet.user.name} />
        <div>
          <span className="tweet-user">{tweet.user.name}</span>
          <span className="tweet-handle">@{tweet.user.handle}</span>
        </div>
      </div>
      <div className="tweet-content">
        {tweet.content}
      </div>
      <div className="tweet-footer">
        <span className="tweet-timestamp">{tweet.timestamp}</span>
        <span className="tweet-actions">
          <i className="fas fa-reply"></i>
          <i className="fas fa-retweet"></i>
          <i className="fas fa-heart"></i>
          <i className="fas fa-ellipsis-h"></i>
        </span>
      </div>
    </div>
  );
};
export default Tweet