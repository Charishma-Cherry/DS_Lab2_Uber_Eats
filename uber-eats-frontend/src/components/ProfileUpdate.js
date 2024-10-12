// import React, { useState, useEffect } from 'react';
// import { updateProfile } from './api';
// //import CountryDropdown from './CountryDropdown';

// function ProfileUpdate() {
//   const [profile, setProfile] = useState({
//    // name : '',
//     //email: '',
//     //phone_number: '',
//     //country: null,
//    // profile_picture: null,
//   });

//   useEffect(() => {
//     // Fetch current profile data
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCountryChange = (selectedOption) => {
//    setProfile(prev => ({ ...prev, country: selectedOption }));
//   };

//   const handleFileChange = (e) => {
//     setProfile(prev => ({ ...prev, profile_picture: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(profile).forEach(key => {
//       if (profile[key] !== null) {
//         formData.append(key, profile[key]);
//       }
//     });

//     try {
//       console.log(formData);
//       const response = await updateProfile(formData);
//       console.log('Profile updated:', response.data);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {<input
//         type="text"
//         name="name"
//         value={profile.name}
//         onChange={handleChange}
//         placeholder="Enter full name"
//       /> }
//       { <input
//         type="email"
//         name="email"
//         value={profile.email}
//         onChange={handleChange}
//         placeholder="Email"
//       /> }
//       { <input
//         type="tel"
//         name="phone_number"
//         value={profile.phone_number}
//         onChange={handleChange}
//         placeholder="Phone Number"
//       /> }
//       {<input
//         type="file"
//         name="profile_picture"
//         onChange={handleFileChange}
//       />}
//       <button type="submit">Update Profile</button>
//     </form>
//   )
// }

// export default ProfileUpdate;


