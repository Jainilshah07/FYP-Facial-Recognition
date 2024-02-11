import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function EditModal({ isOpen, handleClose }) {

    const {id} = useParams()
    const [employee, setEmployee] = useState({
        Name: "",
        Email: "",
        Department: "",
      });
      const navigate = useNavigate();

      useEffect(()=> {
        axios.get(`/get_employee_details/`+id)
        .then(result => {
            setEmployee({
                ...employee,
                Name: result.data.Result[0].Name,
                Email: result.data.Result[0].Email,
                Department: result.data.Result[0].Department,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('/get_employee_details/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/employee_details')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <>
      <Dialog open={isOpen} handler={handleClose}>
      <div className="p-6 my-2 rounded m-auto w-96 border border-gray-300">
    <h3 className="text-lg font-semibold mb-4 text-center">Edit Employee</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="inputName" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="inputName"
          className="mt-1 py-2 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter Name"
          value={employee.Name}
          onChange={(e) => setEmployee({ ...employee, Name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="inputEmail" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="inputEmail"
          className="mt-1 py-2 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter Email"
          autoComplete="off"
          value={employee.Email}
          onChange={(e) => setEmployee({ ...employee, Email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="inputDepartment" className="block text-sm font-medium text-gray-700">Department</label>
        <input
          type="text"
          id="inputDepartment"
          className="mt-1 py-2 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter Department"
          autoComplete="off"
          value={employee.Department}
          onChange={(e) => setEmployee({ ...employee, Department: e.target.value })}
        />
      </div>
      <div className="flex justify-center">
        {/* <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Employee
        </button> */}
        <Button variant="text" color="red" onClick={handleClose} className="mr-1">
          <span>Edit Employee</span>
        </Button>
      </div>
    </form>
  </div>
  
    </Dialog>
    </>
  );
}