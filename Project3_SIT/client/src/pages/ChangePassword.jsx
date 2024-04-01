// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { Box, Typography, TextField, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { AccessTime, Search, Clear } from '@mui/icons-material';


function ChangePassword() {
  const navigate = useNavigate();
  const [icnumber, seticnumber] = useState('');
  const [tempPassword, settempPassword] = useState('');
  const [fullPassword, setfullPassword] = useState('');
  
  
  const handleChangePassword = async () => {

    // Fetch user's email using axios

   
    try {
      const response = await axios.get(`http://localhost:3001/user/users?search=${icnumber}`);
      const data = response.data;  
      const email = data[0].email

      console.log(data[0])
                   
      //await http.post('http://localhost:3001/user/reset-password', { email });
      //alert('Password reset email sent successfully.');

    
      
    } catch (error) {
      console.error('Error sending email to reset password:', error);
      alert('Error sending email to reset password. Please ensure that your IC number is correct or verify your email address with our staff.');
    }



    
  };
  
 


  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
  }}>.
      <h1 className="welcome-message">Change Password</h1>
      
      <Box sx={{ mt: 2}}>
      <input 
        type="tempPassword" 
        value={tempPassword} 
        onChange={(e) => settempPassword(e.target.value)} 
        placeholder="Temporary Password"
        style={{ height: '40px', width:'300px', fontSize: '18px' }} // Adjust the height value as need required 
/>
          <br />
          <br />
          <input 
        type="fullPassword" 
        value={fullPassword} 
        onChange={(e) => setfullPassword(e.target.value)} 
        placeholder="New Password"
        style={{ height: '40px', width:'300px', fontSize: '18px' }} // Adjust the height value as need required 
/>
          <br />
          <br />
          <button 
            style={{ height: '40px', margin: 'auto', display: 'block', fontSize: '18px' }} 
            fullwidth="true"
            variant="contained" 
            type="button" 
            onClick={handleChangePassword}>
            Change
          </button>
      </Box>
  </Box>
);
 
};

export default ChangePassword;
