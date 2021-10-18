const env = () => {
  if (window.location.hostname === 'dev-ab-dashboard.netlify.app' || process.env.NODE_ENV === 'development' ) {
    return 'https://yaz-fr.com/api.yaz-fr.com/';
  }

  if (window.location.hostname === 'iraqidev.net') {
    return 'https://api.yaz-fr.com/';
  }
  return '';
};
export default env;
