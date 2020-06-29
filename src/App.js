import React, { useEffect, useState } from 'react';
import Modal from './components/modal';
import Weather from './components/weather';
import Backgrounds from './components/backgrounds';
import Header from './components/header';
import Clock from './components/clock';
import Date from './components/date';
import Settings from './components/settings';
import { Form, Input } from './components/form';
import { NewsBar, NewsSection } from './components/news';
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
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [user, setUser] = useState({
    name: "",
    isSaved: false
  });
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(
    {
      showDate: true,
      showClock: true,
      showWeatherBG: false,
      showWeather: true,
      showNews: false
    }
  );
  const [news, setNews] = useState([]);
  const [displayNews, setDisplayNews] = useState([]);
  const [displayNewsPage, setDisplayNewsPage] = useState(1);

  const currentHour = parseInt(moment().format("H"));
  const today = moment().format("YYYY-MM-DD");

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
  }, [lat, long, locationPermission]);
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

    // check for user name saved to local storage
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUser({ ...user, name: savedName, isSaved: true });
    }
    const savedWeather = JSON.parse(localStorage.getItem("weather"));
    if (savedWeather) {
      setWeather(savedWeather);
    }
    // set the time of day
    updateTime(currentHour);
    // every 5 minutes check for time of day
    setInterval(() => {
      let hour = parseInt(moment().format("H"));
      updateTime(hour);
    }, 300000);

    // check local storage for settings
    const savedSettings = JSON.parse(localStorage.getItem("settings"));
    // if there are settings saved, update them in state
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      // if there aren't setting saved, save the defaults to local storage
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [currentHour]);
  useEffect(() => {
    // every time the setting are updated, save it to local storage
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    // check local storage for the last news update
    const lastNewsUpdate = localStorage.getItem("news-update");
    // check local storage for saved news
    const savedNews = JSON.parse(localStorage.getItem("news"));
    // if the news hasn't been updated on the current day or if the news has been removed from local storage
    if (lastNewsUpdate !== today || !savedNews) {
      API.getPolitics()
        .then(res => {
          const newsData = res.data.articles;
          // save to state
          setNews(newsData);
          // save to local storage
          localStorage.setItem("news", JSON.stringify(newsData));
          // save current day as last update
          localStorage.setItem("news-update", today);
        })
        .catch(err => console.log(err));
    } else {
      setNews(savedNews);
    }
  }, []);
  useEffect(() => {
    if (news.length) {
      let sliceNews = news.slice(0, 4);
      if (displayNewsPage === 2) {
        sliceNews = news.slice(4, 8);
      } else if (displayNewsPage === 3) {
        sliceNews = news.slice(8, 12);
      } else if (displayNewsPage === 4) {
        sliceNews = news.slice(12, 16);
      } else if (displayNewsPage === 5) {
        sliceNews = news.slice(16, 20);
      }
      setDisplayNews(sliceNews);
    }
  }, [news, displayNewsPage]);

  function updateTime(hour) {
    if (hour >= 5 && hour < 10) {
      setTimeOfDay("sunrise");
    }
    if (hour >= 10 && hour < 17) {
      setTimeOfDay("day");
    }
    if (hour >= 17 && hour < 21) {
      setTimeOfDay("evening");
    }
    if ((hour >= 21 && hour < 25) || (hour >= 0 && hour < 5)) {
      setTimeOfDay("night");
    }
  }
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
  function handleInputChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setUser({ ...user, name: value });
        break;
      default:
        return;
    }
  }
  function validateField(event) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        if (!value.length) setModalMessage("Please enter your name");
        break;
      default:
        return;
    }
  }
  function handleInputSubmit(event, property) {
    event.preventDefault();
    switch (property) {
      case "name":
        localStorage.setItem("username", user.name);
        setUser({ ...user, isSaved: true });
        break;
      default:
        return;
    }
  }
  function toggleSideMenu(event) {
    event.preventDefault();
    setShowSettings(!showSettings);
  }
  function adjustSetting(event, setting) {
    event.preventDefault();
    switch (setting) {
      case "showDate":
        setSettings({ ...settings, showDate: !settings.showDate });
        break;
      case "showClock":
        setSettings({ ...settings, showClock: !settings.showClock });
        break;
      case "showWeatherBG":
        setSettings({ ...settings, showWeatherBG: !settings.showWeatherBG });
        break;
      case "showWeather":
        setSettings({ ...settings, showWeather: !settings.showWeather });
        break;
      case "showNews":
        setSettings({ ...settings, showNews: !settings.showNews });
        break;
      default:
        return;
    }
  }
  function changeNewsPage(event, next) {
    event.preventDefault();
    if (next && displayNewsPage < 5) {
      setDisplayNewsPage(displayNewsPage + 1);
    } else if (next) {
      setDisplayNewsPage(1);
    } else if (!next && displayNewsPage > 1) {
      setDisplayNewsPage(displayNewsPage - 1);
    } else {
      setDisplayNewsPage(5);
    }
  }
  function setBGHeight() {
    let total = 0;
    for (const key in settings) {
      if (settings[key] && (key !== 'showWeatherBG' || key !== 'showClock' || key !== 'showDate')) total ++;
      else if (settings[key] && (key === 'showClock' || key === 'showDate')) total += 0.5
    }
    return 100 + (10 * total);
  }
  return (
    <div className="app">
      {weather && user.name && locationPermission ? (
        <Backgrounds
          timeOfDay={timeOfDay}
          weather={weather}
          showCurrWeather={settings.showWeatherBG}
          height={setBGHeight()}
        />
      ) : (<div />)}
      {!user.isSaved ? (
        <Modal
          text="What is your name?"
          action={event => handleInputSubmit(event, "name")}
          buttonText="Submit"
          bgStyle={timeOfDay}
          children={<Form>
            <Input
              type=""
              value={user.name}
              name="name"
              placeholder="Your name"
              handleInputChange={handleInputChange}
              validate={validateField}
              autoFocus={true}
            />
          </Form>}
        />
      ) : !locationPermission ? (
        <Modal
          text={modalMessage}
          action={getLocation}
          buttonText="Enable"
          bgStyle={timeOfDay}
        />
      ) : (<div />)}
      {user.isSaved ? (
        <div>
          <Header
            name={user.name}
            openMenu={toggleSideMenu}
          />
          {settings.showClock || settings.showDate ? (
            <div id="date-time">
              {settings.showDate ? (
                <Date />
              ) : (<div />)}
              {settings.showClock ? (
                <Clock />
              ) : (<div />)}
            </div>
          ) : (<div />)}
          {news.length && settings.showNews ? (
            <NewsBar
              children={displayNews.map((article, index) => (
                <NewsSection
                  key={index}
                  data={article}
                />
              ))}
              changeNewsPage={changeNewsPage}
            />
          ) : (<div />)}
          {weather && forecast && forecast.length && settings.showWeather ? (
            <Weather
              today={weather}
              forecast={forecast}
            />
          ) : (<div />)}
        </div>
      ) : (<div />)}
      {showSettings ? (
        <Settings
          settings={settings}
          closeMenu={toggleSideMenu}
          adjustSetting={adjustSetting}
        />
      ) : (<div />)}
    </div>
  );
}

export default App;
