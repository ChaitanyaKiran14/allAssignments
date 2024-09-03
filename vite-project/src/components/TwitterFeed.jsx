const TwitterFeed = ({ tweets }) => {
    return (
      <div className="twitter-feed">
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    );
  };
  export default  TwitterFeed