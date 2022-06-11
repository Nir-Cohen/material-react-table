import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link, useTheme } from '@mui/material';
import { PropRow, rootProps } from './rootProps';

const RootPropTable = () => {
  const theme = useTheme();

  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'PropName Name',
          id: 'propName',
          Cell: ({ cell }) =>
            cell.row.original?.required ? (
              <strong style={{ color: theme.palette.primary.dark }}>
                <>{cell.getValue()}*</>
              </strong>
            ) : (
              cell.getValue()
            ),
        },
        { header: 'Required', id: 'required', enableGlobalFilter: false },
        { header: 'Type', id: 'type', enableGlobalFilter: false },
        { header: 'Default', id: 'defaultValue', enableGlobalFilter: false },
        { header: 'Description', id: 'description', enableGlobalFilter: false },
        {
          header: 'More Info Links',
          id: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {' '}
              {cell.row.original?.linkText}{' '}
            </Link>
          ),
        },
        { header: 'Source', id: 'source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<PropRow>[],
    [theme],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={rootProps}
      enableColumnOrdering
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableToolbarBottom={false}
      initialState={{
        columnVisibility: {
          required: false,
        },
        isDensePadding: true,
        showGlobalFilter: true,
        sorting: [
          { id: 'required', desc: true },
          { id: 'propName', desc: false },
        ],
        columnPinning: { left: ['mrt-row-numbers', 'propName'], right: [] },
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search All Props',
        variant: 'outlined',
      }}
      positionGlobalFilter="left"
      rowNumberMode="static"
      tableId="root"
    />
  );
};

export default RootPropTable;
