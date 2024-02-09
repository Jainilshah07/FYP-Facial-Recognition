import React from 'react'
import Sidebar from '../home/Sidebar'
import EmployeeDetails from '../employee/EmployeeDetails'
import AttendanceDetails from './AttendanceDetails'

const Attendance = () => {
  return (
    <div className='grid grid-cols-5 h-screen'>
        <div className="col-span-1 border-black border-2">
            <Sidebar />
        </div>
        <div className="col-span-4 border-black border-2">
        <p className='text-2xl font-semibold text-left my-4'><span className='mx-8 text-lg'>LOGO</span>Company Dashboard</p>
        <div className='border-t-2 my-2 border-black'>
            < AttendanceDetails />
        </div>
        </div>

    </div>
  )
}

export default Attendance