import classNames from 'classnames';

function QuestionAnswer({ answer, someAnswerSelected, onClick }) {
  return (
    <button
      disabled={someAnswerSelected}
      className={classNames({
        btn: true,
        'btn--secondary': true,
        'question-answer--correct': someAnswerSelected && answer.correct,
        'question-answer--incorrect': answer.selected && !answer.correct,
      })}
      onClick={() => onClick(answer.id)}>
      {answer.name}
    </button>
  );
}

export default QuestionAnswer;
