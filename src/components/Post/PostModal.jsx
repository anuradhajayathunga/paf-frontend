import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  LinearProgress,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { useDispatch } from "react-redux";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { createPostAction } from "../../Redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
  outline: "none",
};

const PostModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    // caption: yup.string().required("Caption is required"),
    img: yup.string().required("Photo is required"),
    video: yup.string().required("Video is required"),
    // category: yup.string().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      caption: "",
      keywords: "",
      img: "",
      video: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(createPostAction(values));
      handleClose();
    },
  });

  const handlePhotoChange = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setPhotoPreview(imageUrl);
    formik.setFieldTouched("img", true); // Set touched
    formik.setFieldValue("img", imageUrl);
    setIsLoading(false);
  };

  const handleVideoChange = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setVideoPreview(videoUrl);
    formik.setFieldTouched("video", true); // Set touched
    formik.setFieldValue("video", videoUrl);
    setIsLoading(false);
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 320;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const previews = [
    ...(photoPreview ? [{ type: "image", src: photoPreview }] : []),
    ...(videoPreview ? [{ type: "video", src: videoPreview }] : []),
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={600} className="text-xl font-semibold text-gray-800 mb-2">
            Create Photography Post
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            {/* Media Upload Section */}
            <Box>
              <InputLabel sx={{ mb: 1, fontWeight: 300, color: "#2563eb" }}>
                Media
              </InputLabel>

              <Stack direction="row" spacing={2}>
                {/* Photo Upload */}
                <label htmlFor="photo-upload" style={{ flex: 1 }}>
                  <input
                    accept="image/*"
                    id="photo-upload"
                    type="file"
                    hidden
                    onChange={handlePhotoChange}
                  />
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      border: "2px dashed",
                      borderRadius: 2,
                      p: 2,
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <CameraAltIcon sx={{ color: "#2563eb", mb: 1 }} />
                    <Typography
                      sx={{ fontWeight: 500, color: "#2563eb", fontSize: 14 }}
                    >
                      Add Photo
                    </Typography>
                  </Box>
                </label>

                {/* Video Upload */}
                <label htmlFor="video-upload" style={{ flex: 1 }}>
                  <input
                    accept="video/*"
                    id="video-upload"
                    type="file"
                    hidden
                    onChange={handleVideoChange}
                  />
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      border: "2px dashed",
                      borderRadius: 2,
                      p: 2,
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <VideoCameraBackIcon sx={{ color: "#2563eb", mb: 1 }} />
                    <Typography
                      sx={{ fontWeight: 500, color: "#2563eb", fontSize: 14 }}
                    >
                      Add Video
                    </Typography>
                  </Box>
                </label>
              </Stack>

              {/* Error Messages */}
              {formik.touched.img && formik.errors.img && (
                <Typography sx={{ color: "#ef4444", fontSize: 12, mt: 0.5 }}>
                  {formik.errors.img}
                </Typography>
              )}
              {formik.touched.video && formik.errors.video && (
                <Typography sx={{ color: "#ef4444", fontSize: 12, mt: 0.5 }}>
                  {formik.errors.video}
                </Typography>
              )}

              {/* Preview Section  */}
              {previews.length > 0 && (
                <Box position="relative" mt={2}>
                  <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      zIndex: 1,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <ArrowBackIos />
                  </IconButton>

                  <Box
                    ref={scrollRef}
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 2,
                      px: 5,
                      py: 2,
                      scrollSnapType: "x mandatory",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {previews.map((preview, index) => (
                      <Box
                        key={index}
                        sx={{
                          minWidth: "300px",
                          flexShrink: 0,
                          scrollSnapAlign: "start",
                        }}
                      >
                        {preview.type === "video" ? (
                          <video
                            src={preview.src}
                            controls
                            style={{
                              width: "100%",
                              borderRadius: "10px",
                              maxHeight: "256px",
                            }}
                          />
                        ) : (
                          <img
                            src={preview.src}
                            alt="Preview"
                            style={{
                              width: "100%",
                              maxHeight: "256px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>

                  <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      zIndex: 1,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Caption */}
            <TextField
              label="Caption"
              name="caption"
              multiline
              rows={3}
              value={formik.values.caption}
              onChange={formik.handleChange}
              error={formik.touched.caption && Boolean(formik.errors.caption)}
              helperText={formik.touched.caption && formik.errors.caption}
              InputProps={{ style: { borderRadius: "10px" } }}
            />

            {/* Keywords */}
            <TextField
              label="Keywords (comma separated)"
              name="keywords"
              placeholder="e.g. landscape, portrait, long-exposure"
              value={formik.values.keywords}
              onChange={formik.handleChange}
              InputProps={{ style: { borderRadius: "10px" } }}
            />

            {/* Category */}
            {/* <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                displayEmpty
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  fontSize: "0.875rem",
                  border: "1px solid",
                  borderColor:
                    formik.touched.category && formik.errors.category
                      ? "#ef4444"
                      : "#d1d5db",
                }}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                <MenuItem value="landscape">Landscape</MenuItem>
                <MenuItem value="portrait">Portrait</MenuItem>
                <MenuItem value="wildlife">Wildlife</MenuItem>
                <MenuItem value="street">Street Photography</MenuItem>
                <MenuItem value="tutorial">Tutorial</MenuItem>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <Typography sx={{ color: "#ef4444", fontSize: 12, mt: 0.5 }}>
                  {formik.errors.category}
                </Typography>
              )}
            </FormControl> */}

            {/* Submit Button */}
            <Stack direction="row" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={
                  isLoading ||
                  uploadProgress > 0 ||
                  !formik.values.img ||
                  !formik.values.video
                }
                sx={{ borderRadius: "20px" }}
              >
                {isLoading ? "Uploading..." : "Share Post"}
              </Button>
            </Stack>
          </Stack>
        </form>

        <Backdrop
          sx={{ color: "#2563eb", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default PostModal;
