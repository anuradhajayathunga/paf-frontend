import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchUserPlans, 
  fetchPlanById, 
  createLearningPlan, 
  updateLearningPlan, 
  deleteLearningPlan 
} from '../../Redux/LearningPlan/learnplan.action';
import { 
  Button, 
  Card, 
  CardContent,
  Container, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Paper, 
  CircularProgress, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Link,
  Grid,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
  Stack
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaptopIcon from '@mui/icons-material/Laptop';

const LearningPlanDashboard = () => {
  const dispatch = useDispatch();
  const { plans, currentPlan, loading, error, success } = useSelector(state => state.learningPlans);
  
  // Local state for form and modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceLink: '',
    timeline: '',
    status: 'Not Started',
    topicsJson: '[]'
  });
  
  // Fixed topics state to handle the JSON parsing issues
  const [topicsInput, setTopicsInput] = useState('');
  
  // Fetch user's learning plans on component mount
  useEffect(() => {
    dispatch(fetchUserPlans());
  }, [dispatch]);
  
  // Reset form data when modals close
  useEffect(() => {
    if (!showCreateModal && !showEditModal) {
      setFormData({
        title: '',
        description: '',
        resourceLink: '',
        timeline: '',
        status: 'Not Started',
        topicsJson: '[]'
      });
      setTopicsInput('');
    }
  }, [showCreateModal, showEditModal]);
  
  // Populate form when editing
  useEffect(() => {
    if (showEditModal && currentPlan) {
      setFormData({
        title: currentPlan.title || '',
        description: currentPlan.description || '',
        resourceLink: currentPlan.resourceLink || '',
        timeline: currentPlan.timeline || '',
        status: currentPlan.status || 'Not Started',
        topicsJson: currentPlan.topicsJson || '[]'
      });
      
      // Set topics input for the form
      try {
        const topics = JSON.parse(currentPlan.topicsJson || '[]');
        setTopicsInput(Array.isArray(topics) ? topics.join(', ') : '');
      } catch (err) {
        console.error('Error parsing topics:', err);
        setTopicsInput('');
      }
    }
  }, [showEditModal, currentPlan]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle topics input changes - Fixed to properly handle the JSON
  const handleTopicsChange = (e) => {
    const topicsString = e.target.value;
    setTopicsInput(topicsString);
    
    // Convert comma-separated string to JSON array
    try {
      const topicsArray = topicsString.split(',').map(topic => topic.trim()).filter(topic => topic);
      setFormData({
        ...formData,
        topicsJson: JSON.stringify(topicsArray)
      });
    } catch (err) {
      console.error('Error parsing topics:', err);
    }
  };
  
  // Handle creating a new learning plan
  const handleCreatePlan = (e) => {
    e.preventDefault();
    
    // Format the data for API submission
    const planData = {
      ...formData
    };
    
    dispatch(createLearningPlan(planData))
      .then(() => {
        setShowCreateModal(false);
        dispatch(fetchUserPlans());
      })
      .catch(err => console.error('Error creating plan:', err));
  };
  
  // Handle editing an existing learning plan
  const handleUpdatePlan = (e) => {
    e.preventDefault();
    
    if (!currentPlan) return;
    
    // Format the data for API submission
    const planData = {
      ...formData
    };
    
    dispatch(updateLearningPlan(currentPlan.id, planData))
      .then(() => {
        setShowEditModal(false);
        dispatch(fetchUserPlans());
      })
      .catch(err => console.error('Error updating plan:', err));
  };
  
  // Handle deleting a learning plan
  const handleDeletePlan = () => {
    if (!currentPlan) return;
    
    dispatch(deleteLearningPlan(currentPlan.id))
      .then(() => {
        setShowDeleteModal(false);
        dispatch(fetchUserPlans());
      })
      .catch(err => console.error('Error deleting plan:', err));
  };
  
  // Set current plan and open edit modal
  const openEditModal = (plan) => {
    dispatch(fetchPlanById(plan.id))
      .then(() => setShowEditModal(true))
      .catch(err => console.error('Error fetching plan details:', err));
  };
  
  // Set current plan and open delete modal
  const openDeleteModal = (plan) => {
    dispatch(fetchPlanById(plan.id))
      .then(() => setShowDeleteModal(true))
      .catch(err => console.error('Error fetching plan details:', err));
  };

  // Helper to render topics as chips - Fixed to properly handle JSON parsing
  const renderTopics = (topicsJson) => {
    try {
      const topics = JSON.parse(topicsJson || '[]');
      if (!Array.isArray(topics) || topics.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No topics defined
          </Typography>
        );
      }
      
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {topics.map((topic, index) => (
            <Chip 
              key={index} 
              label={topic} 
              color="primary" 
              size="small" 
              variant="outlined"
              sx={{ 
                borderRadius: '16px',
                fontWeight: 500,
                '& .MuiChip-label': { px: 1.5 }
              }} 
            />
          ))}
        </Box>
      );
    } catch (err) {
      console.error('Error parsing topics JSON:', err);
      return (
        <Typography variant="body2" color="error">
          Invalid topics format
        </Typography>
      );
    }
  };

  // Status icon and color mapping
  const getStatusInfo = (status) => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('complete')) {
      return { 
        color: 'success',
        icon: <CheckCircleIcon />,
        bgColor: '#e6f7ea', // Light green background
        textColor: '#2e7d32' // Success text color
      };
    }
    if (statusLower.includes('progress')) {
      return { 
        color: 'primary',
        icon: <LaptopIcon />,
        bgColor: '#e3f2fd', // Light blue background
        textColor: '#1976d2' // Primary text color
      };
    }
    if (statusLower.includes('overdue') || statusLower.includes('stuck')) {
      return { 
        color: 'error',
        icon: <ErrorOutlineIcon />,
        bgColor: '#fdecea', // Light red background
        textColor: '#d32f2f' // Error text color
      };
    }
    if (statusLower.includes('paused')) {
      return { 
        color: 'warning',
        icon: <PauseCircleOutlineIcon />,
        bgColor: '#fff4e5', // Light orange background
        textColor: '#ed6c02' // Warning text color
      };
    }
    return { 
      color: 'default',
      icon: <HourglassEmptyIcon />,
      bgColor: '#f5f5f5', // Light grey background
      textColor: '#757575' // Grey text color
    };
  };

  // Render a single learning plan card
  const renderPlanCard = (plan) => {
    const statusInfo = getStatusInfo(plan.status);
    
    return (
      <Card 
        elevation={2}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4
          }
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: statusInfo.bgColor,
                color: statusInfo.textColor,
                mr: 1.5
              }}
            >
              <BookmarkIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" component="h2" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                {plan.title}
              </Typography>
              <Chip 
                icon={statusInfo.icon}
                label={plan.status || 'Not Started'} 
                color={statusInfo.color}
                size="small"
                sx={{ height: 24 }}
              />
            </Box>
          </Box>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => openEditModal(plan)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => openDeleteModal(plan)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Divider />
        
        <CardContent sx={{ flexGrow: 1, py: 2 }}>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
            {plan.description || 'No description provided.'}
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Topics
          </Typography>
          {renderTopics(plan.topicsJson)}
          
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {plan.resourceLink && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkIcon fontSize="small" color="action" />
                <Link 
                  href={plan.resourceLink} 
                  target="_blank" 
                  rel="noopener"
                  sx={{ 
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View Resource
                </Link>
              </Box>
            )}
            
            {plan.timeline && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {plan.timeline}
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: '#1976d2',
              mb: 0.5
            }}
          >
            My Learning Plans
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your learning progress and manage your education goals
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowCreateModal(true)}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          Create Plan
        </Button>
      </Box>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : plans.length === 0 ? (
        <Paper 
          sx={{ 
            textAlign: 'center', 
            p: 5, 
            borderRadius: 2,
            bgcolor: '#f5f9ff'
          }}
        >
          <img 
            src="/api/placeholder/240/180" 
            alt="No plans" 
            style={{ opacity: 0.7, marginBottom: 24 }}
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            No Learning Plans Found
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            Create your first learning plan to start tracking your skills development journey.
            Define goals, set timelines, and monitor your progress all in one place.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setShowCreateModal(true)}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600
            }}
          >
            Create First Plan
          </Button>
        </Paper>
      ) : (
        <Grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <Grid item key={plan.id}  className="flex-grow basis-[calc(33.333%-1.25rem)] flex flex-col gap-5">
              {renderPlanCard(plan)}
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Create Plan Modal */}
      <Dialog 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Create Learning Plan
          </Typography>
        </DialogTitle>
        <form onSubmit={handleCreatePlan}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Description"
              multiline
              rows={3}
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Resource Link"
              type="url"
              fullWidth
              required
              name="resourceLink"
              value={formData.resourceLink}
              onChange={handleInputChange}
              placeholder="https://example.com/course"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Timeline"
              type="text"
              fullWidth
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="2 weeks, 3 months, etc."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Topics (comma separated)"
              type="text"
              fullWidth
              value={topicsInput}
              onChange={handleTopicsChange}
              placeholder="Spring Boot, JPA, REST API"
              variant="outlined"
              sx={{ mb: 2 }}
              helperText="Enter topics separated by commas (e.g. React, Redux, TypeScript)"
            />
            
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="create-status-label">Status</InputLabel>
              <Select
                labelId="create-status-label"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Paused">Paused</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setShowCreateModal(false)} 
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{ 
                px: 3,
                borderRadius: 1.5,
                fontWeight: 600
              }}
            >
              {loading ? 'Creating...' : 'Create Plan'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Edit Plan Modal */}
      <Dialog 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Edit Learning Plan
          </Typography>
        </DialogTitle>
        <form onSubmit={handleUpdatePlan}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Description"
              multiline
              rows={3}
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Resource Link"
              type="url"
              fullWidth
              name="resourceLink"
              value={formData.resourceLink}
              onChange={handleInputChange}
              placeholder="https://example.com/course"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Timeline"
              type="text"
              fullWidth
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="2 weeks, 3 months, etc."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Topics (comma separated)"
              type="text"
              fullWidth
              value={topicsInput}
              onChange={handleTopicsChange}
              placeholder="Spring Boot, JPA, REST API"
              variant="outlined"
              sx={{ mb: 2 }}
              helperText="Enter topics separated by commas (e.g. React, Redux, TypeScript)"
            />
            
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="edit-status-label">Status</InputLabel>
              <Select
                labelId="edit-status-label"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Paused">Paused</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setShowEditModal(false)} 
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{ 
                px: 3,
                borderRadius: 1.5,
                fontWeight: 600
              }}
            >
              {loading ? 'Updating...' : 'Update Plan'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'error.main' }}>
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the learning plan <strong>{currentPlan?.title}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setShowDeleteModal(false)} 
            color="inherit"
            sx={{ fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePlan}
            variant="contained" 
            color="error"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            sx={{ 
              px: 3,
              borderRadius: 1.5,
              fontWeight: 600
            }}
          >
            {loading ? 'Deleting...' : 'Delete Plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LearningPlanDashboard;