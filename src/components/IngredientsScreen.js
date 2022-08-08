import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import shuffle from 'shuffle-array';
import Question from './Question';
import data from '../data/data.json';
import Loading from './Loading';
import GameEndScreen from './GameEndScreen';
import IngredientsQuestionAnswer from './IngredientsQuestionAnswer';

function IngredientsScreen({ onClick }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [check, setCheck] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    loadIngredients();
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentQuestion = questions[currentIndex];
    if (
      currentQuestion &&
      currentQuestion.ingredients.every((ingredient) =>
        ingredients.find((item) => item.name === ingredient && item.selected)
      )
    ) {
      setCorrectCount((prevCount) => prevCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

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
    setIngredients(allIngredients);
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

  function loadQuestions() {
    setQuestions(formatData(data));
  }

  function formatData(data) {
    return shuffle(data).map((item) => {
      return {
        image: item.image,
        ingredients: item.ingredients,
      };
    });
  }

  function toggleSelect(ingredientId) {
    setIngredients((prevIngredients) => {
      return prevIngredients.map((ingredient) => {
        return ingredient.id !== ingredientId
          ? ingredient
          : { ...ingredient, selected: !ingredient.selected };
      });
    });
  }

  function checkAnswers() {
    const currentQuestion = questions[currentIndex];
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

  const currentQuestion = questions[currentIndex];
  const isGameEnded = !currentQuestion && currentIndex >= questions.length;

  return (
    <div className="ingredients-screen-container col">
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
                title="Šta se nalazi u ovoj knedli?"
                currentRound={currentIndex + 1}
                totalRounds={questions.length}
                questionImage={currentQuestion.image}
                questionAnswers={ingredients}
                QuestionAnswerComponent={IngredientsQuestionAnswer}
                disabled={check}
                onClick={toggleSelect}
              />
              <button
                className="btn btn--primary next-btn"
                onClick={check ? nextQuestion : checkAnswers}>
                {check ? 'Dalje' : 'Proveri'}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default IngredientsScreen;
