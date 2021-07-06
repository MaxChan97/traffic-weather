import React from 'react';
import * as dayjs from 'dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DateTimeInput({ selectedDate, handleDateChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin='normal'
        id='date-picker-dialog'
        label='Date and Time'
        format='d MMM yyyy H:mm'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        disableFuture
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
}
