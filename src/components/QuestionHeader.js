import { useTranslation } from 'react-i18next';

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
          {t('time')}: {currentSeconds}s
        </span>
      </p>
    </>
  );
}

export default QuestionHeader;
