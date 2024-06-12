import i18n from 'i18next';

function checkLanguage() {
  return localStorage.getItem('i18nextLng') || i18n.resolvedLanguage;
}

export default checkLanguage;
