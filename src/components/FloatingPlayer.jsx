import React from 'react';
import { Play, Pause } from 'lucide-react';

export default function FloatingPlayer({ isPlaying, trackName, onTogglePlay, isVisible }) {
    if (!isVisible) return null;

    return (
        <div className={`glass-pill floating-player ${!isVisible ? 'hidden' : ''}`}>
            <div className="player-info">
                <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                    <span className="bar bar4"></span>
                </div>
                <div className="track-details">
                    <span className="track-name">{trackName || 'Happy Birthday Special Melodies 🎶'}</span>
                    <span className="track-status">
                        {isPlaying ? 'Playing romantic tune' : 'Music paused'}
                    </span>
                </div>
            </div>
            <button onClick={onTogglePlay} className="mini-play-btn" aria-label="Toggle playback">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
        </div>
    );
}
