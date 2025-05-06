import React, { useState, useEffect } from 'react';
import { getProgressByUser, createProgress, updateProgress, deleteProgress } from '../services/progressService';
import ProgressForm from './ProgressForm';
import { FaPlus, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'; // Import icons

const ProgressList = () => {
  const userId = 1; // Set correct userId dynamically later
  const [progressList, setProgressList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
    const confirmDelete = window.confirm('Are you sure you want to delete this progress entry?');
    if (!confirmDelete) {
      return;
    }

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
    <div className="progress-list container mx-auto p-6 bg-gray-50 rounded-lg shadow-md max-w-5xl">
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
              <h1 className="text-3xl font-bold text-gray-800">Learning Progress</h1>
              <p className="text-gray-600">Track your learning journey and monitor your progress</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingItem(null);
              }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <FaPlus className="mr-2" /> New Entry
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="relative w-full max-w-md">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries by topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {filteredProgressList.length > 0 ? (
            <ul className="space-y-4">
              {filteredProgressList.map(progress => (
                <li
                  key={progress.id}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{progress.title}</h3>
                    <p className="text-gray-600 mt-1">{progress.description}</p>
                    <div className="text-sm text-gray-500 mt-2 space-y-1">
                      <p>
                        <span className="font-medium">Date:</span> {progress.date}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span> {progress.duration} minutes
                      </p>
                      <p>
                        <span className="font-medium">Status:</span> {progress.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                      onClick={() => {
                        setEditingItem(progress);
                        setShowForm(true);
                      }}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(progress.id)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
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
