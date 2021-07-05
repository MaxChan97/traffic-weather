import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function WeatherInfoCard({ selectedCapture }) {
  const weatherInfo = selectedCapture.weatherInfo;

  return (
    <Card classes={{ root: { width: '100%' } }}>
      <CardContent>
        <Typography variant='h6' component='h2'>
          Weather Information
        </Typography>
        <Typography color='textSecondary'>{weatherInfo}</Typography>
      </CardContent>
    </Card>
  );
}
