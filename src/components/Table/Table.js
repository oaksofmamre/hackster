import React from "react";
import TrashButton from "../TrashButton/TrashButton";

const table = props => (
  // const table = ({ list, onDismiss }) => (
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
          {/* open up browser's console to see the different outcomes */}
          {/* <Button onClick={console.log(item.objectID)}>Dismiss</Button> */}
          {/* <Button onClick={() => console.log(item.objectID)}> Dismiss </Button> */}
        </span>
      </div>
    ))}
  </div>
);

export default table;
