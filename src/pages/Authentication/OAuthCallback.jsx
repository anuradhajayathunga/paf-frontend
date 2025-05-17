import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Save the token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect to dashboard
      navigate('/home');
    } else {
      // Handle error - no token received
      console.error('No token received from OAuth provider');
      navigate('/login', { state: { error: 'Authentication failed' } });
    }
  }, [location, navigate]);

  return (
    <div className="oauth-callback">
      <h2>Processing your login...</h2>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default OAuthCallback;