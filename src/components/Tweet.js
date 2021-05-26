import React from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";
import { formatDate } from "../utils/helpers";
import { TiArrowBack } from "react-icons/ti";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";

const Tweet = (props) => {
  const { tweet, authedUser, dispatch } = props;
  const toParent = (e, id) => {
    e.preventDefault();
    props.history.push(`/tweet/${id}`);
  };
  const handleLike = (e) => {
    e.preventDefault();
    //handle like click
    dispatch(
      handleToggleTweet({ id: tweet.id, hasLiked: tweet.hasLiked, authedUser })
    );
  };

  const {
    name,
    avatar,
    timestamp,
    text,
    hasLiked,
    likes,
    replies,
    parent,
    id,
  } = tweet;
  if (tweet === null) {
    return <div className="center">This Tweet doesn't existed</div>;
  }
  console.log(props);
  return (
    <Link to={`/tweet/${id}`} className="tweet">
      <img src={avatar} alt={`Avater of ${name}`} className="avatar" />

      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => toParent(e, parent.id)}
            >
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBack className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked === true ? (
              <BsHeartFill color="#e0245e" className="tweet-icon" />
            ) : (
              <BsHeart className="tweet-icon" />
            )}
            <span>{likes !== 0 && likes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
}
export default withRouter(connect(mapStateToProps)(Tweet));
