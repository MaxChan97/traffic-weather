import React, { useState } from 'react';
import './App.css';
import * as dayjs from 'dayjs';
import Api from './helpers/Api';
import { Grid, Button } from '@material-ui/core';
import DateTimeInput from './components/DateTimeInput';

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

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

  function onSubmit() {
    let dateTime = convertDateToTimezoneSpecificString(selectedDate);
    Api.getTrafficImageCaptures(dateTime)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // send an alert
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
    </div>
  );
}

export default App;
