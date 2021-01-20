
const env = () => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:2020/api.yaz-fr.com/api/'
    }

    if (process.env.NODE_ENV == 'production') {
        return 'https://api.yaz-fr.com/api/'
    }
}

export default env
