import React from 'react'
import Sidebar from './Sidebar'
import Analytics from './Analytics'
import Logo from '../../assets/Logo.jpg'
import ActivityLog from './ActivityLog'

const Home = () => {
  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className="col-span-1 border-black border-2">
        <Sidebar />
      </div>
      <div className="col-span-3 border-black border-2">
        {/* Company Logo */}
        <p className='text-2xl font-semibold text-left my-8'><span className='mx-8 text-lg'>LOGO</span>Company Dashboard</p>
        <div className='border-t-2 pt-8 border-black'>
          <Analytics />
        </div>
        
      </div>

      <div className="col-span-1 border-black border-2">
        <ActivityLog />
      </div>
      
    </div>
  )
}

export default Home