"use client";

import { useFormStatus } from "react-dom";
import { FiSend } from "react-icons/fi";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-2 mt-2 rounded-md font-medium transition-all duration-300
        ${pending
          ? "bg-blue-400 text-white cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
        }`}
    >
      {pending ? (
        <>
          <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send <FiSend className="text-lg" />
        </>
      )}
    </button>
  );
};

export default AddPostButton;
