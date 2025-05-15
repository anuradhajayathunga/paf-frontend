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
  CardActions, 
  Container, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Alert, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Link
} from '@mui/material';

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

  // Handle topics input changes
  const handleTopicsChange = (e) => {
    const topicsString = e.target.value;
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
  
  // Get topics as a comma-separated string for display in form
  const getTopicsString = () => {
    try {
      const topics = JSON.parse(formData.topicsJson || '[]');
      return Array.isArray(topics) ? topics.join(', ') : '';
    } catch (err) {
      console.error('Error parsing topics JSON:', err);
      return '';
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

  // Helper to render topics as chips
  const renderTopics = (topicsJson) => {
    try {
      const topics = JSON.parse(topicsJson || '[]');
      if (!Array.isArray(topics) || topics.length === 0) {
        return <Typography variant="body2" color="text.secondary">No topics defined</Typography>;
      }
      
      return topics.map((topic, index) => (
        <Chip key={index} label={topic} color="info" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
      ));
    } catch (err) {
      console.error('Error parsing topics JSON:', err);
      return <Typography variant="body2" color="text.secondary">Invalid topics format</Typography>;
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('complete')) return 'success';
    if (statusLower.includes('progress')) return 'primary';
    if (statusLower.includes('overdue') || statusLower.includes('stuck')) return 'error';
    if (statusLower.includes('paused')) return 'warning';
    return 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">My Learning Plans</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowCreateModal(true)}>
          Create New Plan
        </Button>
      </Box>
      
      {/* {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} */}
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : plans.length === 0 ? (
        <Card sx={{ textAlign: 'center', p: 5 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>No Learning Plans Found</Typography>
            <Typography variant="body1" paragraph>
              Create your first learning plan to start tracking your skills development journey.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setShowCreateModal(true)}>
              Create New Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Topics</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>Timeline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.title}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                  <TableCell>
                    {renderTopics(plan.topicsJson)}
                  </TableCell>
                  <TableCell>
                    {plan.resourceLink ? (
                      <Link href={plan.resourceLink} target="_blank" rel="noopener">
                        Resource Link
                      </Link>
                    ) : (
                      'No resource'
                    )}
                  </TableCell>
                  <TableCell>
                    {plan.timeline || 'Not specified'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={plan.status || 'Not Started'} 
                      color={getStatusColor(plan.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => openEditModal(plan)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        onClick={() => openDeleteModal(plan)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Create Plan Modal */}
      <Dialog 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Learning Plan</DialogTitle>
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
              value={getTopicsString()}
              onChange={handleTopicsChange}
              placeholder="Spring Boot, JPA, REST API"
              variant="outlined"
              sx={{ mb: 2 }}
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
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setShowCreateModal(false)} color="inherit">
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
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
      >
        <DialogTitle>Edit Learning Plan</DialogTitle>
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
              value={getTopicsString()}
              onChange={handleTopicsChange}
              placeholder="Spring Boot, JPA, REST API"
              variant="outlined"
              sx={{ mb: 2 }}
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
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setShowEditModal(false)} color="inherit">
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
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
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the learning plan <strong>{currentPlan?.title}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setShowDeleteModal(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePlan}
            variant="contained" 
            color="error"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Deleting...' : 'Delete Plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LearningPlanDashboard;