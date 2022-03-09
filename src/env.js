const env = () => {
  if (window.location.hostname === 'dev-ab-dashboard.netlify.app' || process.env.NODE_ENV === 'development' ) {
    return 'https://dev-api.yaz-fr.com/';
  }

  if (window.location.hostname === 'prod-ab-dashboard.netlify.app') {
    return 'https://api.yaz-fr.com/';
  }
  return '';
};
export default env;
