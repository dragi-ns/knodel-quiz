import { useTranslation } from 'react-i18next';

function Header({ onClick }) {
  const { i18n } = useTranslation();

  return (
    <header className="app-header row">
      <h1 className="logo text-shadow" onClick={onClick}>
        Knödel Quiz
      </h1>
      <div className="buttons row">
        <button
          className="btn btn--primary"
          disabled={i18n.language === 'en'}
          onClick={() => i18n.changeLanguage('en')}>
          EN
        </button>
        <button
          className="btn btn--primary"
          disabled={i18n.language === 'sr'}
          onClick={() => i18n.changeLanguage('sr')}>
          SR
        </button>
      </div>
    </header>
  );
}

export default Header;
