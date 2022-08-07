import ProgressiveImg from './ProgressiveImg';

function QuestionImage({ src }) {
  return (
    <div className="question-image">
      <ProgressiveImg
        key={`./images/${src}`}
        src={`./images/${src}`}
        placeholderSrc={`./images/small-${src}`}
        width="1200"
        height="675"
      />
    </div>
  );
}

export default QuestionImage;
