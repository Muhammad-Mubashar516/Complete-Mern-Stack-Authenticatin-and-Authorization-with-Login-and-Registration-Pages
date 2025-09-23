import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [suc, setSuc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard', { withCredentials: true })
      .then(res => {
        if (res.data.message === 'Success') {
          setSuc("Welcome! You have successfully logged in.");
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          {suc ? suc : "Loading your data..."}
        </p>

        <div className="dashboard-content">
          <p>✨ Here you can manage your profile, view updates, and explore features.</p>
          <button 
            className="dashboard-button" 
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
