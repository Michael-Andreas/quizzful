import React, { useState, useEffect } from "react";
import "./App.css";
import Background from "./components/Background";
import Startpage from "./components/Startpage";
import Quiz from "./components/Quiz";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";

function App() {
  const [start, setStart] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    async function fetchData() {
      function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      }
      const result = await axios(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      setQuestions(
        result.data.results.map((singlequestion) => {
          return { question: singlequestion.question, id: uuidv4() };
        })
      );
      let answerArr = [];
      for (let i = 0; i < result.data.results.length; i++) {
        let innerArr = [];
        innerArr.push({
          id: uuidv4(),
          answer: result.data.results[i].correct_answer,
          correct: true,
          selected: false,
          backgroundColor: "transparent",
        });
        for (let j = 0; j < 3; j++) {
          innerArr.push({
            id: uuidv4(),
            answer: result.data.results[i].incorrect_answers[j],
            correct: false,
            selected: false,
            backgroundColor: "transparent",
          });
        }
        answerArr.push(innerArr);
      }
      let newAnswerArray;
      newAnswerArray = answerArr.map((element) => {
        return shuffle(element);
      });
      setAnswers(newAnswerArray);
    }

    fetchData();
    setFetching(false);
  }, [fetching]);

  function startApp() {
    setPlaying(true);
    setStart(true);
  }

  return (
    <div>
      <Background />
      {confetti && <Confetti />}
      {!start && <Startpage startApp={startApp} />}
      {start && answers && questions && (
        <Quiz
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          playing={playing}
          setPlaying={setPlaying}
          setStart={setStart}
          start={start}
          fetching={fetching}
          setFetching={setFetching}
          setConfetti={setConfetti}
          confetti={confetti}
        />
      )}
    </div>
  );
}

export default App;
