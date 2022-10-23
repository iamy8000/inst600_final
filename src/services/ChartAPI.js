import Axios from "axios";

// Axios.defaults.withCredentials = true;

const ChartAPI = {
    PVPBattles: async () => {
        const api_link = 'https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1008221991%2C+1011213121%2C+1016093123%2C+1003075437';
        
        const { data = {} } = await Axios.post(
            api_link,
        );
        return data;
    },
    SurvivedBattles: async() => {
        const api_link = 'https://api.worldofwarships.com/wows/account/statsbydate/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1008221991&dates=20220921%2C+20220922%2C+20220923%2C+20220924%2C+20220925';

        const { data = {} } = await Axios.post(
            api_link,
        );
        return data;
    },
    WinLossRatio: async() => {
        const api_link = 'https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1011213121';

        const { data = {} } = await Axios.post(
            api_link,
        );
        return data;
    }
}

export default ChartAPI