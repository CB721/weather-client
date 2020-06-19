import React, { useEffect, useState } from 'react';
import Modal from './components/modal';
import Weather from './components/weather';
import WeatherSection from './components/weather-section';
import API from './utils/api';
import moment from 'moment';
import './App.scss';

function App() {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState([]);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [modalMessage, setModalMessage] = useState("Please enable your location services to continue.");
  const [locationPermission, setLocationPermission] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("night");

  const currentHour = parseInt(moment().format("H"));

  useEffect(() => {
    // if both a latitude and longitude have been provided and the user has given permission to user location
    if (lat && long && locationPermission) {
      // make request to get weather for the users location
      API.getTodayWeather(long, lat)
        .then(res => {
          // save weather to state
          setWeather(JSON.parse(res.data.data));
          // save weather to local storage
          localStorage.setItem("weather", res.data.data);
        })
        .catch(err => {
          // if there is an error from the api
          console.log(err);
        });
    }
  }, [lat, long]);
  useEffect(() => {
    const lastUpdate = parseInt(localStorage.getItem("hour"));
    const savedForecast = JSON.parse(localStorage.getItem("forecast"));
    // once the current day's weather has been received, get the rest of the week as long as it hasn't already been updated for that hour and the user has given permission to use the location
    if (weather && (currentHour !== lastUpdate || !savedForecast || !savedForecast.length) && locationPermission) {
      API.getForecastWeather(long, lat)
        .then(res => {
          // list of all weather forecast
          const { list } = res.data;
          // keep a list of each day
          const nextFiveDays = [];
          //
          let i = 7;
          while (i < 48) {
            if (i >= 40) {
              // save forecast to state
              setForecast(nextFiveDays);
              // save forecast to local storage
              localStorage.setItem("forecast", JSON.stringify(nextFiveDays));
            } else if (list[i]) {
              nextFiveDays.push(list[i]);
            }
            // increase by 8 to get to the next forecast in 24 hours
            i += 8;
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // if the forecast has been saved and it is still within the same hour from the last update
      // save forecast to state
      setForecast(savedForecast);
    }
  }, [weather]);
  useEffect(() => {
    // look in local storage for coordinates and see when it was last updated
    setLocationPermission(Boolean(localStorage.getItem("location-permission")));
    const lastUpdate = parseInt(localStorage.getItem("hour"));
    const savedLat = localStorage.getItem("lat");
    const savedLong = localStorage.getItem("long");
    setLat(savedLat);
    setLong(savedLong);

    // only update every hour
    if (locationPermission && currentHour !== lastUpdate && savedLat && savedLong) {
      getLocation();
    } else if (locationPermission) {
      // if the location permission has already been granted, just get the location
      getLocation();
    }
  }, [currentHour]);
  useEffect(() => {
    const savedWeather = JSON.parse(localStorage.getItem("weather"));
    if (savedWeather) {
      setWeather(savedWeather);
    }
    // if (currentHour >= 5 && currentHour < 10) {
    //   setTimeOfDay("sunrise");
    // }
    // if (currentHour >= 10 && currentHour < 17) {
    //   setTimeOfDay("day");
    // }
    // if (currentHour >= 17 && currentHour < 21) {
    //   setTimeOfDay("evening");
    // }
    // if ((currentHour >= 21 && currentHour < 25) || (currentHour >= 0 && currentHour < 5)) {
    //   setTimeOfDay("night");
    // }
  }, []);

  function getLocation() {
    // set that the user has confirmed to share their location to local storage
    localStorage.setItem("location-permission", true);
    setLocationPermission(true);
    // get coordinates when the user clicks the enable button
    navigator
      .geolocation
      .getCurrentPosition(
        (pos) => {
          // save coordinates to state
          setLat(pos.coords.latitude);
          setLong(pos.coords.longitude);
          // save coordinates to local storage
          localStorage.setItem("lat", pos.coords.latitude);
          localStorage.setItem("long", pos.coords.longitude);
          // save the current hour
          localStorage.setItem("hour", currentHour);
        },
        (err) => {
          // if there is an error getting the users location, show the user why
          setModalMessage(err.message);
        }
      );
  }

  return (
    <div className={`app ${timeOfDay}`}>
      {!locationPermission ? (
        <Modal
          text={modalMessage}
          action={getLocation}
          buttonText="Enable"
          bgStyle={timeOfDay}
        />
      ) : (<div />)}
      {weather && forecast && forecast.length ? (
        <Weather
          today={weather}
          forecast={forecast}
        />
      ) : (<div />)}
    </div>
  );
}

export default App;
