const env = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://alqaisi.freeboxos.fr/api.yaz-fr.com/';
  }

  if (process.env.NODE_ENV === 'production') {
    return 'http://alqaisi.freeboxos.fr/api.yaz-fr.com/';
  }
  return '';
};

export default env;
