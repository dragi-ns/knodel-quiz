import { useTranslation } from 'react-i18next';

function QuestionHeader({ title, currentRound, totalRounds }) {
  const { t } = useTranslation('main');

  return (
    <>
      <h2 className="question-title text-shadow">{title}</h2>
      <p className="question-indicator">
        {t('knödel')} {currentRound}/{totalRounds}
      </p>
    </>
  );
}

export default QuestionHeader;
