import React from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";

const Dashboard = (props) => {
  console.log(props);
  return (
    <div>
      <h3 className="center">Time line</h3>
      <ul className="dashboard-list">
        {props.tweetIds.map((id) => (
          <li key={id}>
            <Tweet id={id}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  };
}
export default connect(mapStateToProps)(Dashboard);
