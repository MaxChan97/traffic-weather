import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function WeatherInfoCard({ selectedCapture }) {
  const weatherInfo = selectedCapture.weatherInfo;

  return (
    <Card style={{ width: '80%', margin: 'auto' }} variant='outlined'>
      <CardContent>
        <Typography variant='h6' component='h2'>
          Weather Information
        </Typography>
        <Typography color='textSecondary'>{weatherInfo}</Typography>
      </CardContent>
    </Card>
  );
}
