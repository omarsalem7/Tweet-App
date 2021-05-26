import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";
import { Redirect } from "react-router-dom";

const NewTweet = (props) => {
  const [text, setText] = useState("");
  const [home, setHome] = useState(false);
  const restTweet = 300 - text.length;
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, id } = props;
    dispatch(handleAddTweet(text, id));
    const result = id ? false : true;
    setHome(result);
    setText("");
  };
  if (home === true) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h3 className="center">New Tweet</h3>
      <form onSubmit={handleSubmit} className="new-tweet">
        <textarea
          onChange={handleChange}
          placeholder="new tweet"
          value={text}
          className="textarea"
          maxLength={300}
        />
        {restTweet <= 200 && <div className="tweet-length">{restTweet}</div>}
        <button type="submit" className="btn" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default connect()(NewTweet);
