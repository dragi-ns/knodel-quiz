function Header({ onClick }) {
  return (
    <header className="app-header">
      <h1 className="logo text-shadow" onClick={onClick}>
        Knödel Quiz
      </h1>
    </header>
  );
}

export default Header;
