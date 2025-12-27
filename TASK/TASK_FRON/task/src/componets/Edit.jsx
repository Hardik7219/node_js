import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'

function Edit() {
    let {fileName} = useParams();
    let ref1 = useRef();
    let updateName = (e) => {
        e.preventDefault();
        let newName = ref1.current.value;
        fetch(`http://localhost:5000/update/${fileName}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({newName})
        })
        .then(res => res.json())
        .then(data => console.log(data));
        
    }

  return (
    <div>
      <div className=' min-h-screen w-full bg-black'>
        <div className='p-10'>
                <input  ref={ref1} name="newName" type="text" placeholder={fileName} className="block w-full rounded-md bg-gray-500 p-2 outline-none"/>
                <button  value="update" onClick={updateName}  className="bg-blue-500 p-2 m-2 rounded-md text-white">update</button>
        </div>
      </div>
    </div>
  )
}

export default Edit