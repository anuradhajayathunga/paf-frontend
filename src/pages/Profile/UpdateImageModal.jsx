// components/UpdateImageModal.jsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const UpdateImageModal = ({ open, onClose }) => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      avatar: user?.avatar || "",
      cover: user?.cover || "",
      fname: user?.fname || "",
      lname: user?.lname || "",
      email: user?.email || "",
      description: user?.description || "",
      city: user?.city || "",
      education: user?.education || "",
      work: user?.work || "",
      website: user?.website || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Update Images</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* ✅ Wrap form here */}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="avatar"
            label="Avatar URL"
            fullWidth
            value={formik.values.avatar}
            onChange={formik.handleChange}
            margin="normal"
          />

          <TextField
            name="cover"
            label="Cover Photo URL"
            fullWidth
            value={formik.values.cover}
            onChange={formik.handleChange}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateImageModal;
