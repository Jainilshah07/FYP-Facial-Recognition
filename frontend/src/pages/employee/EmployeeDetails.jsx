import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { EditModal } from './EditModal';

const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of entries to display per page
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/get_employee_details');
        setEmployeeData(Object.values(response.data));
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
    navigate(`/employee-details/`+id)
  };

  const handleDelete = (id) => {
    <EditModal />
    console.log("handleDelete Clicked");
    setIsEditModalOpen(true);
    // navigate(`/get_employee_details/${id}`)
  };
  const handleClose = () => {
    setIsEditModalOpen(false);
    // setEmployeeData(null);
  };

  const downloadTable = () => {
    // Implement logic to download the table attendance
    console.log("Downloading table attendance...");
  };
  const handleAdd = () => {
    navigate('/add-employee');
  }

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">Employee Details</h1>
      <button onClick={handleAdd} className='p-2 bo bg-blue-gray-200 border-black'>Add Employee</button>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>    
            <TableBody>
              {Object.keys(employeeData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employeeId, index) => (
                <TableRow key={index}>
                  <TableCell>{employeeId}</TableCell>
                  <TableCell>{employeeData[employeeId].Name}</TableCell>
                  <TableCell>{employeeData[employeeId].Department}</TableCell>
                  <TableCell><img src={employeeData[employeeId].imgUrl} alt='' height='30px' width='60px' /></TableCell>
                  <TableCell>{employeeData[employeeId].Email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(employeeId)} color="primary">
                      <EditIcon />
                    </IconButton>
                    {isEditModalOpen && <EditModal isOpen={isEditModalOpen} handleClose={handleClose}/>}

                    <IconButton onClick={() => handleDelete(employeeId)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 25, 50]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={downloadTable} variant="contained" color="primary">Download Details</Button>
      </Paper>
    </div>
  );
};

export default EmployeeDetails;
