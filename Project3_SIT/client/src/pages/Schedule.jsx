import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useNavigate } from 'react-router-dom';

function Schedule() {
  const { setUser } = useContext(UserContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = date => {
    setSelectedDateTime(date);
  };

  const formik = useFormik({
    initialValues: {
      patientName: '',
      nurseName: '',
      service: '',
      date: ''
    },
    validationSchema: yup.object({
      patientName: yup.string().trim().max(100).required('Patient Name is required').matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
      nurseName: yup.string().trim().max(100).required('Nurse Name is required').matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
      service: yup.string().trim().max(100).required('Service is required'), // Adjust validation as needed
      date: yup.date().required('Date is required')
    }),

    onSubmit: (data) => {
      data.patientName = data.patientName.trim().toLowerCase();
      data.nurseName = data.nurseName.trim().toLowerCase();
      data.service = data.service.trim();
      data.date = selectedDateTime;

      http.post("/allocate/patientName", data)
        .then((res) => {
          console.log(res.data);
          formik.resetForm();
          toast.success("Allocation successful!");
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
          console.log(err.response);
        });
    }
  });

  return (
    <Box sx={{
      marginTop: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 className="welcome-message">This is where you can allocate patients' services to nurses</h1>
      <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>

        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Patient Name"
          name="patientName"
          value={formik.values.patientName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.patientName && Boolean(formik.errors.patientName)}
          helperText={formik.touched.patientName && formik.errors.patientName}
        />

        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Nurse Name"
          name="nurseName"
          value={formik.values.nurseName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nurseName && Boolean(formik.errors.nurseName)}
          helperText={formik.touched.nurseName && formik.errors.nurseName}
        />

        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Service"
          name="service"
          value={formik.values.service}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.service && Boolean(formik.errors.service)}
          helperText={formik.touched.service && formik.errors.service}
        />


        <div>
          <h2>Select a Date and Time:</h2>
          <Datetime
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          />
          {selectedDateTime && (
            <p>You selected: {selectedDateTime.toString()}</p>
          )}
        </div>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Allocate
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );

}

export default Schedule;