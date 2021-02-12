
const env = () => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:8000/'
    }

    if (process.env.NODE_ENV == 'production') {
        return 'https://api.yaz-fr.com/'
    }
}

export default env
