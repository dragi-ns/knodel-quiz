import { useTranslation } from 'react-i18next';
import { formatSeconds } from '../utils';

function QuestionHeader({ title, currentRound, totalRounds, currentSeconds }) {
  const { t } = useTranslation('main');

  return (
    <>
      <h2 className="question-title text-shadow">{title}</h2>
      <p className="question-indicator row">
        <span className="bold">
          {t('knödel')}: {currentRound}/{totalRounds}
        </span>
        <span className="bold">
          {t('time')}: {formatSeconds(currentSeconds)}
        </span>
      </p>
    </>
  );
}

export default QuestionHeader;
