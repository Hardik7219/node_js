
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './componets/Home.jsx';
import Read from './componets/Read.jsx';
import Edit from './componets/Edit.jsx';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/read/:fileName' element={<Read/>}/>
      <Route path='/edit/:fileName' element={<Edit/>}></Route>
    </Routes>
    );
}

export default App;
