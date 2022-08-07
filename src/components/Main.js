import StartScreen from './StartScreen';
import RecognizeScreen from './RecognizeScreen';
import IngredientsScreen from './IngredientsScreen';

function Main({ mode, handleModeChange }) {
  return (
    <main className="app-main">
      {!mode ? (
        <StartScreen onClick={handleModeChange} />
      ) : mode === 'recognize' ? (
        <RecognizeScreen onClick={() => handleModeChange(null)} />
      ) : (
        <IngredientsScreen onClick={() => handleModeChange(null)} />
      )}
    </main>
  );
}

export default Main;
