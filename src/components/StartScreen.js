import { useTranslation } from 'react-i18next';

function StartScreen({ onClick }) {
  const { t } = useTranslation('main');

  return (
    <div className="start-screen-container col">
      <h2 className="text-shadow">{t('title')}</h2>
      <div className="buttons row">
        <button
          className="btn btn--primary"
          onClick={() => onClick('recognize')}>
          {t('recognize-btn')}
        </button>
        <button
          className="btn btn--primary"
          onClick={() => onClick('ingredients')}>
          {t('ingredients-btn')}
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
