import React from 'react'
// import {db} from '../../firebase.js'
// import {collection, addDoc, Timestamp} from 'firebase/firestore'
// import { dataref } from "./firebase"

const ActivityLog = () => {
  const handleSubmit = () => {
    // db.ref("user").set({
    //   name:"JJ",
    //   title:"This is the title",
    // }).catch(alert)
  }
  return (
    <div>
        <p className='text-2xl font-semibold my-8'>
          <button type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit}>Sign Out</button>
        </p>
        {/* <Button variant="contained">Sign Out</Button> */}
        <p className='text-xl mt-16 font-semibold'>Activity Log</p>
        {/* Data will be fetched and mapped in bullet points latest 15 data listed */}
        <div className='text-left ml-2 my-2'>
        <li>Unknown-1 Entered at 10.30 am in Parking Area</li>
        <li>Rajesh Entered at 9.15 am</li>
        <li>Niyati Entered at 9.15 am in Security Lab</li>
        </div>
        
        
    </div>
  )
}

export default ActivityLog