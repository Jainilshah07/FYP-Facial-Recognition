import React, { useState, useEffect } from 'react';
import { imgDb, txtDb } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { listAll, getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Updated Firebase Storage imports
import axios from 'axios';

const VideoProcessing = () => {
    const [videos, setVideos] = useState([]);
    const [videoDetails, setVideoDetails] = useState({
        Name: ""
    });
    const[employees, setEmployees] = useState([]);
    const [newVideo, setNewVideo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchVideosFromDatabase();
    }, [videos]);

    const fetchVideosFromDatabase = async () => {
        try {
            const videoRefs = await listAll(ref(imgDb, 'Videos'));
            const videoData = await Promise.all(videoRefs.items.map(async (videoRef) => {
                const videoUrl = await getDownloadURL(videoRef);
                const videoName = videoRef.name;
                return { vidUrl: videoUrl, Name: videoName };
            }));
            setVideos(videoData);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleClick = async () => {
        if (!selectedFile) {
            alert("Please select a video file to upload.");
            return;
        }

        const videos = ref(imgDb, `Videos/${videoDetails.Name}`);
        uploadBytes(videos, selectedFile).then(data => {
            getDownloadURL(data.ref).then(val => {
                setNewVideo(val);
                const docName = `Vid_${videoDetails.Name.replace(/\s+/g, '_')}`;
                setDoc(doc(txtDb, "Videos", docName), {
                    Name: videoDetails.Name,
                    vidUrl: val
                });
                alert("Video added successfully");
                setSelectedFile(null); // Reset the selectedFile state
                setVideoDetails({ Name: "" })
            });
        }).catch(error => {
            console.error('Error uploading video:', error);
            alert('Error uploading video. Please try again.');
        });
    }

    const handleProcess = async (name) => {
        try {
            const response = await axios.get(`/process_vid/${name}`);
            setEmployees(response.data);
            console.log(response.data); // Log the response data
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold my-4">Video Processing</h1>
            <div className="mb-3">
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
                        setVideoDetails({ ...videoDetails, Name: e.target.value })
                    }
                />
                <label htmlFor="inputFile" className="text-lg font-semibold mx-2 my-2">
                    Select Video:
                </label>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload Video</button>
            </div>
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {videos.map((post, index) => {
                            const { vidUrl, Name} = post;
                            return (
                                <div className="mx-auto" key={index}>
                                    <div className="relative w-[360px] h-48">
                                        <video controls className="w-full h-full object-cover rounded-lg shadow-md">
                                            <source src={vidUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className='mt-2'><button onClick={() => handleProcess(`Vid_${Name}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Process Video</button>
                                    </div>
                                </div>
                            )
                        } )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoProcessing;