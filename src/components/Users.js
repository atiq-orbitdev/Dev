import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: false },
  ]);
  const [newUser, setNewUser] = useState('');

  const handleAddUser = () => {
    if (newUser.trim()) {
      setUsers([...users, { id: users.length + 1, name: newUser, active: true }]);
      setNewUser('');
    }
  };

  const handleToggleActive = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, active: !user.active } : user));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Add New User"
            variant="outlined"
            fullWidth
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>
          {users.map(user => (
            <Paper key={user.id} style={{ padding: '10px', marginBottom: '10px' }}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography>{user.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{user.active ? 'Active' : 'Inactive'}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color={user.active ? 'secondary' : 'primary'}
                    onClick={() => handleToggleActive(user.id)}
                  >
                    {user.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Users;