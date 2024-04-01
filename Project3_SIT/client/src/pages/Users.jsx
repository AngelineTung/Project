import React, { useEffect, useState } from 'react';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button }
  from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';


function Users() {
  const [userList, setUserList] = useState([]);

  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getUsers = () => {
    http.get('/user').then((res) => {
      setUserList(res.data);
    });
  };

  const searchUsers = () => {
    http.get(`/user?search=${search}`).then((res) => {
      setUserList(res.data);
    });
  };
  
  useEffect(() => {
    getUsers();
  }, []);
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };
  const onClickSearch = () => {
    searchUsers();
  }
  const onClickClear = () => {
    setSearch('');
    getUsers();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Users
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Input value={search} placeholder="Search"
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown} />
        <IconButton color="primary"
          onClick={onClickSearch}>
          <Search />
        </IconButton>
        <IconButton color="primary"
          onClick={onClickClear}>
          <Clear />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant='contained'>
            Register New Account
          </Button>
        </Link>
      </Box>

      <Grid container spacing={2}>
        {
          userList.map((user, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        User's ID: {user.id}
                      </Typography>
                      <Link to={`/edituser/${user.id}`}>
                        <IconButton color="primary" sx={{ padding: '4px' , color: 'grey'}}>
                          <Edit />
                        </IconButton>
                      </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      color="text.secondary">
                      <AccessTime sx={{ mr: 1 }} />
                      <Typography>
                        {dayjs(user.createdAt).format(global.datetimeFormat)}
                      </Typography>
                    </Box>
                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      User's Name : {user.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        }
      </Grid>
    </Box>
  );
}
export default Users;