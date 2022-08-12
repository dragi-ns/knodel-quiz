import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import shuffle from 'shuffle-array';
import useTimer from './useTimer';
import Question from './Question';
import RecognizeQuestionAnswer from './RecognizeQuestionAnswer';
import GameEndScreen from './GameEndScreen';
import data from '../data/data.json';

function RecognizeScreen({ onClick }) {
  const correctAnswersCount = useRef(0);
  const { t } = useTranslation('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState(formatData(data));
  const [stopTimer, setStopTimer] = useState(false);
  const seconds = useTimer(0, stopTimer);

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

  function handleAnswerSelect(answerId) {
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
    const currentQuestion = questions[currentIndex];
    if (
      currentQuestion.answers.find(
        (answer) => answer.selected && answer.correct
      )
    ) {
      correctAnswersCount.current += 1;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion && !stopTimer) {
    setStopTimer(true);
  }

  const disableNext =
    currentQuestion &&
    currentQuestion.answers.every((answer) => !answer.selected);

  return (
    <div className="recognize-screen-container col">
      {!currentQuestion ? (
        <GameEndScreen
          correctCount={correctAnswersCount.current}
          totalCount={questions.length}
          currentSeconds={seconds}
          onClick={onClick}
        />
      ) : (
        <>
          <Question
            title={t('recognize-title')}
            currentRound={currentIndex + 1}
            totalRounds={questions.length}
            currentSeconds={seconds}
            questionImage={currentQuestion.image}
            questionAnswers={currentQuestion.answers}
            QuestionAnswerComponent={RecognizeQuestionAnswer}
            onClick={handleAnswerSelect}
          />

          <button
            disabled={disableNext}
            className="btn btn--primary next-btn"
            onClick={nextQuestion}>
            {t('next-btn')}
          </button>
        </>
      )}
    </div>
  );
}

export default RecognizeScreen;
