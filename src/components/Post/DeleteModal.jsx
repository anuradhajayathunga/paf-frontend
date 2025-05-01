import ModalWrapper from "./ModalWrapper";

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => (
  
  <ModalWrapper isOpen={isOpen} onClose={onCancel}>
    <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
    <p className="text-sm text-gray-600 mt-2">
      Are you sure you want to delete this post? This action cannot be undone.
    </p>
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  </ModalWrapper>
);

export default DeleteModal;
