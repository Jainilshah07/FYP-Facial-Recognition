import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box,Grid,Typography,Button,
  Paper,
  CardActions,
  CardContent,
  MenuItem,
  TextField,
  IconButton,
  Stack,
 } from "@mui/material";
//  import { Delete, Edit, Search } from "@mui/icons-material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  // const columns = [
  //   { field: "id", headerName: "SI", flex: 0.5 },
  //   {
  //     field: "organization",
  //     headerName: "Organization",
  //     flex: 1,
  //   },
  //   {
  //     field: "businessunit",
  //     headerName: "Business Unit",
  //     flex: 1.5,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "location",
  //     headerName: "Location",
  //     flex: 1,
  //   },
  //   {
  //     field: "created_by",
  //     headerName: "Created By",
  //     flex: 1,
  //   },
  //   {
  //     field: "created_on",
  //     headerName: "Created On",
  //     flex: 1,
  //   },
  //   {
  //     field: "updated_by",
  //     headerName: "Updated By",
  //     flex: 1,
  //   },
  //   {
  //     field: "updated_on",
  //     headerName: "Updated On",
  //     flex: 1,
  //   },
  // ];

  return (
    <Box m="0px 16px">
    <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          <b>Dashboard</b>
        </Typography>
      </Grid>
    </Box>
  );
};

export default Dashboard;
