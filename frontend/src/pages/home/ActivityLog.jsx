import React, { useEffect, useState } from 'react'


const ActivityLog = () => {
  const handleSubmit = () => {

  }
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    fetch('/get_attendance')
      .then(response => response.json())
      .then(data => {
        // Convert the data object to an array
        const attendanceArray = Object.entries(data).map(([id, attendanceDetails]) => ({
          id,
          ...attendanceDetails,
        }));

        // Sort the attendance array by date and time in descending order
        const sortedData = attendanceArray.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.Time_In}`);
          const dateB = new Date(`${b.date} ${b.Time_In}`);
          return dateB - dateA;
        });

        // Get the latest 3 entries
        const latestEntries = sortedData.slice(0, 3);

        setActivityLog(latestEntries);
      })
      .catch(error => console.error('Error fetching attendance data:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };


  return (
    <div>
      <p className='text-2xl font-semibold my-8'>
        <button type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit}>Sign Out</button>
      </p>
      {/* <Button variant="contained">Sign Out</Button> */}
      <p className='text-xl mt-16 font-semibold'>Activity Log</p>
      {/* Data will be fetched and mapped in bullet points latest 15 data listed */}
      <div className="text-left ml-2 my-2">
      <ul>
        {activityLog.map((entry, index) =>  (
          <li key={index}>
             &#8226; {entry.name} Entered at {entry.Time_In} on {formatDate(entry.date)}
          </li>
        ))}
      </ul>
    </div>


    </div>
  )
}

export default ActivityLog