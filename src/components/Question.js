import QuestionHeader from './QuestionHeader';
import QuestionImage from './QuestionImage';
import QuestionAnswers from './QuestionAnswers';

function Question({
  title,
  currentRound,
  totalRounds,
  questionImage,
  questionAnswers,
  QuestionAnswerComponent,
  disabled = null,
  onClick,
}) {
  return (
    <>
      <QuestionHeader
        title={title}
        currentRound={currentRound}
        totalRounds={totalRounds}
      />
      <QuestionImage src={questionImage} />
      <QuestionAnswers
        QuestionAnswerComponent={QuestionAnswerComponent}
        answers={questionAnswers}
        disabled={disabled}
        onClick={onClick}
      />
    </>
  );
}

export default Question;
