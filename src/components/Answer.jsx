import React from "react";
import "./Answer.css";

export default function Answer(props) {
  function escapeHtml(str) {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "'")
      .replace(/&#039;/g, "'")
      .replace(/&uuml;/g, "ü")
      .replace(/&Uuml;/g, "Ü")
      .replace(/&ouml;/g, "ö")
      .replace(/&Ouml;/g, "Ö")
      .replace(/&auml;/g, "a")
      .replace(/&Auml;/g, "Ü");
  }
  const singleAnswer = escapeHtml(props.answer.answer);

  function handleClick() {
    if (!props.playing) {
      return;
    }
    props.setAnswers((prev) =>
      prev.map((answers, index) => {
        if (index === props.index) {
          let newState = answers.map((element) => {
            return element.id === props.answer.id
              ? {
                  ...element,
                  selected: true,
                  backgroundColor: "#D6DBF5",
                }
              : {
                  ...element,
                  selected: false,
                  backgroundColor: "transparent",
                };
          });
          return newState;
        } else {
          return answers;
        }
      })
    );
  }

  return (
    <div>
      <span
        onClick={handleClick}
        style={{
          backgroundColor: props.answer.backgroundColor,
          border:
            props.answer.backgroundColor === "transparent"
              ? "2px solid #293264"
              : "2px solid " + props.answer.backgroundColor,
        }}>
        {singleAnswer}
      </span>
    </div>
  );
}
