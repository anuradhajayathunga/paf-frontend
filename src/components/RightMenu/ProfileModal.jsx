// components/ProfileModal.jsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
  outline: "none",
};

const labelStyle = {
  fontWeight: 600,
  color: "#555",
  minWidth: "100px",
  paddingTop: "6px",
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "1px solid #ccc",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #1976d2",
    },
  },
};

const ProfileModal = ({ open, handleClose }) => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      avatar: user?.avatar || "",
      fname: user?.fname || "",
      lname: user?.lname || "",
      email: user?.email || "",
      description: user?.description || "",
      city: user?.city || "",
      education: user?.education || "",
      work: user?.work || "",
      website: user?.website || "",
    },
    enableReinitialize: true, // This line is critical to update form when user changes
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        {/* Close Icon */}
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ width: 56, height: 56 }}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              formik.values.fname?.charAt(0) || ""
            )}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              {formik.values.fname} {formik.values.lname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{formik.values.email.split("@")[0]}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Form starts here */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>First Name:</Typography>
              <TextField
                id="fname"
                name="fname"
                size="small"
                value={formik.values.fname}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Last Name:</Typography>
              <TextField
                id="lname"
                name="lname"
                size="small"
                value={formik.values.lname}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            {/* <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Email:</Typography>
              <TextField
                name="email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack> */}
            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Description:</Typography>
              <TextField
                id="description"
                name="description"
                multiline
                rows={3}
                size="small"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Location:</Typography>
              <TextField
                id="city"
                name="city"
                size="small"
                value={formik.values.city}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Education:</Typography>
              <TextField
                name="education"
                size="small"
                value={formik.values.education}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Work:</Typography>
              <TextField
                id="work"
                name="work"
                size="small"
                value={formik.values.work}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={labelStyle}>Website:</Typography>
              <TextField
                id="website"
                name="website"
                size="small"
                value={formik.values.website}
                onChange={formik.handleChange}
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            {/* Buttons */}
            <Stack direction="row" justifyContent="flex-end" spacing={1} mt={4}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
