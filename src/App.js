import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddSuccess from './components/home/AddSuccess/AddSuccess';
import AddClient from './components/home/Clients/AddClient';
import ViewClients from './components/home/Clients/ViewClients';
import Home from './components/home/Home';
import ForgotPassword from './components/login/ForgotPassword';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import RequireAuth from './shared/RequireAuth';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }>
          <Route index element={<ViewClients />} />
          <Route path='/addclient' element={<AddClient />} />
          <Route path='/clientaddsuccess' element={<AddSuccess />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
