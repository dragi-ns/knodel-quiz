import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

function RecognizeQuestionAnswer({ answer, disabled, onClick }) {
  const { t } = useTranslation('knodel-names');
  return (
    <button
      disabled={disabled}
      className={classNames({
        btn: true,
        'btn--secondary': true,
        'question-answer': true,
        'question-answer--correct': disabled && answer.correct,
        'question-answer--incorrect': answer.selected && !answer.correct,
      })}
      onClick={() => onClick(answer.id)}>
      {t(answer.name)}
    </button>
  );
}

export default RecognizeQuestionAnswer;
