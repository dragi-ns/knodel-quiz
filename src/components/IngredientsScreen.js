import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import shuffle from 'shuffle-array';
import useTimer from './useTimer';
import Question from './Question';
import IngredientsQuestionAnswer from './IngredientsQuestionAnswer';
import GameEndScreen from './GameEndScreen';
import data from '../data/data.json';
import { useTranslation } from 'react-i18next';

function IngredientsScreen({ onClick }) {
  const questions = useRef(formatData(data));
  const correctAnswersCount = useRef(0);
  const { t } = useTranslation('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ingredients, setIngredients] = useState(loadIngredients);
  const [check, setCheck] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const seconds = useTimer(0, stopTimer);

  useEffect(() => {
    if (!check) {
      return;
    }

    // TODO: Find a better way of checking if all selected answers are correct
    // and that all correct answers are selected.
    if (
      ingredients
        .filter((ingredient) => ingredient.selected)
        .every((ingredient) => ingredient.correct) &&
      ingredients
        .filter((ingredient) => ingredient.correct)
        .every((ingredient) => ingredient.selected)
    ) {
      correctAnswersCount.current += 1;
    }
  }, [check, ingredients]);

  function formatData(data) {
    return shuffle(data).map((item) => {
      return {
        image: item.image,
        ingredients: item.ingredients,
      };
    });
  }

  function loadIngredients() {
    const allIngredients = [
      ...new Set(data.flatMap((item) => item.ingredients)),
    ]
      .sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      })
      .map((item) => ({
        id: nanoid(),
        name: item,
        selected: false,
        correct: false,
      }));
    return allIngredients;
  }

  function resetIngredients() {
    setIngredients((prevIngredients) => {
      return prevIngredients.map((ingredient) => ({
        ...ingredient,
        selected: false,
        correct: false,
      }));
    });
  }

  function handleAnswerToggle(ingredientId) {
    setIngredients((prevIngredients) => {
      return prevIngredients.map((ingredient) => {
        return ingredient.id !== ingredientId
          ? ingredient
          : { ...ingredient, selected: !ingredient.selected };
      });
    });
  }

  function checkAnswers() {
    const currentQuestion = questions.current[currentIndex];
    setCheck(true);
    setIngredients((prevIngredients) => {
      const newIngredients = prevIngredients.map((ingredient) => {
        if (currentQuestion.ingredients.includes(ingredient.name)) {
          return {
            ...ingredient,
            correct: true,
          };
        }
        return ingredient;
      });
      return newIngredients;
    });
  }

  function nextQuestion() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    resetIngredients();
    setCheck(false);
  }

  const currentQuestion = questions.current[currentIndex];
  if (!currentQuestion && !stopTimer) {
    setStopTimer(true);
  }

  return (
    <div className="ingredients-screen-container col">
      {!currentQuestion ? (
        <GameEndScreen
          correctCount={correctAnswersCount.current}
          totalCount={questions.current.length}
          currentSeconds={seconds}
          onClick={onClick}
        />
      ) : (
        <>
          <Question
            title={t('ingredients-title')}
            currentRound={currentIndex + 1}
            totalRounds={questions.current.length}
            currentSeconds={seconds}
            questionImage={currentQuestion.image}
            questionAnswers={ingredients}
            QuestionAnswerComponent={IngredientsQuestionAnswer}
            disabled={check}
            onClick={handleAnswerToggle}
          />
          <button
            className="btn btn--primary next-btn"
            onClick={check ? nextQuestion : checkAnswers}>
            {check ? t('next-btn') : t('check-btn')}
          </button>
        </>
      )}
    </div>
  );
}

export default IngredientsScreen;
