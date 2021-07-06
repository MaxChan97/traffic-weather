import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import * as dayjs from 'dayjs';

export default function LocationList({
  captures,
  setSelectedCapture,
  captureTimestamp,
}) {
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
        className='datagrid'
        rows={captures}
        columns={columns}
        pageSize={5}
        isRowSelectable={(params) => true}
        hideFooterSelectedRowCount={true}
        onRowClick={(param, event) => {
          setSelectedCapture(param.row);
        }}
      />
    </div>
  );
}
