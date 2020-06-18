import React, { useEffect, useState } from 'react';
import Modal from './components/modal';
import './App.scss';

function App() {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("");
  const [modalMessage, setModalMessage] = useState("Please enable your location services to continue.");

  useEffect(() => {

    // navigator.geolocation.getCurrentPosition((pos) => {
    //   setLocation(`${pos.coords.latitude},${pos.coords.longitude}`);
    // });
  }, []);
  function getLocation(event) {
    event.preventDefault();
    console.log(event)
    navigator
      .geolocation
      .getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude},${pos.coords.longitude}`);
        },
        (err) => {
          setModalMessage(err);
        }
      );
  }

  return (
    <div className="App">
      {location.length < 10 ? (
        <Modal
          text={modalMessage}
          action={getLocation}
          buttonText="Enable"
        />
      ) : (<div />)}
    </div>
  );
}

export default App;
