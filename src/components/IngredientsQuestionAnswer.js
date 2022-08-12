import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

function IngredientsQuestionAnswer({ answer, disabled, onClick }) {
  const { t } = useTranslation('ingredients');
  return (
    <button
      disabled={disabled}
      className={classNames({
        btn: true,
        'btn--secondary': true,
        'question-answer': true,
        'question-answer--selected': !disabled && answer.selected,
        'question-answer--missed':
          disabled && !answer.selected && answer.correct,
        'question-answer--correct':
          disabled && answer.selected && answer.correct,
        'question-answer--incorrect':
          disabled && answer.selected && !answer.correct,
      })}
      onClick={() => onClick(answer.id)}>
      {t(answer.name)}
    </button>
  );
}

export default IngredientsQuestionAnswer;
