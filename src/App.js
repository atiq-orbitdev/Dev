import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoGrid from './components/ToDoGrid';
import Home from './components/Home';
import Users from './components/Users'; // Import the new Users component
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              PoC TS NG (GitHub Copilot Agent Mode)
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/todo">To Do Items</Button>
            <Button color="inherit" component={Link} to="/users">Users</Button> {/* New menu item */}
            <Button color="inherit" component={Link} to="/about">About</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDoGrid />} />
          <Route path="/users" element={<Users />} /> {/* Route for Users page */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
