// src/pages/UserProfile.js
import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/customers/me/');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess(false);
    setLoading(true);
    try {
      const response = await api.put('/customers/me/', profile);
      setProfile(response.data);
      setUpdateSuccess(true);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!profile) return null;

  return (
    <Form onSubmit={handleSubmit}>
      {updateSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </Form.Group>

      {/* Add more form fields for other profile information */}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </Form>
  );
}

export default UserProfile;