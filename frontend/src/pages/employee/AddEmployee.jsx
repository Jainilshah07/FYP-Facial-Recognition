import React, { useState } from 'react'
import { imgDb,txtDb } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../home/Sidebar';
// https://github.com/AkajithAk/ReactUiYt/blob/main/src/StoreImageTextFirebase/StoreImageTextFirebase.js
const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        Name: "",
        Email: "",
        Department: "",
    });
    const [img,setImg] = useState('');
    const navigate = useNavigate();
    // const [data,setData] = useState([]);

    const handleUpload = (e) =>{
        // console.log(e.target.files[0]);
        const imgs = ref(imgDb,`Imgs/${employee.Name}`)
        uploadBytes(imgs,e.target.files[0]).then(data=>{
            console.log(data,"imgs")
            getDownloadURL(data.ref).then(val=>{
                setImg(val)
            })
        })
    }
    
    const handleClick = async () =>{
            // const valRef = collection(txtDb,'attendance')
            const docName = `Emp_${employee.Name.replace(/\s+/g, '_')}`; // Replace spaces with underscores
            await setDoc(doc(txtDb, "employee_details", docName), {
                Name:employee.Name, 
                Email:employee.Email,
                Department:employee.Department,
                imgUrl:img
              });
            // await addDoc(valRef,{Name:employee.Name, Email:employee.Email, Department:employee.Department,imgUrl:img}, docName)
            alert("Employee added successfully");
            navigate('/employee-details');
            setImg('');
    }

    return(
        <div>
          <div className='grid grid-cols-5 h-screen'>
            <div className="col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-4 border-black border-2">
              <p className='text-2xl font-semibold text-left my-4'><span className='mx-8 text-lg'>LOGO</span>Company Dashboard</p>
              <div className='border-t-2 my-2 border-black'>
                <div className="flex justify-center items-center mt-3">
                  <div className="p-3 rounded w-3/4 border">
                      <h3 className="text-center text-3xl font-bold my-4">Add Employee</h3>
                        <div className='col-span-2 my-3'>
            <label htmlFor="inputName" className="col-span-1 text-left text-lg font-semibold mx-2 my-2">
              ID:
            </label>
            <input
              type="text"
              className="col-span-1 form-input px-2  rounded"
              id="inputId"
              placeholder="Enter ID"
              onChange={(e) =>
                setEmployee({ ...employee, id: e.target.value })
              }
            />
                        </div>
                        <div className='col-span-2 my-3'>
            <label htmlFor="inputName" className="col-span-1 text-left text-lg font-semibold mx-2 my-2">
              Name:
            </label>
            <input
              type="text"
              className="col-span-1 form-input px-2  rounded"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, Name: e.target.value })
              }
            />
                        </div>
                        <div className='col-span-2 my-3'>
            <label htmlFor="inputEmail" className="col-span-1 text-left text-lg font-semibold mx-2 my-2">
              Email: 
            </label>
            <input
              type="email"
              className="form-input px-2  rounded"
              id="inputEmail4"
              placeholder="Enter Email"
              onChange={(e) =>
                setEmployee({ ...employee, Email: e.target.value })
              }
            />
                        </div>
                        <div className='col-span-2 my-3'>
            <label htmlFor="inputDepartment" className="col-span-1 text-left text-lg font-semibold mx-2 my-2">
              Department:
            </label>
            <input
              type="text"
              className="form-input px-2  rounded"
              id="Department"
              placeholder="Enter Department"
              onChange={(e) =>
                setEmployee({ ...employee, Department: e.target.value })
              }
            />
                        </div>
                        <div className="mb-3 col-span-2 my-4">
            <label className="col-span-1 text-lg font-semibold mx-2 my-2" htmlFor="inputFile">
              Select Image:
            </label>
            <input type="file" onChange={(e) => handleUpload(e)} />
                        </div>
                        <div className='col-span-2 my-4'>
                        <button onClick={handleClick} className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Employee</button>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
export default AddEmployee;


    // const getData = async () =>{
    //     const valRef = collection(txtDB,'txtData')
    //     const dataDb = await getDocs(valRef)
    //     const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
    //     setData(allData)
    //     console.log(dataDb)
    // }

//     useEffect(()=>{
//         getData()
// })
    // console.log(data,"datadata")