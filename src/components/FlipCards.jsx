import React, { useState } from 'react';
import { Smile, HeartPulse, Sparkles, Laugh, ShieldCheck, Infinity as InfinityIcon, Quote, HeartHandshake } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

const defaultReasons = [
    { id: 1, title: 'Your Magical Smile', icon: Smile, text: 'The way your smile lights up even the darkest day and instantly brings warmth to my heart!' },
    { id: 2, title: 'Your Kind Heart', icon: HeartPulse, text: 'You care so genuinely about everyone around you, making the world a kinder and sweeter place.' },
    { id: 3, title: 'Sparkle In Your Eyes', icon: Sparkles, text: 'Whenever you talk about things you love, your eyes shine with a magic that I could look at forever.' },
    { id: 4, title: 'Your Cute Laughter', icon: Laugh, text: 'Your laughter is literally my favorite sound in the whole wide universe! It brings instant happiness.' },
    { id: 5, title: 'My Safe Haven', icon: ShieldCheck, text: 'Being with you feels like home. You give me comfort, strength, and peace no matter what happens.' },
    { id: 6, title: 'Everything About You', icon: InfinityIcon, text: 'Simply because you are uniquely YOU! Perfect in every single way, and I love you unconditionally!' }
];

export default function FlipCards() {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (id) => {
        playPopSound();
        setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="cards-section">
            <div className="section-header text-center">
                <h2 className="section-title">
                    <HeartHandshake size={28} style={{ display: 'inline', marginRight: 8 }} /> Reasons Why You're Amazing
                </h2>
                <p className="section-desc">Tap each card to flip and reveal a special reason why I adore you!</p>
            </div>

            <div className="cards-grid">
                {defaultReasons.map((card) => {
                    const IconComponent = card.icon;
                    const isFlipped = !!flipped[card.id];

                    return (
                        <div
                            key={card.id}
                            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                            onClick={() => toggleFlip(card.id)}
                        >
                            <div className="flip-card-inner">
                                <div className="flip-card-front glass-card">
                                    <div className="card-icon">
                                        <IconComponent size={36} />
                                    </div>
                                    <h3>Reason #{card.id}</h3>
                                    <p>{card.title}</p>
                                    <span className="flip-hint">Tap to flip 💫</span>
                                </div>
                                <div className="flip-card-back glass-card">
                                    <Quote size={24} className="quote-icon" />
                                    <p>{card.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
