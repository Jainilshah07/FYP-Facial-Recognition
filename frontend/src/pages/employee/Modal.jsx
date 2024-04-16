import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel} from '@material-ui/core';
import axios from 'axios' 
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const Modal = ({isOpen, handleClose, handleEdit, employee}) => {
//   const classes = useStyles();
const [updatedEmployee, setUpdatedEmployee] = useState({
  Name: '',
  Email: '',
  Department: '',
  imgUrl: ''
});
useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`get_specific_employee/${employee}`);
  //     // setUpdatedEmployee(response.data[0]);
  //     setUpdatedEmployee(Object.values(response.data));
  //     console.log(Object.values(response.data));
  //   } catch (error) {
  //     console.error('Error fetching employee data:', error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get(`get_specific_employee/${employee}`);
      // console.log(response);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUpdatedEmployee(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  fetchData();
}, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(updatedEmployee);
    console.log(updatedEmployee);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Dialog open={isOpen} handler={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Employee Details</DialogTitle>
        <DialogContent>
        <InputLabel htmlFor="name">Name:</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Name"
            type="text"
            fullWidth
            value={updatedEmployee.Name}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="email">Email Address:</InputLabel>
          <TextField
            margin="dense"
            id="email"
            name="Email"
            type="email"
            fullWidth
            value={updatedEmployee.Email}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="department">Department:</InputLabel>
          <TextField
            margin="dense"
            id="Department"
            type="text"
            name="Department"
            fullWidth
            value={updatedEmployee.Department}
            onChange={handleInputChange}
          />
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
          />
          {updatedEmployee.imgUrl && 
      <div style={{ marginTop: '10px', textAlign: 'center'  }}>
        <img src={updatedEmployee.imgUrl} className='mx-24' style={{ maxWidth: '100%', maxHeight: '200px', height: 'auto'  }} alt="Employee" />
      </div>
    }
          <label htmlFor="image-upload" style={{ marginTop: '10px', display: 'block', textAlign: 'center'  }}>
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {/* {updatedEmployee.imgUrl && <span>{updatedEmployee.imgUrl}</span>} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
