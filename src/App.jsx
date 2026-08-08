import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InstagramAuth from './components/InstagramAuth';
import LockdownScreen from './components/LockdownScreen';
import CelebrationHub from './components/CelebrationHub';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('insta_logged_in') === 'true';
    });

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <Routes>
            {/* Route 1: Instagram Authentication Login Screen */}
            <Route
                path="/"
                element={<InstagramAuth onLoginSuccess={handleLoginSuccess} />}
            />

            {/* Route 2: Pre-Birthday Date Countdown Lock Screen */}
            <Route
                path="/lock"
                element={<LockdownScreen />}
            />

            {/* Route 3: Full Birthday Celebration Hub */}
            <Route
                path="/celebration"
                element={<CelebrationHub />}
            />

            {/* Fallback to Instagram Auth */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
