import './App.css';
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MyTheme from './themes/MyTheme';
import Login from './pages/Login';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import Reset from './pages/Reset';
import http from './http';
import UserContext from './contexts/UserContext';
import ChangePassword from './pages/ChangePassword';
//import ProfilePage from './pages/ProfilePage';
import Users from './pages/Users';
import EditUser from './pages/EditUser';



function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Todo: get user data from server
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Router>
      <ThemeProvider theme={MyTheme}>
        <AppBar position="static" className="AppBar">
          <Container>
            <Toolbar disableGutters={true} >
            <div className="toolbar">
                <img src="logo.jpg" alt="Logo" className="logo" />
                <span className="text">SavingLives Hospital</span>
              </div>
              {user && (
                  <>
            <Link to="/">
                </Link>
                <Link to="/profilePage" ><Typography>Profile Page</Typography></Link>
                <Link to="/schedule" ><Typography>Schedule</Typography></Link>
                <Link to="/users" ><Typography>Users</Typography></Link>

                  </>
                  
                )
                }              

                <Box sx={{ flexGrow: 1 }}></Box>
                {user && (
                  <>
                    <Link to="/changepassword" ><Typography>Change Password</Typography></Link>
                    <Typography>{user.name}</Typography>
         
                    <Button onClick={logout}>Logout</Button>
                  </>
                  
                )
                }
                {!user && (
                  <>
                    <Link to="/register" ><Typography>Register</Typography></Link>
                    <Link to="/login" ><Typography>Login</Typography></Link>
                    <Link to="/reset" ><Typography>Reset Password</Typography></Link>
                  </>
                )}
            </Toolbar>
          </Container>
        </AppBar>

        <Container>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/schedule"} element={<Schedule />} />
            <Route path={"/reset"} element={<Reset />} />
            <Route path={"/changepassword"} element={<ChangePassword />} />         
            <Route path={"/users"} element={<Users />} />    
            <Route path={"/edituser/:id"} element={<EditUser />} />         
                   
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
