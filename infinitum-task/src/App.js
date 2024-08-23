import logo from './logo.svg';
import './App.css';
import 'animate.css';
import Home from './Component/Home/Home'
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import AuthProvider, { UserContext } from './Services/CreateContext';
import Aunthentication from './Services/Authentication';
import Service from './Component/Services/Service';
import Portfolio from './Component/Portfolio/Portfolio';
import Contactus from './Component/Contactus/Contactus';
import Footer from './Component/Footer/Footer';

function App() {

  

  return (
    <div className="App">
      <AuthProvider>
    <BrowserRouter>
    <Aunthentication>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/service' element={<Service/>} />
          <Route path='/portfolio' element={<Portfolio/>} />
          <Route path='/contactus' element={<Contactus/>} />
          
        </Routes>
        <Footer/>
        </Aunthentication>
      </BrowserRouter>
      
      </AuthProvider>
    </div>
  );
}

export default App;
