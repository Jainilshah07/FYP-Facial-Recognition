import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of entries to display per page
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/get_attendance");
        setAttendanceData(Object.values(response.data));
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadTable = () => {
    // Implement logic to download the table attendance
    console.log("Downloading table attendance...");
  };
  const filteredData = attendanceData.filter((item) => {
    const itemDate = new Date(item.date);
    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    } else if (startDate) {
      return itemDate >= startDate;
    } else if (endDate) {
      return itemDate <= endDate;
    }
    return true;
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("/get_attendance");
      setAttendanceData(Object.values(response.data));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">Attendance Details</h1>

      <div className="mb-4 flex flex-col md:flex-row md:items-center">
        <div className="mb-2 md:mb-0 md:mr-4">
          <label className="mr-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="mb-2 md:mb-0 md:mr-4">
          <label className="mr-2">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Apply
        </Button>
      </div>
      {attendanceData.length > 0 ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Employee ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Date</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Time In</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.Time_In}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 8]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button onClick={downloadTable} variant="contained" color="primary">
            Download Attendance
          </Button>
        </Paper>
      ) : (
        <p>Please select a date range to display attendance data.</p>
      )}
    </div>
    // </div>
  );
};

export default AttendanceDetails;
