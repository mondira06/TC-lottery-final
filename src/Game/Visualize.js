import React, { useState } from 'react';
import { Grid, Divider, Pagination } from '@mui/material';

const CustomTable = ({ data }) => {
  const pageSize = 10;
  const [page, setPage] = useState(0);

  const columns = [
    { id: 'period', label: 'Period' },
    { id: 'number', label: 'Number' },
    { id: 'big_small', label: 'Big/Small' },
    { id: 'color', label: 'Color' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Grid container>
      {columns.map((column) => (
        <Grid
          item
          xs={3}
          key={column.id}
          sx={{
            backgroundColor: '#ED8A1F',
            color: 'white',
            padding: '8px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {column.label}
        </Grid>
      ))}
      <Divider />
      <Grid container direction="row"  justifyContent="space-evenly" backgroundColor="#ffffff">
      {paginatedData.map((row) => (
        <React.Fragment key={row.id}>
          <Grid
            item
            xs={3}
            sx={{
              padding: '8px',
              borderBottom: '1px solid #ccc',
              display: 'flex',

              alignItems: 'center',
              justifyContent: 'left',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {row.periodId.toString().slice(0, -2)}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '8px',
              borderBottom: '1px solid #ccc',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'center',
              background:
                Array.isArray(row.colorOutcome) && row.colorOutcome.length === 2
                  ? `linear-gradient(to bottom, ${row.colorOutcome[0] === 'red' ? 'rgb(253,86,92)' : row.colorOutcome[0] === 'green' ? 'rgb(64,173,114)' : row.colorOutcome[0]} 50%, ${row.colorOutcome[1] === 'red' ? 'rgb(253,86,92)' : row.colorOutcome[1] === 'green' ? 'rgb(64,173,114)' : row.colorOutcome[1]} 50%)`
                  : row.colorOutcome[0] === 'red' ? 'rgb(253,86,92)' : row.colorOutcome[0] === 'green' ? 'rgb(64,173,114)' : row.colorOutcome[0],
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '25px',
            }}
          >
            {row.numberOutcome}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '8px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '17px',
              color: 'black',
            }}
          >
            {row.sizeOutcome}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '8px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Array.isArray(row.colorOutcome) ? (
              row.colorOutcome.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: color === 'red' ? 'rgb(253,86,92)' : color === 'green' ? 'rgb(64,173,114)' : color,
                    marginRight: index < row.colorOutcome.length - 1 ? '5px' : '0',
                  }}
                />
              ))
            ) : (
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: row.colorOutcome,
                }}
              />
            )}
          </Grid>
        </React.Fragment>
      ))}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor:"#ffffff" ,padding: '40px'}}>
        <Pagination 
          count={Math.ceil(data.length / pageSize)}
          page={page}
          onChange={handleChangePage}
          sx={{
         "& .MuiPaginationItem-root": {
    color: "grey",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    color: "grey",
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "#D9AC4F",
    backgroundColor: "#ED8A1F",
  },
  "& .MuiPaginationItem-previousNext": {
    backgroundColor: "#ED8A1F",
    color: "#ffffff",
    padding: "3px",
    width: "auto", // Ensure it doesn't stretch
    height: "auto", // Ensure it doesn't stretch
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiPaginationItem-icon": {
    width: "70px", // Adjust the size to make it square
    height: "40px", // Adjust the size to make it square
  },
          }}
        />
      </Grid>
      </Grid>
    
  );
};

export default CustomTable;