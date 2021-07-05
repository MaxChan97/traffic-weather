import React, { useState, useEffect } from 'react';
import './App.css';
import * as dayjs from 'dayjs';
import Api from './helpers/Api';
import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateTimeInput from './components/DateTimeInput';
import LocationList from './components/LocationList';
import WeatherInfoCard from './components/WeatherInfoCard';
import TrafficCamShotCard from './components/TrafficCamShotCard';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [isLoading, setIsLoading] = useState(false);
  const [captures, setCaptures] = useState([]);
  const [selectedCapture, setSelectedCapture] = useState();

  useEffect(() => {
    console.log(selectedCapture);
    if (selectedCapture && !selectedCapture.hasOwnProperty('weatherInfo')) {
      console.log('run');
      setIsLoading(true);
      let dateTime = convertDateToTimezoneSpecificString(selectedDate);
      Api.getTwoHourWeatherForecasts(
        dateTime,
        selectedCapture.location.latitude,
        selectedCapture.location.longitude
      )
        .then((weatherInfo) => {
          console.log(weatherInfo);
          setSelectedCapture({ ...selectedCapture, weatherInfo: weatherInfo });
        })
        .finally(() => {
          setIsLoading(false);
          console.log(selectedCapture);
        });
    }
  }, [selectedCapture]);

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function convertDateToTimezoneSpecificString(selectedDate) {
    let year = selectedDate.getFullYear(),
      month = selectedDate.getMonth() + 1,
      day = selectedDate.getDate(),
      hours = selectedDate.getHours(),
      minutes = selectedDate.getMinutes();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':00';
  }

  async function onSubmit() {
    setIsLoading(true);
    setCaptures([]);
    setSelectedCapture();
    let dateTime = convertDateToTimezoneSpecificString(selectedDate);
    Api.getTrafficImageCaptures(dateTime)
      .then((captures) => {
        setCaptures(captures);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className='App'>
      <Grid container>
        <Grid item xs={5}>
          <DateTimeInput
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '20px' }}
            onClick={onSubmit}
          >
            Enter
          </Button>
        </Grid>
      </Grid>
      {selectedCapture &&
      selectedCapture.hasOwnProperty('locationName') &&
      selectedCapture.hasOwnProperty('weatherInfo') ? (
        <Typography variant='h5' style={{ marginTop: '5px' }}>
          {selectedCapture.locationName}
        </Typography>
      ) : (
        <Typography
          variant='h5'
          style={{ marginTop: '5px', visibility: 'hidden' }}
        >
          placeholder
        </Typography>
      )}
      <Grid container style={{ marginTop: '10px' }} justify='space-around'>
        <Grid item xs={6}>
          {captures.length > 0 ? (
            <LocationList
              captures={captures}
              setSelectedCapture={setSelectedCapture}
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={6}>
          {selectedCapture && selectedCapture.hasOwnProperty('weatherInfo') ? (
            <WeatherInfoCard selectedCapture={selectedCapture} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {selectedCapture &&
          selectedCapture.hasOwnProperty('image') &&
          selectedCapture.hasOwnProperty('weatherInfo') ? (
            <TrafficCamShotCard selectedCapture={selectedCapture} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}

export default App;
