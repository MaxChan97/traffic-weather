import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '100%',
    width: '100%',
  },
}));

export default function TrafficCamShotCard({ selectedCapture }) {
  const classes = useStyles();
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
            alt='Traffic Camera Image'
          />
        </CardMedia>
      </CardContent>
    </Card>
  );
}
