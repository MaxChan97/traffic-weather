import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import * as dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  row: {
    width: 'auto !important',
    cursor: 'pointer !important',
  },
});

export default function LocationList({
  captures,
  setSelectedCapture,
  captureTimestamp,
}) {
  const classes = useStyles();

  const columns = [
    {
      field: 'locationName',
      headerName: `Locations (as of ${dayjs(captureTimestamp).format(
        'D MMM YYYY H:mm'
      )})`,
      width: '100%',
    },
  ];

  return (
    <div style={{ height: 370, width: '100%' }}>
      <DataGrid
        rows={captures}
        columns={columns}
        pageSize={5}
        isRowSelectable={(params) => true}
        hideFooterSelectedRowCount={true}
        onRowClick={(param, event) => {
          setSelectedCapture(param.row);
        }}
        classes={{
          row: classes.row,
        }}
      />
    </div>
  );
}
