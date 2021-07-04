import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'locationName', headerName: 'Locations', width: '100%' },
];

export default function LocationList({ captures, setSelectedCapture }) {
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
