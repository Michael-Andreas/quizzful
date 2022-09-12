import React from "react";
import "./Startpage.css";

export default function Startpage(props) {
  return (
    <div className="startpage--container">
      <h1>Quizzful</h1>
      <h3>
        Get random questions from the Opentrivia Database API and answer them!
      </h3>
      <button onClick={props.startApp}>Start quiz</button>
    </div>
  );
}
