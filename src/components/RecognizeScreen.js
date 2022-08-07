import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import shuffle from 'shuffle-array';
import Question from './Question';
import data from '../data/data.json';
import Loading from './Loading';
import GameEndScreen from './GameEndScreen';
import RecognizeQuestionAnswer from './RecognizeQuestionAnswer';

function RecognizeScreen({ onClick }) {
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

  function nextQuestion() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  const currentQuestion = questions[currentIndex];
  const disableNext =
    !currentQuestion ||
    currentQuestion.answers.every((answer) => !answer.selected);
  const isGameEnded = !currentQuestion && currentIndex >= questions.length;
  let correctCount = 0;
  if (isGameEnded) {
    correctCount = questions.reduce((count, question) => {
      if (
        question.answers.find((answer) => answer.selected && answer.correct)
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  return (
    <div className="recognize-screen-container col">
      {!isGameEnded && !currentQuestion && currentIndex > 0 ? (
        <Loading />
      ) : (
        <>
          {isGameEnded ? (
            <GameEndScreen
              correctCount={correctCount}
              totalCount={questions.length}
              onClick={onClick}
            />
          ) : (
            <>
              <Question
                title="Kako se zove knedla sa slike?"
                currentRound={currentIndex + 1}
                totalRounds={questions.length}
                questionImage={currentQuestion.image}
                questionAnswers={currentQuestion.answers}
                QuestionAnswerComponent={RecognizeQuestionAnswer}
                onClick={toggleSelect}
              />

              <button
                disabled={disableNext}
                className="btn btn--primary next-btn"
                onClick={nextQuestion}>
                Dalje
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RecognizeScreen;
