
import './App.css';
import { Routes,Route } from "react-router-dom";
import Login from './component/Login';
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import AddProduct from './component/AddProduct';
import Register from './component/Register';





function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
