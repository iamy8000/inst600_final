import Axios from "axios";
import Moment from "moment";

// Axios.defaults.withCredentials = true;

const ChartAPI = {
    PVPBattles: async () => {
        const api_link = 'https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1008221991%2C+1011213121%2C+1016093123%2C+1003075437';

        const { data = {} } = await Axios.get(
            api_link,
        );
        return data;
    },
    SurvivedBattles: async () => {
        function getDate(days) {
            return Moment().subtract(days, 'days').format("YYYYMMDD")
        }

        const api_link = `https://api.worldofwarships.com/wows/account/statsbydate/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1008221991&dates=${getDate(30)}%2C+${getDate(15)}%2C+${getDate(10)}%2C+${getDate(5)}%2C+${getDate(0)}`;

        const { data = {} } = await Axios.get(
            api_link,
        );
        return data;
    },
    WinLossRatio: async () => {
        const api_link = 'https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1011213121';

        const { data = {} } = await Axios.get(
            api_link,
        );
        return data;
    },
    StatsGoozombies: async () => {
        const api_link = 'https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1008221991';

        const { data = {} } = await Axios.get(
            api_link,
        );
        return data;
    },
    StatsGoodNotBest: async () => {
        const api_link='https://api.worldofwarships.com/wows/account/info/?application_id=40c89c194464b943f74c5d5044cc66ed&account_id=1003075437';

        const { data = {} } = await Axios.get(
            api_link,
        );
        return data;
    },
}

export default ChartAPI