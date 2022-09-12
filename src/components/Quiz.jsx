import React, { useState, useEffect } from "react";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz(props) {
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Check answers");

  const Content = props.questions.map((data, index) => {
    return (
      <Question
        key={data.id}
        question={data.question}
        answers={props.answers[index]}
        setAnswers={props.setAnswers}
        index={index}
      />
    );
  });

  function checkAnswers() {
    if (!props.playing) {
      setScore(0);
      props.setStart(false);
      props.setFetching(true);
      props.setConfetti(false);
      return;
    }
    props.setPlaying(false);
    setButtonText("Play again");
    props.setAnswers((prev) =>
      prev.map((answers) => {
        let newState = answers;
        newState = answers.map((answer) => {
          return answer.correct
            ? {
                ...answer,
                backgroundColor: "#94D7A2",
              }
            : answer.selected
            ? {
                ...answer,
                backgroundColor: "#F8BCBC",
              }
            : answer;
        });
        return newState;
      })
    );
    props.answers.forEach((element) => {
      element.forEach((answer) => {
        if (answer.selected && answer.correct) {
          setScore((prev) => prev + 1);
        }
      });
    });
  }

  if (score > 2) {
    props.setConfetti(true);
  }

  return (
    <div className="container">
      {Content}
      <div className="sub-container">
        {!props.playing && (
          <p>
            You scored {score} / {props.questions.length} correct answers!
          </p>
        )}
        <button onClick={checkAnswers}>{buttonText}</button>
      </div>
    </div>
  );
}
