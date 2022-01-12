import React from "react";
import { capitalizeAll } from "../utils/capitalize";
import "../styles/activities.css";

const Activities = ({ activityData, destinationID }) => {
  const thingsToDo = activityData.map((activity) => {
    return (
      <li key={activity.name}>
        <h3>{activity.name}</h3>
        <p>{activity.text}</p>
      </li>
    );
  });

  return (
    <div className="things-to-do">
      <div className="things-list">
        <h2>Top Things to Do in {capitalizeAll(destinationID)}</h2>
        <ul>{thingsToDo}</ul>
      </div>
    </div>
  );
};

export default Activities;
