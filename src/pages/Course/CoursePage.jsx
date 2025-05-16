import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} from "../../Redux/LearningProgress/progress.actions";

const categories = ["Programming", "Design", "Marketing", "Business"];
const statuses = ["Not Started", "In Progress", "Completed"];

const LearningProgressManager = () => {
  const dispatch = useDispatch();
  const { progress, loading, error } = useSelector((state) => state.progress);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm());
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUserProgress());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpen = (data = null) => {
    if (data) {
      setFormData(data);
      setEditId(data.id);
    } else {
      setFormData(initialForm());
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialForm());
    setEditId(null);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "title",
      "startDate",
      "completedDate",
      "duration",
      "resources",
      "category",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    if (editId) {
      await dispatch(updateProgress(editId, formData));
    } else {
      await dispatch(createProgress(formData));
    }

    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this progress?")) {
      await dispatch(deleteProgress(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Learning Progress Tracker</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progress.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-4 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {item.category} • {item.status}
            </p>
            <p className="text-gray-700 text-sm">{item.description}</p>
            <p className="text-gray-500 text-xs mt-2">
              {item.startDate} → {item.completedDate || "Ongoing"}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpen(item)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editId ? "Update Progress" : "Add Progress"}</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              value={formData.startDate}
              onChange={handleChange}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />

            <TextField
              label="Completed Date"
              name="completedDate"
              type="date"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.completedDate}
              onChange={handleChange}
              error={!!errors.completedDate}
              helperText={errors.completedDate}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Duration (minutes)"
              name="duration"
              type="number"
              fullWidth
              required
              value={formData.duration}
              onChange={handleChange}
              error={!!errors.duration}
              helperText={errors.duration}
            />
            <TextField
              label="Status"
              name="status"
              fullWidth
              select
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            label="Category"
            name="category"
            select
            fullWidth
            required
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Reflections"
            name="reflections"
            fullWidth
            multiline
            rows={2}
            value={formData.reflections}
            onChange={handleChange}
          />
          <TextField
            label="Resources"
            name="resources"
            fullWidth
            multiline
            required
            rows={2}
            value={formData.resources}
            onChange={handleChange}
            error={!!errors.resources}
            helperText={errors.resources}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const initialForm = () => ({
  title: "",
  description: "",
  startDate: "",
  completedDate: "",
  duration: "",
  status: "Not Started",
  category: "Programming",
  reflections: "",
  resources: "",
});

export default LearningProgressManager;
