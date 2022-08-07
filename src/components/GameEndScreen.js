import ReactConfetti from 'react-confetti';

function GameEndScreen({ correctCount, totalCount, onClick }) {
  function getCorrectCountPercentage() {
    return Math.round((correctCount / totalCount) * 100);
  }

  function generateMsg(percentage) {
    let msg;
    if (percentage >= 90) {
      msg = 'Ferdinandtstično! ';
    } else if (percentage >= 70) {
      msg = 'Bravo!';
    } else {
      msg = 'Može to bolje.';
    }
    return msg;
  }

  const percentage = getCorrectCountPercentage();
  const msg = generateMsg(percentage);

  return (
    <>
      {percentage >= 90 && <ReactConfetti />}
      <h2>
        {msg} Pogodili ste {correctCount} od {totalCount} knedli! ({percentage}
        %)
      </h2>
      <button className="btn btn--primary play-again-btn" onClick={onClick}>
        Igraj ponovo
      </button>
    </>
  );
}

export default GameEndScreen;
