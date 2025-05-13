import React, { useState } from 'react';
import { createProgress, updateProgress } from '../services/progressService';

const ProgressForm = ({ onSubmit, initialData = {}, buttonLabel, onCancel }) => {
  const [userId, setUserId] = useState(initialData.userId || '');
  const [completedDate, setCompletedDate] = useState(initialData.completedDate || new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(initialData.startDate || new Date().toISOString().split('T')[0]); // New state for Start Date
  const [duration, setDuration] = useState(initialData.duration || '');
  const [status, setStatus] = useState(initialData.status || 'Not Started');
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [reflections, setReflections] = useState(initialData.reflections || '');
  const [resources, setResources] = useState(initialData.resources || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length > 100) {
      setError('Description must be 100 characters or less.');
      setSuccess(''); // Clear success message
      return;
    }

    if (reflections.length > 100) {
      setError('Reflections must be 100 characters or less.');
      setSuccess(''); // Clear success message
      return;
    }

    const progressData = { userId, startDate, completedDate, duration, status, title, description, category, reflections, resources };

    try {
      if (initialData.id) {
        // Update existing progress
        await updateProgress(initialData.id, progressData);
      } else {
        // Create new progress
        await createProgress(progressData);
      }
      setError(''); // Clear error message
      setSuccess('Entry saved successfully!'); // Set success message
      onSubmit(progressData); // Notify parent component
    } catch (err) {
      console.error('Error saving progress:', err);
      setError('Failed to save progress. Please try again.');
      setSuccess(''); // Clear success message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="progress-form bg-white p-6 rounded-lg shadow-md space-y-6 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Progress Journal</h2>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline ml-2">{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {/* User ID */}
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
          User ID *
        </label>
        <input
          id="userId"
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date *
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Completed Date */}
      <div>
        <label htmlFor="completedDate" className="block text-sm font-medium text-gray-700 mb-1">
          Completed Date *
        </label>
        <input
          id="completedDate"
          type="date"
          value={completedDate}
          onChange={(e) => setCompletedDate(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes) *
        </label>
        <input
          id="duration"
          type="number"
          placeholder="Enter duration in minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status *
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="What did you learn?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          placeholder="Provide a brief description of what you learned... (max 100 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Nature & Landscape">Nature & Landscape</option>
          <option value="Urban & Architecture">Urban & Architecture</option>
          <option value="MarPeople & Portraitsketing">People & Portraits</option>
          <option value="Events & Celebrations">Events & Celebrations</option>
          <option value="Travel & Adventure">Travel & Adventure</option>
          <option value="Macro & Abstract">Macro & Abstract</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Reflections */}
      <div>
        <label htmlFor="reflections" className="block text-sm font-medium text-gray-700 mb-1">
          Reflections
        </label>
        <textarea
          id="reflections"
          placeholder="What went well? What could be improved? (max 100 characters)"
          value={reflections}
          onChange={(e) => setReflections(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Resources */}
      <div>
        <label htmlFor="resources" className="block text-sm font-medium text-gray-700 mb-1">
          Resources
        </label>
        <textarea
          id="resources"
          placeholder="Links to resources, books, videos, etc."
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center space-x-4 max-w-lg">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          {buttonLabel || 'Save Entry'}
        </button>
      </div>
    </form>
  );
};

export default ProgressForm;
