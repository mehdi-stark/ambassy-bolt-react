import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SearchPage } from './components/SearchPage';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { MerchantRegistrationPage } from './components/MerchantRegistrationPage';
import { AmbassadorsPage } from './components/AmbassadorsPage';
import { ProfilePage } from './components/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/merchant" element={<MerchantRegistrationPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <div className="lg:pl-60 pt-16 lg:pt-0">
                <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/ambassadors" element={<AmbassadorsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;