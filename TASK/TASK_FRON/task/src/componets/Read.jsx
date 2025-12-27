import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

function Read() {

let {fileName} =useParams();
let [detail,setDetail]=useState("");

    useEffect(()=>{
        fetch(`http://localhost:5000/read/${fileName}`)
        .then(res=>res.json())
        .then(data=>setDetail(data.data));

    },[fileName])

  return (
    <div>
         <div className="main bg-black w-full min-h-screen">
        <div className="tasks p-10 text-white">
            <h1 className='text-white'>{detail}</h1>
        </div>
        <Link className=" text-blue-600" to="/">Go Back</Link>
        </div>
    </div>
  )
}

export default Read
