import ReactConfetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { formatSeconds } from '../utils';

function GameEndScreen({ correctCount, totalCount, currentSeconds, onClick }) {
  const { t } = useTranslation('main');

  function getCorrectCountPercentage() {
    return Math.round((correctCount / totalCount) * 100);
  }

  function generateMsg(percentage) {
    let msg;
    if (percentage >= 90) {
      msg = 'end-best';
    } else if (percentage >= 70) {
      msg = 'end-average';
    } else {
      msg = 'end-worst';
    }
    return msg;
  }

  const percentage = getCorrectCountPercentage();
  const msg = generateMsg(percentage);

  return (
    <>
      {percentage >= 90 && <ReactConfetti />}
      <h2 className="text-shadow">{t(msg)}</h2>
      <p className="bold text-shadow">
        {t('end-title', {
          correctCount,
          totalCount,
          time: formatSeconds(currentSeconds),
          percentage,
        })}
      </p>
      <button className="btn btn--primary play-again-btn" onClick={onClick}>
        {t('play-again-btn')}
      </button>
    </>
  );
}

export default GameEndScreen;
