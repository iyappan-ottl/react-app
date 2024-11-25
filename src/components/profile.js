import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:3001/api/auth/profile', {
      headers: { Authorization: token },
    }).then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  return profile ? (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  ) : <p>Loading...</p>;
};

export default Profile;