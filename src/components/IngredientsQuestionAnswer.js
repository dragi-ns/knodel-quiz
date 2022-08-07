import classNames from 'classnames';

function IngredientsQuestionAnswer({ answer, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      className={classNames({
        btn: true,
        'btn--secondary': true,
        'question-answer--selected': !disabled && answer.selected,
        'question-answer--missed':
          disabled && !answer.selected && answer.correct,
        'question-answer--correct':
          disabled && answer.selected && answer.correct,
        'question-answer--incorrect':
          disabled && answer.selected && !answer.correct,
      })}
      onClick={() => onClick(answer.id)}>
      {answer.name}
    </button>
  );
}

export default IngredientsQuestionAnswer;
