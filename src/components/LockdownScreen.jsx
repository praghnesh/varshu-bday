import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Clock, Sparkles, KeyRound, Heart } from 'lucide-react';
import { playPopSound, playCheerChime } from '../utils/soundFx';

export default function LockdownScreen() {
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
    const [showPasscodeModal, setShowPasscodeModal] = useState(false);
    const [overrideCode, setOverrideCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const targetDateStr = '2026-08-24T00:00:00+05:30';

    useEffect(() => {
        const calculateCountdown = () => {
            const target = new Date(targetDateStr);
            const now = new Date();
            const diff = target - now;

            if (diff <= 0) {
                // Time arrived! Redirect to celebration!
                navigate('/celebration');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / 1000 / 60) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            setTimeLeft({
                days: days.toString().padStart(2, '0'),
                hours: hours.toString().padStart(2, '0'),
                mins: mins.toString().padStart(2, '0'),
                secs: secs.toString().padStart(2, '0')
            });
        };

        calculateCountdown();
        const timer = setInterval(calculateCountdown, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const handleOverrideSubmit = (e) => {
        e.preventDefault();
        playPopSound();
        if (['2408', '1234', 'love', 'varshu', '24082008'].includes(overrideCode.trim().toLowerCase())) {
            localStorage.setItem('early_unlocked', 'true');
            playCheerChime();
            navigate('/celebration');
        } else {
            setErrorMsg('Incorrect passcode!');
        }
    };

    return (
        <div className="overlay-screen" style={{ background: 'linear-gradient(135deg, #0d0714 0%, #1a0b2e 50%, #2b0826 100%)', padding: 20 }}>
            <div className="glass-card text-center" style={{ maxWidth: 550, width: '100%', padding: '40px 25px', border: '1.5px solid rgba(255, 42, 116, 0.4)' }}>

                {/* Lock Badge */}
                <div style={{ width: 75, height: 75, borderRadius: '50%', background: 'rgba(255, 42, 116, 0.15)', border: '2px dashed var(--primary-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 25px var(--pink-glow)' }}>
                    <Lock size={36} color="var(--primary-pink)" />
                </div>

                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'var(--rose-gold)', marginBottom: 12 }}>
                    Surprise Locked Until <br />
                    <span className="gradient-text">24th August 2026! 🔒</span>
                </h1>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: 450, margin: '0 auto 30px' }}>
                    Shhh... Inka time undhi my love! 🤫 Your birthday surprise is safely locked until <strong>24th August 00:00 AM</strong>. Count down every second below!
                </p>

                {/* Live Countdown Grid */}
                <div className="timer-grid" style={{ marginBottom: 30 }}>
                    <div className="timer-box">
                        <span className="timer-num">{timeLeft.days}</span>
                        <span className="timer-label">Days</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-num">{timeLeft.hours}</span>
                        <span className="timer-label">Hours</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-num">{timeLeft.mins}</span>
                        <span className="timer-label">Minutes</span>
                    </div>
                    <div className="timer-box">
                        <span className="timer-num">{timeLeft.secs}</span>
                        <span className="timer-label">Seconds</span>
                    </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px 20px', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: 25, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Heart size={18} fill="var(--primary-pink)" color="var(--primary-pink)" className="pulse-heart" />
                    <span style={{ fontSize: '0.9rem', color: '#fff', fontStyle: 'italic' }}>
                        Patience my princess, something magical is waiting for you! ✨
                    </span>
                </div>

                <div>
                    <button
                        onClick={() => setShowPasscodeModal(true)}
                        className="btn btn-outline btn-small"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                        <KeyRound size={16} /> Boyfriend Early Preview Unlock
                    </button>
                </div>
            </div>

            {/* Secret Bypass Modal */}
            {showPasscodeModal && (
                <div className="modal">
                    <div className="modal-card glass-card" style={{ maxWidth: 360 }}>
                        <h3 style={{ marginBottom: 10, color: 'var(--rose-gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Sparkles size={18} /> Early Access Passcode
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 15 }}>
                            Enter secret bypass code (e.g. 2408 or 1234):
                        </p>
                        {errorMsg && (
                            <div style={{ color: 'var(--primary-pink)', fontSize: '0.85rem', marginBottom: 10 }}>
                                {errorMsg}
                            </div>
                        )}
                        <form onSubmit={handleOverrideSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Passcode (2408)"
                                value={overrideCode}
                                onChange={(e) => setOverrideCode(e.target.value)}
                                style={{ marginBottom: 15 }}
                                autoFocus
                            />
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-small" onClick={() => setShowPasscodeModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-small">
                                    Unlock Now 💖
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
