function QuestionHeader({ title, currentRound, totalRounds }) {
  return (
    <>
      <h2 className="text-shadow">{title}</h2>
      <p className="question-indicator">
        Knedla {currentRound}/{totalRounds}
      </p>
    </>
  );
}

export default QuestionHeader;
