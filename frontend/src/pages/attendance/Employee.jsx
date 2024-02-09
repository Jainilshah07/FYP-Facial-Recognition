// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase";


const Employee = () => {
  // const firestore = getFirestore(db);
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: 'Email', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'timeIn', headerName: 'Time in', width: 130 },
    { field: 'timeOut', headerName: 'Time out', width: 130 },
    // {
    //   field: 'phone',
    //   headerName: 'Mobile Number',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  const getAttendanceData = async () => {
    try {
      const response = await axios.get('/get_attendance');
      // Handle successful response
      const attendanceData = response.data;
      console.log(attendanceData); // Access the attendance data
      // Use the attendance data in your React component
  } catch (error) {
      console.error('Error fetching attendance data:', error);
  }
};

//   useEffect(() => {
    
//   const handleDelete = (id) => {
//     axios.delete('http://localhost:3000/auth/delete_employee/'+id)
//     .then(result => {
//         if(result.data.Status) {
//             window.location.reload()
//         } else {
//             alert(result.data.Error)
//         }
//     })
//   } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      {/* <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link> */}
      <button onClick={getAttendanceData} > Get Data</button>
      {/* <div className="mt-3">
      <DataGrid
        //   rows={}
          columns={columns}
        //   onPageSizeChange={handlePageSize}
        //   pageSize={tableOptions.pageSize}
        //   paginationMode="server"
        //   onPageChange={handlePageChange}
        //   rowCount={pages}
        //   sortingMode="server"
        //   onSortModelChange={handleSort}
        //   localeText={{
        //     noRowsLabel: 'No results found',
        //     noResultsOverlayLabel: accessPermissions.canView
        //       ? "No results found."
            //   : "No View Access",
        //   }}
        />
      </div> */}
    </div>
  );
};

export default Employee;
//   const getDocument = async () => {
//     const ref = doc(firestore, "attendance", "EMP001");
//     const snap = await getDoc(ref);

//     if (snap.exists()) {
//         console.log("Document data:", snap.data());
//     } else {
//       // docSnap.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   }