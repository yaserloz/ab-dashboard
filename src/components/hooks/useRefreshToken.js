import axios from '../api/axios';

const useRefreshToken = () => {

    const refresh = async () => {
        const response = await axios.post('auth/token', {
            grantType: 'refresh_token',
          });

        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;