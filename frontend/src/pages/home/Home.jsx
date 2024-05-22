import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import Analytics from './Analytics'
import ActivityLog from './ActivityLog'

const Home = () => {
  const [sidebarWidth, setSidebarWidth] = useState('');

  useEffect(() => {
    const gridContainer = document.querySelector('.grid');
    const gridCols = getComputedStyle(gridContainer).gridTemplateColumns.split(' ');
    const sidebarColWidth = gridCols[0];
    setSidebarWidth(sidebarColWidth);
  }, []);
  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className="col-span-1 border-black border-2">
        <Sidebar sidebarWidth={sidebarWidth} />
      </div>
      <div className="col-span-3 border-black border-2">
        <p className='text-2xl font-semibold text-left my-4'><span className='mx-8 text-lg'>LOGO</span>Company Dashboard</p>
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