import React from 'react';
import { Heart, MailOpen } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

export default function EnvelopeOverlay({ gfName, onOpen }) {
    const handleOpen = () => {
        playPopSound();
        onOpen();
    };

    return (
        <div className="overlay-screen">
            <div className="envelope-card glass-card">
                <div className="wax-seal">
                    <Heart className="pulse-heart" size={32} color="#ffffff" fill="#ffffff" />
                </div>
                <h1 className="envelope-title">
                    Special Delivery For <br />
                    <span className="highlight-name">{gfName}</span> 💌
                </h1>
                <p className="envelope-subtitle">
                    Someone made something really special just for you!
                </p>
                <button onClick={handleOpen} className="btn btn-primary pulse-btn">
                    <MailOpen size={20} /> Tap To Open Your Surprise ✨
                </button>
            </div>
        </div>
    );
}
