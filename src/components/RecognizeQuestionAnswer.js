import classNames from 'classnames';

function RecognizeQuestionAnswer({ answer, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      className={classNames({
        btn: true,
        'btn--secondary': true,
        'question-answer--correct': disabled && answer.correct,
        'question-answer--incorrect': answer.selected && !answer.correct,
      })}
      onClick={() => onClick(answer.id)}>
      {answer.name}
    </button>
  );
}

export default RecognizeQuestionAnswer;
