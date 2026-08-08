import React, { useState, useEffect } from 'react';
import { Crown, Clock, Calendar, Sparkles } from 'lucide-react';

export default function HeroSection({ gfName, startDate }) {
    const [counterMode, setCounterMode] = useState('sinceBirth'); // 'sinceBirth' | 'countdown'
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
    const [age, setAge] = useState(18);

    useEffect(() => {
        const calculateTime = () => {
            const birth = new Date(startDate || '2008-08-24');
            const now = new Date();

            // Calculate age
            let currentAge = now.getFullYear() - birth.getFullYear();
            const monthDiff = now.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
                currentAge--;
            }
            setAge(currentAge > 0 ? currentAge : 18);

            if (counterMode === 'sinceBirth') {
                // Total time lived since birth
                const diff = now - birth;
                if (diff < 0) {
                    setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
                    return;
                }
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const mins = Math.floor((diff / 1000 / 60) % 60);
                const secs = Math.floor((diff / 1000) % 60);

                setTimeLeft({
                    days: days.toString(),
                    hours: hours.toString().padStart(2, '0'),
                    mins: mins.toString().padStart(2, '0'),
                    secs: secs.toString().padStart(2, '0')
                });
            } else {
                // Countdown to next August 24
                let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
                if (now > nextBirthday) {
                    nextBirthday.setFullYear(now.getFullYear() + 1);
                }
                const diff = nextBirthday - now;
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
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [startDate, counterMode]);

    return (
        <section className="hero-section text-center">
            <div className="hero-badge">
                <Crown size={16} /> Celebrating {gfName}'s {age}th Birthday Milestone! 🎉
            </div>

            <h1 className="hero-title glow-text">
                Happy Birthday <br />
                <span className="gradient-text">My Princess {gfName}! 🎂</span>
            </h1>

            <p className="hero-subtitle">
                Born on <strong>24th August 2008</strong> ✨ Wishing you a day filled with endless smiles, sweet magic, and all the love in the world! You make every single day brighter just by existing. ❤️
            </p>

            <div className="counter-card glass-card">
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                    <button
                        className={`btn btn-small ${counterMode === 'sinceBirth' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCounterMode('sinceBirth')}
                    >
                        <Clock size={14} /> Days Lived (Since 24 Aug 2008)
                    </button>
                    <button
                        className={`btn btn-small ${counterMode === 'countdown' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCounterMode('countdown')}
                    >
                        <Calendar size={14} /> Birthday Countdown (24 Aug)
                    </button>
                </div>

                <h3 className="counter-heading">
                    <Sparkles size={18} style={{ display: 'inline', marginRight: 6 }} />
                    {counterMode === 'sinceBirth'
                        ? `Celebrating ${gfName}'s ${timeLeft.days} Days Of Spreading Joy!`
                        : `Countdown To 24th August Birthday!`}
                </h3>

                <div className="timer-grid">
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

                <p className="counter-caption">
                    {counterMode === 'sinceBirth'
                        ? '...and blessed to have you in this world every single second! 💖'
                        : '...counting down every second until the big celebration! 🎈'}
                </p>
            </div>
        </section>
    );
}
