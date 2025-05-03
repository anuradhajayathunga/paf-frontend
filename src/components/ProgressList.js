import React, { useState, useEffect } from 'react';
import { getProgressByUser, createProgress, updateProgress, deleteProgress } from '../services/progressService';
import ProgressForm from './ProgressForm'; // Import the form

const ProgressList = () => {
  const userId = 1; // Set correct userId dynamically later
  const [progressList, setProgressList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [editingItem, setEditingItem] = useState(null); // State for editing

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    getProgressByUser(userId)
      .then(response => {
        setProgressList(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
        setError('Failed to load progress data.');
      });
  };

  const handleFormSubmit = (progress) => {
    if (editingItem) {
      // Update existing progress
      updateProgress(editingItem.id, { ...progress, userId })
        .then(() => {
          loadProgress();
          setShowForm(false);
          setEditingItem(null);
        })
        .catch(error => {
          console.error('Error updating progress:', error);
          setError('Failed to update progress entry.');
        });
    } else {
      // Create new progress
      createProgress({ ...progress, userId })
        .then(() => {
          loadProgress();
          setShowForm(false);
        })
        .catch(error => {
          console.error('Error creating progress:', error);
          setError('Failed to create progress entry.');
        });
    }
  };

  const handleDelete = (id) => {
    deleteProgress(id)
      .then(() => {
        loadProgress();
      })
      .catch(error => {
        console.error('Error deleting progress:', error);
        setError('Failed to delete progress entry.');
      });
  };

  const filteredProgressList = progressList.filter(progress =>
    progress.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="progress-list container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl">
      {showForm ? (
        <ProgressForm
          onSubmit={handleFormSubmit}
          initialData={editingItem || {}}
          buttonLabel={editingItem ? 'Update Entry' : 'Add Entry'}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Learning Progress</h1>
              <p className="text-gray-600">Track your learning journey and monitor your progress</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingItem(null);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              + New Entry
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search entries by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {filteredProgressList.length > 0 ? (
            <ul className="space-y-4">
              {filteredProgressList.map(progress => (
                <li
                  key={progress.id}
                  className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{progress.title}</h3>
                    <p className="text-gray-600">{progress.description}</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Date:</span> {progress.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Duration:</span> {progress.duration} minutes
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Status:</span> {progress.status}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(progress);
                        setShowForm(true);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(progress.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">No entries found</h3>
              <p className="text-gray-600">You haven't created any learning progress entries yet.</p>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingItem(null);
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                + Create Your First Entry
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressList;
