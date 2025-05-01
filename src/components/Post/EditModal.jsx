import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

const EditModal = ({ isOpen, onCancel, onSave, initialData }) => {
  const [caption, setCaption] = useState("");
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    if (initialData) {
      setCaption(initialData.caption || "");
      setKeywords(initialData.keywords || "");
    }
  }, [initialData]);

  const handleSave = () => {
    const updatedPost = {
      ...initialData,
      caption,
      keywords,
    };
    onSave(updatedPost);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Post</h2>

      {/* Media Preview */}
      {initialData?.img && (
        <img
          src={initialData.img}
          alt="Post Preview"
          className="w-full max-h-60 object-cover rounded mb-4"
        />
      )}
      {initialData?.video && (
        <video
          src={initialData.video}
          controls
          className="w-full max-h-60 rounded mb-4"
        />
      )}

      {/* Caption Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Keywords Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Keywords (comma separated)
      </label>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </ModalWrapper>
  );
};

export default EditModal;
