import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import SparkleCanvas from './SparkleCanvas';
import EnvelopeOverlay from './EnvelopeOverlay';
import Navbar from './Navbar';
import FloatingPlayer from './FloatingPlayer';
import HeroSection from './HeroSection';
import CakeSection from './CakeSection';
import TypewriterLetter from './TypewriterLetter';
import FlipCards from './FlipCards';
import PhotoGallery from './PhotoGallery';
import GiftSection from './GiftSection';
import Footer from './Footer';
import EditModal from './EditModal';
import LightboxModal from './LightboxModal';
import { playCheerChime } from '../utils/soundFx';

export default function CelebrationHub() {
    const [showEnvelope, setShowEnvelope] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackName, setTrackName] = useState('Happy Birthday Special Melodies 🎶');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [config, setConfig] = useState(() => ({
        gfName: localStorage.getItem('gf_name') || 'Varshu',
        startDate: localStorage.getItem('start_date') || '2008-08-24',
        letterText: localStorage.getItem('letter_text') || `Dearest Varshu, 

On your special day, I want to remind you how deeply loved and appreciated you are. You bring so much joy, laughter, and sweet light into my life every single day.

May all your dreams come true this year. I promise to stand by your side, support your ambitions, and love you more with every passing second.

Happy Birthday, My Princess! ❤️`
    }));

    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', caption: '' });

    const audioRef = useRef(null);

    const triggerConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    };

    const handleOpenEnvelope = () => {
        setShowEnvelope(false);
        triggerConfetti();
        playCheerChime();
        handleToggleMusic();
    };

    const handleToggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => {
                console.log('Audio play error:', err);
            });
        }
    };

    const handleCustomMusicUpload = (file) => {
        const url = URL.createObjectURL(file);
        if (audioRef.current) {
            audioRef.current.src = url;
            setTrackName(`Custom Track: ${file.name}`);
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            });
        }
    };

    const handleSaveConfig = (newConfig) => {
        setConfig(newConfig);
        localStorage.setItem('gf_name', newConfig.gfName);
        localStorage.setItem('start_date', newConfig.startDate);
        localStorage.setItem('letter_text', newConfig.letterText);
        triggerConfetti();
    };

    const handleOpenLightbox = (src, caption) => {
        setLightbox({ isOpen: true, src, caption });
    };

    const handleCloseLightbox = () => {
        setLightbox({ isOpen: false, src: '', caption: '' });
    };

    return (
        <div className="app-container">
            <SparkleCanvas />

            <audio
                ref={audioRef}
                src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=happy-birthday-155461.mp3"
                loop
                preload="auto"
            />

            {showEnvelope && (
                <EnvelopeOverlay
                    gfName={config.gfName}
                    onOpen={handleOpenEnvelope}
                />
            )}

            <Navbar
                gfName={config.gfName}
                isPlaying={isPlaying}
                onToggleMusic={handleToggleMusic}
                onCustomMusicUpload={handleCustomMusicUpload}
                onOpenEditModal={() => setIsEditModalOpen(true)}
            />

            <FloatingPlayer
                isPlaying={isPlaying}
                trackName={trackName}
                onTogglePlay={handleToggleMusic}
                isVisible={!showEnvelope}
            />

            <main className="main-content">
                <HeroSection
                    gfName={config.gfName}
                    startDate={config.startDate}
                />

                <CakeSection />

                <TypewriterLetter
                    letterText={config.letterText}
                />

                <FlipCards />

                <PhotoGallery
                    onOpenLightbox={handleOpenLightbox}
                />

                <GiftSection />

                <Footer
                    gfName={config.gfName}
                />
            </main>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                config={config}
                onSave={handleSaveConfig}
            />

            <LightboxModal
                isOpen={lightbox.isOpen}
                onClose={handleCloseLightbox}
                imgSrc={lightbox.src}
                caption={lightbox.caption}
            />
        </div>
    );
}
