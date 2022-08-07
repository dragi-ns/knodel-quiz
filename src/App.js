import { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState(null);

  function handleModeChange(modeName) {
    setMode(modeName);
  }

  return (
    <div className="app">
      <Header onClick={() => handleModeChange(null)} />
      <Main mode={mode} handleModeChange={handleModeChange} />
      <Footer />
    </div>
  );
}

export default App;
