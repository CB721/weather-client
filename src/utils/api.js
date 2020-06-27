import axios from "axios";
import moment from "moment";
const apiURL = "https://quiet-dusk-19680.herokuapp.com/api/v1/";

export default {
    getTodayWeather: (long, lat) => {
        return axios.get(`${apiURL}weather/?long=${long}&lat=${lat}`);
    },
    getForecastWeather: (long, lat) => {
        return axios.post(`${apiURL}weather/?long=${long}&lat=${lat}`);
    },
    getPolitics: (sources = 'fox-news,breitbart-news,cnn,msnbc,associated-press') => {
        const today = moment().format("YYYY-MM-DD");
        const pastFiveDay = moment().subtract(5,'d').format("YYYY-MM-DD");
        return axios.get(`${apiURL}news/?sources=${sources}&from${pastFiveDay}&to=${today}`);
    }
}