import React,{ useEffect, useRef } from 'react'

export default function TeacherVideos({video}) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);
 

  return (
    <div>
        <video style={{ width:'100%',height:"400px",marginTop:'50px',borderRadius:'20px'}}
         controls='true'  
         ref={videoRef} 
         controlsList="nodownload" 
         src={`${process.env.REACT_APP_API_URL_IMAGE}${video}`} 
         />
    </div>
  )
}
