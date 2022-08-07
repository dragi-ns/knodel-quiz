import StartScreen from './StartScreen';
import RecognizeScreen from './RecognizeScreen';

function Main({ mode, handleModeChange }) {
  return (
    <main className="app-main">
      {!mode ? (
        <StartScreen onClick={handleModeChange} />
      ) : mode === 'recognize' ? (
        <RecognizeScreen onClick={() => handleModeChange(null)} />
      ) : (
        <p>todo</p>
      )}
    </main>
  );
}

export default Main;
