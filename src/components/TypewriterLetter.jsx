import React, { useState, useEffect, useRef } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

export default function TypewriterLetter({ letterText }) {
    const [displayedText, setDisplayedText] = useState('');
    const timerRef = useRef(null);

    const startTyping = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplayedText('');
        let idx = 0;

        timerRef.current = setInterval(() => {
            if (idx < letterText.length) {
                setDisplayedText(prev => prev + letterText.charAt(idx));
                idx++;
            } else {
                clearInterval(timerRef.current);
            }
        }, 40);
    };

    useEffect(() => {
        startTyping();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [letterText]);

    const handleReplay = () => {
        playPopSound();
        startTyping();
    };

    return (
        <section className="letter-section">
            <div className="letter-container glass-card">
                <div className="letter-header">
                    <div className="stamp-icon">
                        <Heart size={22} fill="#ffffff" color="#ffffff" />
                    </div>
                    <h2>A Special Letter For You</h2>
                </div>
                <div className="letter-body">
                    <div className="typewriter-content">{displayedText}</div>
                </div>
                <div className="letter-footer">
                    <button onClick={handleReplay} className="btn btn-small">
                        <RotateCcw size={14} /> Read Again
                    </button>
                    <span className="signature">Forever Yours, ❤️</span>
                </div>
            </div>
        </section>
    );
}
