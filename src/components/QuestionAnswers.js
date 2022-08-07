function QuestionAnswers({
  QuestionAnswerComponent,
  answers,
  disabled,
  onClick,
}) {
  return (
    <div className="question-answers buttons row">
      {answers.map((answer) => (
        <QuestionAnswerComponent
          key={answer.id}
          answer={answer}
          disabled={disabled ?? answers.some((answer) => answer.selected)}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default QuestionAnswers;
