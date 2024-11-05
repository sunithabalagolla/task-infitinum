import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import AuthProvider, { UserContext } from './Services/CreateContext';
import Aunthentication from './Services/Authentication';
import EventList from './Component/event-list/EventList';
import UploadForm from './Component/Upload-form/UploadForm';
import MediaView from './Component/Media-view/MediaView';
import CopyView from './Component/Copy-View/CopyView';
import EditEvent from './Component/Edit-Event/EditEvent';
import Navbar from './Component/Navbar/Navbar';




function App() {
  return (
    <div className="App">
      <AuthProvider>
    <BrowserRouter>
    <Aunthentication>
      <Navbar/>
        <Routes>
          <Route path='/' element={<EventList/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/upload-form' element={<UploadForm/>} />
          <Route path='/upload-view/:userName/:userId/:imageId' element={<MediaView/>} />
          <Route path='/upload-copy-view/:userName/:userId/:imageId' element={<CopyView/>} />
          <Route path='/edit-media/:userName/:userId/:imageId' element={<EditEvent/>} />
       </Routes>
        </Aunthentication>
      </BrowserRouter>
      
      </AuthProvider>
    </div>
  );
}

export default App;
