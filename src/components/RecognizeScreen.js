function RecognizeScreen() {
  return (
    <div className="recognize-screen-container col">
      <h2 className="text-shadow">Kako se zove knedla sa slike?</h2>
      <p className="question-indicator">Knedla 2/18</p>
      <div className="question-image">
        <img src="./images/amareti.avif" alt="slika knedle" />
      </div>
      <div className="question-answers buttons row">
        <button className="btn btn--secondary">Kraljica Marija</button>
        <button className="btn btn--secondary">Nutela</button>
        <button className="btn btn--secondary">Marakuja - divlja kupina</button>
        <button className="btn btn--secondary">Four</button>
      </div>
      <button className="btn btn--primary next-btn">Dalje</button>
    </div>
  );
}

export default RecognizeScreen;
