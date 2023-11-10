/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box, Grid, Typography, Button,
  Paper,
  CardActions,
  CardContent,
  MenuItem,
  TextField,
  IconButton,
  Stack,
  Select,
} from "@mui/material";
import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InputBase from "@mui/material/InputBase";
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
// import { getDropDownData, downloadEmployeeDatas, getEmployeeData, toggledata } from "./services";
// import { EDIT, ERROR, ERROR_MESSAGE, ORG, EMPTY_DOWNLOAD, ORG_EMPLOYEE_MASTER, WARNING, SUCCESS, USER_ROLES, VIEW, CREATE } from "../../common/constants";
// import { useSnackbar } from '../../Context/Snackbar/SnackbarContext';
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { getLocalStorageItem } from "../../Store";
import { useLayoutEffect } from "react";
// import CsvDownloader from "react-csv-downloader";
// import { downloadEmployeeDataHelper } from "./Helper";
// import { downloadExcel } from "../../common/Services/downloadExcel";
import dayjs from "dayjs";
import { green } from "@mui/material/colors";


const EmployeeMaster = () => {
  const generateRandomData = () => {
    // Generate random data for two rows
    const randomData = [
      {
        id: 1,
        employeeName: 'John Doe',
        employeeCode: 'EMP001',
        roleName: 'Manager',
        emailId: 'john.doe@example.com',
        createdBy: 'Admin',
        createdOn: '2023-11-01',
        modifiedBy: 'Admin',
        modifiedOn: '2023-11-01',
        active: 'Y',
        employeeId: 1,
      },
      {
        id: 2,
        employeeName: 'Jane Smith',
        employeeCode: 'EMP002',
        roleName: 'Employee',
        emailId: 'jane.smith@example.com',
        createdBy: 'Admin',
        createdOn: '2023-11-01',
        modifiedBy: 'Admin',
        modifiedOn: '2023-11-01',
        active: 'N',
        employeeId: 2,
      },
    ];
  
    return randomData;
  };
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // employee data
  const [employeeData, setEmployeeData] = useState(generateRandomData());
  const [searchTerm, setSearchTerm] = useState("")
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [pages, setPages] = useState(Number(searchParams.get("pages") || 1));
  const [isDownloading, setIsDownloading] = useState(false);
  // const snackbar = useSnackbar()

  const [accessPermissions, setAccessPermissions] = useState({
    canView: false,
    canEdit: false,
    canCreate: false,
  });

  const [tableOptions, setTableOptions] = useState({
    searchText: "",
    pageSize: 25,
    pageNo: 0,
    sortBy: "",
    sort: "",
    isActive: "active"
  })
  const [actInactToggle, setActInactToggle] = useState(true);


  // useEffect(() => {
  //   // (async function () {
  //   //   const response = await getEmployeeData(tableOptions);
  //   //   if (response?.data?.payLoad) {
  //   //     const si = tableOptions.pageNo * tableOptions.pageSize;
  //   //     const newData = response?.data?.payLoad.employee.map((data, index) => ({
  //   //       ...data,
  //   //       id: index + si + 1,
  //   //       // canEdit: hasEditAccess(),
  //   //     }));
  //   // const newData = []
  //       setEmployeeData(newData);
  //       // setPages(response?.data?.payLoad?.recordCount);
  //       setLoading(false);

  //      }
  //       // else {
  //     //   // snackbar(response?.data?.errorMessage, ERROR);
  //     // }
  //   })();
  // }, []);
  // created, updated, tableOptions, actInactToggle

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (tableOptions.searchText !== searchTerm) {
  //       setLoading(true);
  //       setTableOptions(prev => ({ ...prev, searchText: searchTerm, page: 0 }))
  //     }
  //   }, 1200)

  //   return () => {
  //     clearTimeout(delayDebounceFn)
  //   }
  // }, [searchTerm])

  // useLayoutEffect(() => {
  //   const userRoles = getLocalStorageItem(USER_ROLES);
  //   if (userRoles[ORG_EMPLOYEE_MASTER]) {
  //     setAccessPermissions({
  //       ...accessPermissions,
  //       canView: userRoles[ORG_EMPLOYEE_MASTER].includes(VIEW),
  //       canEdit: userRoles[ORG_EMPLOYEE_MASTER].includes(EDIT),
  //       canCreate: userRoles[ORG_EMPLOYEE_MASTER].includes(CREATE),
  //     })
  //   }
  // }, [])

  // To edit and update the fields 
  const handleEditted = (employeeId) => {
    // console.log("handleId", id);
    // navigate("../newemployee", { state : { id } })
    // navigate(`../employee/id/${employeeId}`)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setLoading(true);
    setTableOptions({ ...tableOptions, searchText: searchValue });
  };


  const handlePageSize = (pageSize) => {
    // console.log(pageSize);
    setTableOptions({ ...tableOptions, pageSize: pageSize });
  };

  const handlePageChange = (pageChange) => {
    // console.log(pageChange);
    setLoading(true);
    setTableOptions({ ...tableOptions, pageNo: pageChange });
  };

  const handleSort = (model, details) => {
    // console.log("Sorting:", model, details);
    if (model[0]?.field === "id") { }
    else if (model[0]?.field === "action") { }
    else {
      setLoading(true);
      setTableOptions({
        ...tableOptions,
        sortBy: model[0]?.field || "",
        sort: model[0]?.sort || "",
      });
    }
  };

  const newEmployee = () => {
    // navigate("../newemployee")
  }

  const handleAcInact = async (switchValue, employeeId) => {
    // try {
    //   let res = await toggledata(switchValue, employeeId);
    //   if (res.data.status === 200 || res.data.status === 201) {
    //     snackbar(res?.data?.message, SUCCESS);
    //     setActInactToggle(!actInactToggle)
    //   } else {
    //     setLoading(false);
    //     snackbar(res?.data?.errorMessage, ERROR);
    //   }
    // } catch (err) {
    //   // console.log(err);
    //   snackbar(err, ERROR);
    // }
  }

  useLayoutEffect(() => {
    // setLoading(true);
  }, [tableOptions, actInactToggle])

  const handleSwitch = (e) => {
    setTableOptions({ ...tableOptions, isActive: e.target.value })
  }

  // Download reports
  const handleDownload = async () => {
    // try {
    //   setIsDownloading(true);
    //   const result = await downloadEmployeeDatas({
    //     searchText: tableOptions.searchText,
    //     sortBy: tableOptions.sortBy,
    //     sort: tableOptions.sort,
    //   });
    //   if (result.status === 200 || result.status === 201) {
    //     const employeeList = result.data.payLoad;

    //     if (employeeList.length === 0) {
    //       snackbar(EMPTY_DOWNLOAD, WARNING);
    //       return;
    //     }

    //     const employeeData = downloadEmployeeDataHelper(employeeList, tableOptions);
    //     downloadExcel(employeeData, `Employee_Data_${dayjs().format('DD-MMM-YYYY')}`);
    //   } else {
    //     console.log('error in downloading data');
    //     snackbar(result.errorMessage, ERROR);
    //   }
    // } catch (error) {
    //   console.log("error while downloading", error);
    //   setIsDownloading(false);
    // }
  };

  const columns = [
    { field: "id", headerName: "SI", flex: 0.5, sortable: false, disableColumnMenu: true },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      flex: 0.6,
      renderCell: ({ row }) => {
        return (
          <Box
            m="auto"
            display="flex"
            justifyContent="center"
            sx={{
              cursor: 'pointer',
              color: '#4ED192'
            }}
            onClick={() => handleEditted(row.employeeId)}
          >
            {accessPermissions.canEdit ? <Edit /> : <Visibility />}
          </Box>
        );
      },
    },
    {
      field: "employeeName",
      headerName: "Name",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1.2,
    },
    {
      field: "employeeCode",
      headerName: "Employee ID",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "roleName",
      headerName: "Role",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "emailId",
      headerName: "Email",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "modifiedBy",
      headerName: "Updated By",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "modifiedOn",
      headerName: "Updated On",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 0.9,
    },
    {
      field: "active",
      headerName: "Active/Inactive",
      disableColumnMenu: true,
      minWidth: 100,
      sortable: false,
      renderCell: ({ row: { isActive, employeeId } }) => {
        return (
          <Box
            m="auto"
            display="flex"
            justifyContent="center">
            <Switch size="small" color="secondary"
              disabled={!accessPermissions.canEdit}

              checked={isActive === "Y" ? true : false}
              onChange={(e) => {
                e.preventDefault();
                handleAcInact(e.target.checked, employeeId);
              }}
            />
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="0px 16px">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          <b>Attendance</b>
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box display="flex" sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSearch}>
              <Box display="flex"
                sx={{
                  backgroundColor: green,
                  borderRadius: '3px',
                  maxWidth: '260px',
                  mb: 1,
                }} >
                <InputBase
                  sx={{
                    maxWidth: '260px',
                    pl: 1,
                    borderRadius: '3px',
                    backgroundColor: green
                  }}
                  placeholder="Search"
                  name="search"
                  // onChange={handleSearchEmpty}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <IconButton type="Button" sx={{ p: 1, borderRadius: '3px' }}>
                  <Search />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} sx={{ textAlign: 'right' }}>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} sx={{ textAlign: 'right' }}>
          <CardActions sx={{ justifyContent: "flex-end", mt: 1, p: 0 }}>
            <Button sx={{ mr: 1 }}
              variant="outlined"
              // endIcon={<FileDownloadOutlinedIcon />}
              onClick={() => handleDownload()}
            >
              Download
            </Button>
            <Button
              onClick={newEmployee}
              disabled={!accessPermissions.canCreate}
              variant="contained"
              sx={{ backgroundColor: '#11bf7f' }}>New Employee</Button>
          </CardActions>
        </Grid>
      </Grid>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: green,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: green,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: green,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: green,
          },
          "& .MuiCheckbox-root": {
            color: `${green} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${green} !important`,
          },
        }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={{ position: 'relative', right: 0, mb: 1, ml: 0.25, borderBottom: 0 }}>
            <FormControl sx={{ mb: 0.5, minWidth: 120 }}>
              <Select size="small"
                onChange={handleSwitch}
                defaultValue="active"
                InputProps={{
                  style: {
                    height: '10px'
                  }
                }}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="all">Active/ Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <DataGrid
          rows={employeeData}
          columns={columns}
          // loading={loading}
          // components={{ Toolbar: GridToolbar }}
          onPageSizeChange={handlePageSize}
          pageSize={tableOptions.pageSize}
          // page={0}
          paginationMode="server"
          onPageChange={handlePageChange}
          rowCount={pages}
          // handling sorting
          sortingMode="server"
          onSortModelChange={handleSort}
          localeText={{
            noRowsLabel: 'No results found',
            noResultsOverlayLabel: accessPermissions.canView
              ? "No results found."
              : "No View Access",
          }}
        />
      </Box>
    </Box>
  );
};

export default EmployeeMaster;
