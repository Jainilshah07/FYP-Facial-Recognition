import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of entries to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/get_attendance');
        setAttendanceData(Object.values(response.data));
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Edit button clicked for ID:", id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log("Delete button clicked for ID:", id);
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
      <h1 className="text-2xl font-bold mb-2">Attendance Details</h1>
      {/* <button onClick={handleAdd} className='p-2 bo bg-blue-gray-200 border-black'>Add Employee</button> */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Image</TableCell> */}
                <TableCell>Department</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Time In</TableCell>
                <TableCell>Time Out</TableCell>
              </TableRow>
            </TableHead>    
            <TableBody>
              {Object.keys(attendanceData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employeeId, index) => (
                <TableRow key={index}>
                  <TableCell>{employeeId}</TableCell>
                  <TableCell>{attendanceData[employeeId].Name}</TableCell>
                  {/* <TableCell><img src={attendanceData[employeeId].imgUrl} height='30px' width='60px' /></TableCell> */}
                  <TableCell>{attendanceData[employeeId].Department}</TableCell>
                  <TableCell>{attendanceData[employeeId].Email}</TableCell>
                  <TableCell>{attendanceData[employeeId].TimeIn}</TableCell>
                  <TableCell>{attendanceData[employeeId].TimeOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3,5,8]}
          component="div"
          count={attendanceData.length}
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

export default AttendanceDetails;
