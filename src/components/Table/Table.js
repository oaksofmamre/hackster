import React from "react";
import TrashButton from "../TrashButton/TrashButton";

const table = props => (
  <div>
    {props.list.filter(item => item.title).map(item => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>
          {" "}
          ++ by <u>{item.author}</u>
        </span>
        <span>
          {" "}
          | <u>{item.num_comments} comments</u>{" "}
        </span>
        <span>
          {" "}
          | <u>{item.points} points</u>
        </span>
        <span>
          <TrashButton onClick={() => props.onDismiss(item.objectID)}>
            Dismiss
          </TrashButton>
        </span>
      </div>
    ))}
  </div>
);

export default table;
