import React, { useState, useEffect } from 'react';
import { createProgress, getProgressByUser, deleteProgress, updateProgress } from '../services/progressService'; // Ensure updateProgress is imported
import ProgressForm from '../components/ProgressForm'; // adjust path if needed

const ProgressPage = () => {
  const [progressList, setProgressList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // State for editing

  const userId = 1; // Hardcoded for now (you can make dynamic later)

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await getProgressByUser(userId);
      setProgressList(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleCreateProgress = async (progressData) => {
    try {
      if (editingItem) {
        // Update existing progress
        await updateProgress(editingItem.id, { ...progressData, userId });
      } else {
        // Create new progress
        await createProgress({ ...progressData, userId });
      }
      setShowForm(false);
      setEditingItem(null); // Reset editing state
      fetchProgress(); // Refresh list
    } catch (error) {
      console.error('Error creating/updating progress:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
    setShowForm(true); // Show the form
  };

  const handleDelete = async (id) => {
    try {
      await deleteProgress(id);
      fetchProgress(); // Refresh list
    } catch (error) {
      console.error('Error deleting progress:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Learning Progress Diary</h1>

      {showForm ? (
        <ProgressForm 
          onSubmit={handleCreateProgress} 
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null); // Reset editing state
          }} 
          initialData={editingItem || {}} // Pass initial data for editing
        />
      ) : (
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => {
              setShowForm(true);
              setEditingItem(null); // Reset editing state for new entry
            }}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Progress
          </button>
        </div>
      )}

      <div className="grid gap-4 max-w-4xl mx-auto">
        {progressList.map((item) => (
          <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">Completed on: {item.completedDate}</p>

            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => handleEdit(item)} // Edit button
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item.id)} // Delete button
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;
