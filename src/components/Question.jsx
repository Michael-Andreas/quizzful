import React, { useState } from "react";
import "./Question.css";
import Answer from "./Answer";
import { v4 as uuidv4 } from "uuid";

export default function Question(props) {
  function escapeHtml(str) {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "'")
      .replace(/&#039;/g, "'");
  }
  const question = escapeHtml(props.question);

  const answers = props.answers.map((data) => {
    return (
      <Answer
        answer={data}
        setAnswers={props.setAnswers}
        key={uuidv4()}
        index={props.index}
      />
    );
  });

  return (
    <div className="question--container">
      <p>{question}</p>
      <div className="answers">{answers}</div>
      <hr></hr>
    </div>
  );
}
