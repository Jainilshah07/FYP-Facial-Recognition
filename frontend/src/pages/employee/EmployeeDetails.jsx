import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of entries to display per page
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/get_employee_details');
      setEmployeeData(response.data);
      console.log(employeeData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    setEditingEmployeeId(id);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingEmployeeId('');
  };

  const handleEditEmployee = async (updatedEmployeeData) => {
    try {
      // console.log(updatedEmployeeData);
      updatedEmployeeData.id = editingEmployeeId;
      await axios.put(`/get_employee_details`, updatedEmployeeData);
      fetchData(); // Refetch data after editing
      handleEditModalClose();
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/get_employee_details/${id}`);
      console.log("Delete");
      fetchData(); // Refetch data after editing
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteEmployeeId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (deleteEmployeeId) {
      handleDelete(deleteEmployeeId);
      setOpenDeleteDialog(false);
    }
  };

  const downloadTable = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/download_employee_details');
        console.log("Download api hit");
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  };
  const handleAdd = () => {
    navigate('/add-employee');
  }

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">Employee Details</h1>
      <button onClick={handleAdd} className='p-2 my-2 bg-blue-gray-200 border-black'>Add Employee</button>
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
                  <TableCell>{employeeData[employeeId].id}</TableCell>
                  <TableCell>{employeeData[employeeId].Name}</TableCell>
                  <TableCell><img className='rounded-full' src={employeeData[employeeId].imgUrl} alt='' height='30px' width='60px' /></TableCell>
                  <TableCell>{employeeData[employeeId].Department}</TableCell>
                  <TableCell>{employeeData[employeeId].Email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(employeeData[employeeId].id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    {isEditModalOpen && < Modal 
                        isOpen={isEditModalOpen}
                        employee={editingEmployeeId}
                        handleEdit={handleEditEmployee}
                        handleClose={handleEditModalClose}
                      />
                    }
                    {/* <IconButton onClick={() => handleDelete(employeeData[employeeId].id)} color="secondary">
                      <DeleteIcon />
                    </IconButton> */}
                    <IconButton onClick={() => handleDeleteConfirmation(employeeData[employeeId].id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={downloadTable} variant="contained" color="primary">Download Details</Button>
      </Paper>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this employee?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeDetails;
