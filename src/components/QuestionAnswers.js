import QuestionAnswer from './QuestionAnswer';

function QuestionAnswers({ answers, onClick }) {
  const someAnswerSelected = answers.some((answer) => answer.selected);

  return (
    <div className="question-answers buttons row">
      {answers.map((answer) => (
        <QuestionAnswer
          key={answer.id}
          answer={answer}
          someAnswerSelected={someAnswerSelected}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default QuestionAnswers;
