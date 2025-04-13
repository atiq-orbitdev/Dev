import React, { useState } from 'react';
import { Typography, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', active: false },
  ]);
  const [newUser, setNewUser] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.trim() && newEmail.trim()) {
      setUsers([...users, { id: users.length + 1, name: newUser, email: newEmail, active: true }]);
      setNewUser('');
      setNewEmail('');
      setIsDialogOpen(false);
    }
  };

  const handleToggleActive = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, active: !user.active } : user));
  };

  const handleRowDoubleClick = (params) => {
    setEditUser(params.row);
    setIsEditDialogOpen(true);
  };

  const handleEditUser = () => {
    setUsers(users.map(user => user.id === editUser.id ? editUser : user));
    setIsEditDialogOpen(false);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'active',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.value}
              onChange={() => handleToggleActive(params.row.id)}
              color="primary"
            />
          }
          label={params.value ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || 'https://via.placeholder.com/50'}
          alt={params.row.name}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px', float: 'left' }} // Keep the button left aligned and above the DataGrid
        onClick={() => setIsDialogOpen(true)}
      >
        Add User
      </Button>
      <div style={{ clear: 'both', height: 400, width: '100%' }}> 
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          onRowDoubleClick={handleRowDoubleClick}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e0f7fa', // Added background color to header row
              fontWeight: 'bold',
            },
          }}
        />
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editUser.active}
                    onChange={(e) => setEditUser({ ...editUser, active: e.target.checked })}
                    color="primary"
                  />
                }
                label="Active"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Users;