import ReactConfetti from 'react-confetti';
import { useTranslation } from 'react-i18next';

function GameEndScreen({ correctCount, totalCount, onClick }) {
  const { t } = useTranslation('main');

  function getCorrectCountPercentage() {
    return Math.round((correctCount / totalCount) * 100);
  }

  function generateMsg(percentage) {
    let msg;
    if (percentage >= 90) {
      msg = t('end-best');
    } else if (percentage >= 70) {
      msg = t('end-average');
    } else {
      msg = t('end-worst');
    }
    return msg;
  }

  const percentage = getCorrectCountPercentage();
  const msg = generateMsg(percentage);

  return (
    <>
      {percentage >= 90 && <ReactConfetti />}
      <h2>{t('end-title', { msg, correctCount, totalCount, percentage })}</h2>
      <button className="btn btn--primary play-again-btn" onClick={onClick}>
        {t('play-again-btn')}
      </button>
    </>
  );
}

export default GameEndScreen;
