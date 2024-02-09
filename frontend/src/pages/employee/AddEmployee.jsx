import React, { useState } from 'react'
import { imgDb,txtDb } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
// https://github.com/AkajithAk/ReactUiYt/blob/main/src/StoreImageTextFirebase/StoreImageTextFirebase.js
const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        Name: "",
        Email: "",
        Department: "",
    });
    const [img,setImg] = useState('');
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
    const handleChange = (e, field) => {
        setEmployee({ ...employee, [field]: e.target.value });
    };
    
    const handleClick = async () =>{
            // const valRef = collection(txtDb,'attendance')
            const docName = `Emp_${employee.Name.replace(/\s+/g, '_')}`; // Replace spaces with underscores
            await setDoc(doc(txtDb, "attendance", docName), {
                Name:employee.Name, 
                Email:employee.Email,
                Department:employee.Department,
                imgUrl:img
              });
            // await addDoc(valRef,{Name:employee.Name, Email:employee.Email, Department:employee.Department,imgUrl:img}, docName)
            alert("Employee added successfully")
    }

    return(
        <div>
            <div>
             <label htmlFor="Name"></label>
             <input 
                id="inputName"
                placeholder="Enter Name"
                value={employee.Name}
                onChange={(e) => handleChange(e, "Name")} />
              <br/>
             <label htmlFor="Email"></label>
             <input 
                id="inputEmail"
                placeholder="Enter Email"
                value={employee.Email}
                onChange={(e) => handleChange(e, "Email")} />
              <br/>
              <label htmlFor="Department"></label>
              <input 
                id="inputDepartment"
                placeholder="Enter Department"
                value={employee.Department}
                onChange={(e) => handleChange(e, "Department")} />
              <br/>
             <input type="file" onChange={(e)=>handleUpload(e)} /><br/><br/>
             <button onClick={handleClick}>Add</button>
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