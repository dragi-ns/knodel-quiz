import QuestionHeader from './QuestionHeader';
import QuestionImage from './QuestionImage';
import QuestionAnswers from './QuestionAnswers';

function Question({ title, currentRound, totalRounds, question, onClick }) {
  return (
    <>
      <QuestionHeader
        title={title}
        currentRound={currentRound}
        totalRounds={totalRounds}
      />
      <QuestionImage src={question.image} />
      <QuestionAnswers answers={question.answers} onClick={onClick} />
    </>
  );
}

export default Question;
