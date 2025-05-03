import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProgressList from './components/ProgressList';
import ProgressForm from './components/ProgressForm';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [progressList, setProgressList] = useState([]); // State to manage the progress list

  const handleNewEntry = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormSubmit = (progress) => {
    console.log('Form submitted:', progress); // Debugging: Log the submitted progress

    // Update the progress list
    if (editingItem) {
      // Update an existing entry
      setProgressList((prevList) =>
        prevList.map((item) => (item.id === progress.id ? progress : item))
      );
    } else {
      // Add a new entry
      setProgressList((prevList) => [...prevList, progress]);
    }

    setShowForm(false);
    setEditingItem(null); // Reset editing state
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null); // Reset editing state
  };

  return (
    <Router>
      <div className="App container mx-auto p-6">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-600 hover:underline">Home</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              showForm ? (
                <ProgressForm
                  onSubmit={handleFormSubmit}
                  initialData={editingItem || {}}
                  buttonLabel={editingItem ? 'Update Entry' : 'Add Entry'}
                  onCancel={handleCancel}
                />
              ) : (
                <ProgressList
                  progressList={progressList} // Pass the progress list
                  onNewEntry={handleNewEntry}
                  setEditingItem={(item) => {
                    setEditingItem(item);
                    setShowForm(true); // Show the form when editing
                  }}
                />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
