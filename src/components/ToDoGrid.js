import React, { useEffect, useState } from 'react';

const ToDoGrid = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', IsComplete: false });

  const url = 'http://localhost:5049/todo/incomplete';
  const deleteUrl = 'http://localhost:5049/todo'; // Base URL for delete API
  const addUrl = 'http://localhost:5049/todo'; // Base URL for add API

  useEffect(() => {
    const fetchToDoItems = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setToDoItems(data);
        console.log('To-Do items:', data);
      } catch (error) {
        console.error('Error fetching To-Do items:', error);
      }
    };

    fetchToDoItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${deleteUrl}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setToDoItems(toDoItems.filter((item) => item.id !== id));
        console.log(`Deleted item with ID: ${id}`);
      } else {
        console.error(`Failed to delete item with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting To-Do item:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(addUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        const addedItem = await response.json();
        setToDoItems([...toDoItems, addedItem]);
        setShowPopup(false);
        setNewItem({ title: '', IsComplete: false });
        console.log('Added new item:', addedItem);
      } else {
        console.error('Failed to add new item');
      }
    } catch (error) {
      console.error('Error adding new To-Do item:', error);
    }
  };

  return (
    <div className="todo-grid">
      <h2>To-Do List</h2>
      <button onClick={() => setShowPopup(true)}>Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {toDoItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.IsComplete ? 'Completed' : 'Pending'}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New To-Do Item</h3>
            <label>
              Title:
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={newItem.IsComplete}
                onChange={(e) => setNewItem({ ...newItem, IsComplete: e.target.checked })}
              />
            </label>
            <div className="popup-actions">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoGrid;
