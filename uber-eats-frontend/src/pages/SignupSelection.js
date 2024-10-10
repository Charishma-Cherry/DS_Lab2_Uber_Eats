// src/pages/SignupSelection.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignupSelection() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h2>Hey! Are you new here? </h2>
      <Button
        variant="primary"
        className="mt-3"
        onClick={() => navigate('/signup')}
      >
        User Signup
      </Button>
      <Button
        variant="secondary"
        className="mt-3"
        onClick={() => navigate('/restaurant/signup')}
      >
        Restaurant Signup
      </Button>
      <Button 
        variant="secondary" 
        className="mt-3" 
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Container>
  );
}

export default SignupSelection;
