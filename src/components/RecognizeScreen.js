import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { nanoid } from 'nanoid';
import shuffle from 'shuffle-array';
import classNames from 'classnames';
import data from '../data/data.json';

function RecognizeScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadQuestions() {
    setQuestions(formatData(data));
  }

  function formatData(data) {
    function formatAnswers(correctAnswer, incorrectAnswers) {
      return shuffle([
        {
          id: nanoid(),
          name: correctAnswer,
          correct: true,
          selected: false,
        },
        ...incorrectAnswers.map((incorrectAnswer) => {
          return {
            id: nanoid(),
            name: incorrectAnswer,
            correct: false,
            selected: false,
          };
        }),
      ]);
    }

    return shuffle(data).map((item) => {
      return {
        image: item.image,
        answers: formatAnswers(
          item.name,
          shuffle
            .pick(
              data.filter((fItem) => fItem.name !== item.name),
              { picks: 3 }
            )
            .map((pick) => pick.name)
        ),
      };
    });
  }

  function toggleSelect(answerId) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion, index) => {
        return index !== currentIndex
          ? prevQuestion
          : {
              ...prevQuestion,
              answers: prevQuestion.answers.map((answer) => {
                return answer.id !== answerId
                  ? answer
                  : { ...answer, selected: true };
              }),
            };
      });
    });
  }

  const currentQuestion = questions[currentIndex];
  return (
    <div className="recognize-screen-container col">
      {!currentQuestion ? (
        <>
          <ReactConfetti />
          <h2>
            Bravo, pogodili ste{' '}
            {questions.reduce((count, question) => {
              if (
                question.answers.find(
                  (answer) => answer.selected && answer.correct
                )
              ) {
                return count + 1;
              }
              return count;
            }, 0)}{' '}
            od {questions.length} knedli!
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-shadow">Kako se zove knedla sa slike?</h2>
          <p className="question-indicator">
            Knedla {currentIndex + 1}/{questions.length}
          </p>
          <div className="question-image">
            <img
              src={currentQuestion && `./images/${currentQuestion.image}`}
              alt="slika knedle"
            />
          </div>
          <div className="question-answers buttons row">
            {currentQuestion &&
              currentQuestion.answers.map((answer) => (
                <button
                  key={answer.id}
                  disabled={
                    !currentQuestion ||
                    currentQuestion.answers.some((answer) => answer.selected)
                  }
                  className={classNames({
                    btn: true,
                    'btn--secondary': true,
                    'question-answer--correct':
                      answer.selected && answer.correct,
                    'question-answer--incorrect':
                      answer.selected && !answer.correct,
                  })}
                  onClick={() => toggleSelect(answer.id)}>
                  {answer.name}
                </button>
              ))}
          </div>
          <button
            disabled={
              !currentQuestion ||
              currentQuestion.answers.every((answer) => !answer.selected)
            }
            className="btn btn--primary next-btn"
            onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}>
            Dalje
          </button>
        </>
      )}
    </div>
  );
}

export default RecognizeScreen;
