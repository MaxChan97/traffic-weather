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
  const [captureTimestamp, setCaptureTimestamp] = useState();
  const [selectedCapture, setSelectedCapture] = useState();

  useEffect(() => {
    if (selectedCapture && !selectedCapture.hasOwnProperty('weatherInfo')) {
      setIsLoading(true);
      let dateTime = convertDateToTimezoneSpecificString(selectedDate);
      Api.getTwoHourWeatherForecasts(
        dateTime,
        selectedCapture.location.latitude,
        selectedCapture.location.longitude
      )
        .then((weatherInfo) => {
          setSelectedCapture({ ...selectedCapture, weatherInfo: weatherInfo });
        })
        .finally(() => {
          setIsLoading(false);
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
      .then((data) => {
        setCaptures(data.captures);
        setCaptureTimestamp(data.timestamp);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '18px',
      }}
    >
      <Grid style={{ width: '80%' }}>
        <Grid container>
          <Grid item xs={12} md={3} container justify='flex-start'>
            <DateTimeInput
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={1} container justify='flex-end'>
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '18px', height: '38px', width: '100%' }}
              onClick={onSubmit}
            >
              Enter
            </Button>
          </Grid>
        </Grid>
        {selectedCapture &&
        selectedCapture.hasOwnProperty('locationName') &&
        selectedCapture.hasOwnProperty('weatherInfo') &&
        selectedCapture.hasOwnProperty('timestamp') ? (
          <Typography variant='h5' style={{ marginTop: '18px' }}>
            {`${selectedCapture.locationName} at ${dayjs(
              selectedCapture.timestamp
            ).format('D MMM YYYY H:mm')}`}
          </Typography>
        ) : (
          <Typography
            variant='h5'
            style={{ marginTop: '18px', visibility: 'hidden' }}
          >
            placeholder
          </Typography>
        )}
        <Grid container>
          <Grid item xs={12} md={6} style={{ paddingTop: '18px' }}>
            {captures.length > 0 && captureTimestamp ? (
              <LocationList
                captures={captures}
                setSelectedCapture={setSelectedCapture}
                captureTimestamp={captureTimestamp}
              />
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingTop: '18px' }}>
            {selectedCapture &&
            selectedCapture.hasOwnProperty('weatherInfo') ? (
              <WeatherInfoCard selectedCapture={selectedCapture} />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
        <Grid container style={{ paddingTop: '18px' }}>
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
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}

export default App;
