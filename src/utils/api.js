import axios from "axios";
const weatherAPI = "https://quiet-dusk-19680.herokuapp.com/api/v1/weather/?"

export default {
    getWeather: (long, lat) => {
        return axios.get(`${weatherAPI}long=${long}&lat=${lat}`);
    }
}