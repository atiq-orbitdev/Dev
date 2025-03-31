import React, { useEffect, useState } from 'react';

const ToDoGrid = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', IsComplete: false });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editItem, setEditItem] = useState(null); // New state variable for managing the item being edited

  const url = 'http://localhost:5049/todo/incomplete';
  const deleteUrl = 'http://localhost:5049/todo'; // Base URL for delete API
  const addUrl = 'http://localhost:5049/todo'; // Base URL for add API
  const updateUrl = 'http://localhost:5049/todo'; // Base URL for update API

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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${updateUrl}/${editItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setToDoItems(toDoItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        setShowPopup(false);
        setEditItem(null);
        console.log('Updated item:', updatedItem);
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating To-Do item:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...toDoItems].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="todo-grid">
      <h2>To-Do List</h2>
      <button onClick={() => setShowPopup(true)}>Add New Item</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              Title{getSortArrow('title')}
            </th>
            <th onClick={() => handleSort('IsComplete')}>
              Status{getSortArrow('IsComplete')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.IsComplete ? 'Completed' : 'Pending'}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => { setEditItem(item); setShowPopup(true); }}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editItem ? 'Update To-Do Item' : 'Add New To-Do Item'}</h3>
            <label>
              Title:
              <input
                type="text"
                value={editItem ? editItem.title : newItem.title}
                onChange={(e) => {
                  if (editItem) {
                    setEditItem({ ...editItem, title: e.target.value });
                  } else {
                    setNewItem({ ...newItem, title: e.target.value });
                  }
                }}
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={editItem ? editItem.IsComplete : newItem.IsComplete}
                onChange={(e) => {
                  if (editItem) {
                    setEditItem({ ...editItem, IsComplete: e.target.checked });
                  } else {
                    setNewItem({ ...newItem, IsComplete: e.target.checked });
                  }
                }}
              />
            </label>
            <div className="popup-actions">
              <button onClick={() => { setShowPopup(false); setEditItem(null); }}>Cancel</button>
              <button onClick={editItem ? handleUpdate : handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoGrid;
