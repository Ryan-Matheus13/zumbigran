import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({rows, columns}) {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </>
  );
}