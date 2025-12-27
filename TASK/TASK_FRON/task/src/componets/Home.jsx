
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const ref1=useRef();
  const ref2=useRef();
  const [task,setTask]=useState([]);

  useEffect(()=>{
   // e.preventDefault();
    fetch("http://localhost:5000/files")
    .then(res=>res.json())
    .then(data=>setTask(data.filenames));
  },[task]);

function sendData(e) {
    e.preventDefault(); // stop page reload
    const title = ref1.current.value;
    const detail = ref2.current.value;

    fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, detail })
    })
      .then(res => res.json())
      .then(data => console.log(data.data));
    
    ref1.current.value = '';
  }

  return (
    <div>
    <div className="main bg-black w-full min-h-screen">
        <div className="tasks p-10 text-white">
            <form>
                <input ref={ref1} name="title" type="text" placeholder="Add your task" class="block w-full rounded-md bg-gray-500 p-2 m-2 outline-none"/>
                <textarea ref={ref2} name="detail" className="block bg-gray-500 outline-none resize-none w-full rounded-md p-2 m-2" placeholder="write your tasks"></textarea>
                <button onClick={sendData} value="Add Task" id="btn" className="bg-blue-500 p-2 m-2 rounded-md text-white">aadd</button>
            </form>
        </div>
        <div className="task p-10 flex gap-3 flex-wrap">
        {
          task.map((s,d) => (
              <div className="bg-gray-600 w-80 ">
                <h1 className="text-orange-300 m-10 text-2xl" key={d}>{s}</h1>
                <Link className="text-red-500 p-1 " to={`/Edit/${s}`}>EDIT</Link>
                <Link className="text-blue-600" to={`/Read/${s}`}>read more</Link>
              </div>
          ))
        }
        </div>
    </div>
    </div>
    );
}

export default Home
