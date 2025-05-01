"use client";

import { useFormStatus } from "react-dom";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { blue } from "@mui/material/colors";
const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`relative group flex items-center justify-center gap-2 px-2 py-2 mt-2 rounded-full font-medium text-white transition-all duration-300  hover:bg-slate-100
        `}
    >
      {pending ? (
        <>
          <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="ml-1">Sending...</span>
        </>
      ) : (
        <>
          <SendRoundedIcon
            sx={{ color: blue[500] }}
            className="text-white group-hover:translate-x-1 transition-transform duration-200"
          />
          <span className="text-md text-blue-300 hover:text-blue-600">
            Send
          </span>
        </>
      )}
    </button>
  );
};

export default AddPostButton;
