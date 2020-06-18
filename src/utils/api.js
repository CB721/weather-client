import axios from "axios";
const weatherAPI = "https://quiet-dusk-19680.herokuapp.com/api/v1/weather/?";
const openWeather = "https://api.openweathermap.org/data/2.5/forecast?";

export default {
    getTodayWeather: (long, lat) => {
        return axios.get(`${weatherAPI}long=${long}&lat=${lat}`);
    },
    getForecastWeather: (long, lat) => {
        return axios.get(`${openWeather}lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPEN_WEATHER}&units=imperial`);
    }
}