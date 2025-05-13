import React, { useState } from 'react';
import { createPlan } from '../api/learningPlanApi';
import { useNavigate } from 'react-router-dom';

function CreatePlanPage() {
  const [title, setTitle] = useState('');
  const [topics, setTopics] = useState([
    { name: '', resourceUrl: '', targetDate: '', completed: false }
  ]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index][field] = value;
    setTopics(updatedTopics);
  };

  const addTopic = () => {
    setTopics([...topics, { name: '', resourceUrl: '', targetDate: '', completed: false }]);
  };
 

  const validateTopic = (topic, index) => {
    const errors = {};
    if (!topic.name.trim()) {
      errors.name = 'Topic name is required';
    }
    if (topic.resourceUrl && !isValidUrl(topic.resourceUrl)) {
      errors.resourceUrl = 'Please enter a valid URL';
    }
    if (!topic.targetDate) {
      errors.targetDate = 'Target date is required';
    } else {
      const selectedDate = new Date(topic.targetDate);
      const currentDate = new Date();
     
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        errors.targetDate = 'Please select a future date';
      }
    }
    return errors;
  };
// Validate if a URL is correct format
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    topics.forEach((topic, index) => {
      const errors = validateTopic(topic, index);
      if (Object.keys(errors).length > 0) {
        newErrors[index] = errors;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const newPlan = {
      title,
      userId: 1,
      description: '',
      resourceLink: '',
      timeline: '',
      status: 'Pending',
      topicsJson: JSON.stringify(topics)
    };

    try {
      const createdPlan = await createPlan(newPlan);
      navigate(`/view-plan/${createdPlan.id}`); // Navigate to view plan page
    } catch (error) {
        //console.error('Failed to create plan', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create a New Learning Plan</h2>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="absolute right-0 mr-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          View All Plans
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">Topics</h3>

          {topics.map((topic, index) => (
            <div key={index} className="space-y-4 bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
              <input
                type="text"
                placeholder="Topic Name"
                value={topic.name}
                onChange={(e) => handleTopicChange(index, 'name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              {formErrors[index]?.name && (
                <div className="text-red-500 text-sm">{formErrors[index].name}</div>
              )}

              <input
                type="text"
                placeholder="Resource URL"
                value={topic.resourceUrl}
                onChange={(e) => handleTopicChange(index, 'resourceUrl', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {formErrors[index]?.resourceUrl && (
                <div className="text-red-500 text-sm">{formErrors[index].resourceUrl}</div>
              )}

              <input
                type="date"
                value={topic.targetDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleTopicChange(index, 'targetDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              {formErrors[index]?.targetDate && (
                <div className="text-red-500 text-sm">{formErrors[index].targetDate}</div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addTopic}
            className="w-full bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 font-semibold"
          >
            ➕ Add Another Topic
          </button>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 font-bold mt-4"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePlanPage;
