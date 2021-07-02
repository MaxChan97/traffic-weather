import React, { useState } from 'react';
import './App.css';
import * as dayjs from 'dayjs';
import DateTimeInput from './components/DateTimeInput';

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  return (
    <div className='App'>
      <DateTimeInput
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
    </div>
  );
}

export default App;
