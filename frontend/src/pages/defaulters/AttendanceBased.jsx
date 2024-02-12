import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AttendanceBased = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of entries to display per page
  const navigate = useNavigate();
  const[defaulter, setDefaulter] = useState("No");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/get_employee_details');
            setEmployeeData(response.data);
            console.log(employeeData);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
    };

    fetchData();
  }, []);

  const calculateDefaulter = (num, days) => {
    return num / days < 0.75 ? "Yes" : "No";
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadTable = () => {
    // Implement logic to download the table attendance
    console.log("Downloading table attendance...");
  };
  const handleAdd = () => {
    navigate('/add');
  }

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl my-4 font-bold">Defaulters Based on Attendance Details</h1>
        <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Defaulter</TableCell>
              </TableRow>
            </TableHead>    
            <TableBody>
              {Object.keys(employeeData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employeeId, index) => {
                const employee = employeeData[employeeId];
    // Calculate defaulter status for the current employee
    const defaulterStatus = calculateDefaulter(employee.attendance_count, employee.days);

    return (
      <TableRow key={index}>
        <TableCell>{employee.id}</TableCell>
        <TableCell>{employee.Name}</TableCell>
        <TableCell><img className='rounded-full' src={employee.imgUrl} alt='' height='30px' width='60px' /></TableCell>
        <TableCell>{employee.Department}</TableCell>
        <TableCell>{employee.Email}</TableCell>
        <TableCell>{defaulterStatus}</TableCell>
      </TableRow>
    );
  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3,5,8]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={downloadTable} variant="contained" color="primary">Download Attendance</Button>
      </Paper>
      
    </div>
  );
};

export default AttendanceBased;
