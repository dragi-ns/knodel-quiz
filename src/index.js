import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import main_en from './translations/en/main.json';
import main_sr from './translations/sr/main.json';
import knodel_names_en from './translations/en/knodel-names.json';
import knodel_names_sr from './translations/sr/knodel-names.json';
import ingredients_en from './translations/en/ingredients.json';
import ingredients_sr from './translations/sr/ingredients.json';
import App from './App';
import './index.css';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'sr', // language to use
  resources: {
    en: {
      main: main_en,
      'knodel-names': knodel_names_en,
      ingredients: ingredients_en,
    },
    sr: {
      main: main_sr,
      'knodel-names': knodel_names_sr,
      ingredients: ingredients_sr,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
