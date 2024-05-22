import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logout from '../../assets/power-off.png'
import adduser from '../../assets/power-off.png'
import employees from '../../assets/business-people.png'
import defaulter from '../../assets/man.png'
import log from '../../assets/log.png'
import attendance from '../../assets/attendance.png'
import dashboard from '../../assets/dashboard.png'
import video from '../../assets/video-processing.png'

const Sidebar = ({ sidebarWidth }) => {
    return (
        <aside
            style={{ width: sidebarWidth }}
            className="fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <div className='mx-auto text-2xl font-bold'>Spider Cloud</div>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={dashboard} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-employee" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={adduser} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Add Employee</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/attendance" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={attendance} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Attendance</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/employee-details" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={employees} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Employee Details</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/defaulter" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={defaulter} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Defaulters</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/videos" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={video} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Video Processing</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={log} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Activity Log</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <img src={logout} alt="logout" className='w-9 h-9' />
                            <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;