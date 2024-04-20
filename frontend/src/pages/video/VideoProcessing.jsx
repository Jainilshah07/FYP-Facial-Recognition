import React, { useState, useEffect } from 'react';
import { imgDb } from '../../firebase'; // Updated import for Firebase Storage
import { listAll, getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Updated Firebase Storage imports

const VideoProcessing = () => {
    const [videos, setVideos] = useState([]);
    const [newVideo, setNewVideo] = useState(null);

    useEffect(() => {
        fetchVideosFromDatabase();
    }, [videos]);

    const fetchVideosFromDatabase = async () => {
        try {
            const videoRefs = await listAll(ref(imgDb, 'Videos')); // Update reference to use imgDb
            const videoUrls = await Promise.all(videoRefs.items.map(async (videoRef) => {
                return getDownloadURL(videoRef);
            }));
            setVideos(videoUrls);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        // const storageRef = ref(imgDb, `videos/${file.name}`); // Update reference to use imgDb
        // console.log(e.target.files[0]);
        const videos = ref(imgDb, `Videos/${file.name}`)
        uploadBytes(videos, e.target.files[0]).then(data => {
            console.log(data, "videos")
            getDownloadURL(data.ref).then(val => {
                setNewVideo(val)
            })
        })
    }

    const handleClick = async () => {
        alert("Video added successfully");
        // navigate('/employee-details');
        setNewVideo('');
    }

    return (
        <div>
            <h1 className="text-3xl font-bold my-4">Video Processing</h1>
            <div className="mb-3">
                <label htmlFor="inputFile" className="text-lg font-semibold mx-2 my-2">
                    Select Video:
                </label>
                <input type="file" onChange={(e) => handleUpload(e)} />
                <button onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload Video</button>
            </div>
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {videos.map((videoUrl, index) => (
                            <div className="mx-auto" key={index}>
                                <div className="relative w-[360px] h-48">
                                    <video controls className="w-full h-full object-cover rounded-lg shadow-md">
                                        <source src={videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoProcessing;
