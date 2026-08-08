import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Wand2 } from 'lucide-react';
import { playCheerChime } from '../utils/soundFx';

export default function Footer({ gfName }) {
    const handleCelebrateAgain = () => {
        playCheerChime();
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });
        }
    };

    return (
        <footer className="app-footer text-center">
            <div className="footer-card glass-card">
                <Sparkles size={36} className="footer-sparkle" />
                <h2 className="footer-title">
                    Happy Birthday Once Again, {gfName}! ❤️
                </h2>
                <p>May this year bring you endless happiness, good health, and glorious success!</p>
                <button onClick={handleCelebrateAgain} className="btn btn-primary pulse-btn">
                    <Wand2 size={20} /> Celebrate Again! 🎉
                </button>
                <div className="footer-credits">
                    Made with endless love & care for the most special girl! ✨
                </div>
            </div>
        </footer>
    );
}
