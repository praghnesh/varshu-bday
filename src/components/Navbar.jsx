import React, { useRef } from 'react';
import { Heart, Music, Upload, Sliders } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

export default function Navbar({ gfName, isPlaying, onToggleMusic, onCustomMusicUpload, onOpenEditModal }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            playPopSound();
            onCustomMusicUpload(file);
        }
    };

    return (
        <header className="glass-header">
            <div className="nav-container">
                <div className="nav-brand">
                    <Heart size={20} className="logo-heart" fill="#ff2a74" />
                    <span>Happy Birthday {gfName}! ✨</span>
                </div>
                <div className="nav-actions">
                    <button onClick={onToggleMusic} className="icon-btn" title="Play/Pause Music">
                        <Music size={18} />
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="icon-btn" title="Change Background Song">
                        <Upload size={18} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="audio/*"
                        style={{ display: 'none' }}
                    />
                    <button onClick={onOpenEditModal} className="icon-btn" title="Customize Messages & Name">
                        <Sliders size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
