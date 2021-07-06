import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

export default function TrafficCamShotCard({ selectedCapture }) {
  const imageUrl = selectedCapture.image;

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h6' component='h2'>
          Traffic Camera Image
        </Typography>
        <CardMedia>
          <img
            style={{ width: '100%' }}
            src={imageUrl}
            alt='Traffic Camera Shot'
          />
        </CardMedia>
      </CardContent>
    </Card>
  );
}
