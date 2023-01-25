import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/LoginPage/Login.page';
import Signup from './Pages/SignupPages/Signup.page';
import SignupUsername from './Pages/SignupPages/Signup-username.page';
import Error from './Pages/Error/Error.page';
import Dashboard from './Pages/Dashboard/Dashboard.page'
import Navbar from './Components/Navbar/Navbar.component';
import * as React from "react";
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  let token = localStorage.getItem("token")
  const location = useLocation()
  if (token === null) {
    return <Navigate to={"/"} state={location} />
  }

  return <Outlet />;
}


function App() {
  const [navbarDisplay, setNavbarDisplay] = React.useState("none")
  const location = useLocation()
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token === null) {
      setNavbarDisplay("none")
    } else {
      setNavbarDisplay("flex")
    }
  }, [location])
  return (
    <div className="App">
      <Navbar display={navbarDisplay} />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:email" element={<SignupUsername />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route element={<ProtectedRoutes />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
