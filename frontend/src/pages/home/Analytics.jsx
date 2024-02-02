import React from 'react'
import BarChartJs from './BarChartJs'  
import PieChartJs from './PieChartJs'
import BasicPie from './BasicPie'

const Analytics = () => {
  return (
    <div>
        <div className="grid grid-cols-2 gap-y-1">
            {/* <div className="col-span-1 h-56 border-2 border-black">
                <p className=''>Attendance</p>
            </div> */}
            <div className="col-span-1">
                <p className='mb-4 text-xl font-medium'>Attendance Of Employees</p>
                <BarChartJs />
            </div>
            <div className="col-span-1">
            <p className='mb-4 text-xl font-medium'>Number Of Visitors</p>
                <BarChartJs />
            </div>
            <div className="col-span-1 border-t-2 border-black">
            <p className='mb-4 text-xl font-medium my-2'>Number Of Visitors</p>
                <BasicPie />
            </div>
            <div className="col-span-1 border-t-2 border-black">
            <p className='mb-4 text-xl font-medium my-2'>Number Of Visitors</p>
                <BasicPie />
            </div>
            
        </div>
    </div>
  )
}

export default Analytics