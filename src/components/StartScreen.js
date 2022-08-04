function StartScreen() {
  return (
    <div className="start-screen-container col">
      <h2 className="text-shadow">Koliko dobro poznajete Ferdinand knedle?</h2>
      <div className="buttons row">
        <button className="btn btn--primary">Prepoznaj knedlu 🧐</button>
        <button className="btn btn--primary">Šta je unutra? 🤔</button>
      </div>
    </div>
  );
}

export default StartScreen;
