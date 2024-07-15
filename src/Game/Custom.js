import React, { useState } from "react";
import { Grid, Divider, Pagination } from "@mui/material";
const CustomTable = ({ data }) => {
  console.log("data", data);
  const pageSize = 10;
  const [page, setPage] = useState(1); // Pagination component is 1-based
  const columns = [
    { id: "period", label: "Period" },
    { id: "trxBlockAddress", label: "Block" },
    { id: "blockTime", label: "Block time" },
    { id: "hash", label: "Hash" },
    { id: "big_small", label: "Result" },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
  return (
    <Grid container>
      {columns.map((column) => (
        <Grid
          item
          xs={2.4}
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
      <Divider sx={{ width: "100%", bgcolor: "#384992" }} />
      {paginatedData.map((row) => (
        <React.Fragment key={row._id}>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#FFFFFF",
            }}
          >
            {row.periodId.slice(0, 3) + "**" + row.periodId.slice(-4)}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#FFFFFF",
            }}
          >
            {row.trxBlockAddress}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#FFFFFF",
            }}
          >
            {row.blockTime}
          </Grid>
          <Grid
            item
            xs={2.4}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#FFFFFF",
            }}
          >
            {"** " + row.hash.slice(-4)}{" "}
          </Grid>
          <Grid
            item
            xs={1.2}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background:
                  Array.isArray(row.colorOutcome) &&
                  row.colorOutcome.length === 2
                    ? `linear-gradient(to bottom, ${
                        row.colorOutcome[0] === "red"
                          ? "rgb(253,86,92)"
                          : row.colorOutcome[0] === "green"
                          ? "rgb(64,173,114)"
                          : row.colorOutcome[0]
                      } 50%, ${
                        row.colorOutcome[1] === "red"
                          ? "rgb(253,86,92)"
                          : row.colorOutcome[1] === "green"
                          ? "rgb(64,173,114)"
                          : row.colorOutcome[1]
                      } 50%)`
                    : row.colorOutcome[0] === "red"
                    ? "rgb(253,86,92)"
                    : row.colorOutcome[0] === "green"
                    ? "rgb(64,173,114)"
                    : row.colorOutcome[0],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {row.numberOutcome}
            </div>
          </Grid>
          <Grid
            item
            xs={1.2}
            sx={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "15px",
              color:
                row.sizeOutcome.charAt(0).toUpperCase() === "B"
                  ? "#DD9138"
                  : "#5088D3",
              backgroundColor: "#FFFFFF",
            }}
          >
            {row.sizeOutcome.charAt(0).toUpperCase()}
          </Grid>
        </React.Fragment>
      ))}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination
          count={Math.ceil(data.length / pageSize)}
          page={page}
          onChange={handleChangePage}
          sx={{"& .MuiPaginationItem-root": {
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
            color: "#FFFFFF",
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
          },}}
        />
      </Grid>
    </Grid>
  );
};
export default CustomTable;