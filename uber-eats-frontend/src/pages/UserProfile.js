import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, Button, Alert, Image, Row, Col } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Select from 'react-select';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    );
    const result = await response.json();
    console.log(result);
    setCountries(result.countries);
  }
  fetchCountries();
  }, []);
  
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(endpoints.customerProfile);
      console.log('Fetched profile:', response.data);

      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (formData) => {
    try {
      const response = await api.patch(endpoints.updateProfile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess(false);
    setLoading(true);
  
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      });
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }
      const response = await updateProfile(formData);
      setProfile(response.data);
      setUpdateSuccess(true);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profile_picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (!user) return <Alert variant="warning">Please log in to view your profile.</Alert>;
  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!profile) return null;
  
  console.log('Current profile state:', profile);

  return (
    <Form onSubmit={handleSubmit}>
      {updateSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
      
      <Row className="mb-3">
        <Col md={4}>
          <Image src={profile.profile_picture || 'default-avatar.png'} roundedCircle fluid />
          <Form.Group controlId="formProfilePicture" className="mt-2">
            <Form.Label>Update Profile Picture</Form.Label>
            <Form.Control type="file" onChange={handleProfilePictureChange} accept="image/*" />
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="name"
              value={profile.name || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicNickname" className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nickname"
              name="nickname"
              value={profile.nickname || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDateOfBirth" className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              value={profile.date_of_birth || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={profile.email || ''}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPhone" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          name="phone_number"
          value={profile.phone_number || ''}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCity" className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={profile.city || ''}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicState" className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter state"
          name="state"
          value={profile.state || ''}
          onChange={handleInputChange}
        />
      </Form.Group>

       <Form.Group controlId="formBasicState" className="mb-3">
        <Form.Label>Country</Form.Label>
        <Select
      options={countries}
      value={countries.filter(x => x.value === profile.country)}
      onChange={(e)=> setProfile(prev => ({...prev, country:e.value}))}
    />
      </Form.Group> 
      
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </Form>
  );
}

export default UserProfile;