import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoGrid from './components/ToDoGrid';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">To Do Items</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <ToDoGrid />
    </div>
  );
}

export default App;
