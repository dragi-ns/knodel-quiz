import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className="loading-overlay">
      <ReactLoading type="spinningBubbles" color="#7b0baf" />
      <p className="text-shadow">Loading data...</p>
    </div>
  );
}

export default Loading;
