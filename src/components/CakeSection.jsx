import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wind, Flame, Cake } from 'lucide-react';
import { playPopSound, playCheerChime } from '../utils/soundFx';

export default function CakeSection() {
    const [extinguished, setExtinguished] = useState([false, false, false]);
    const [wishMade, setWishMade] = useState(false);

    const triggerConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    };

    const extinguishCandle = (index) => {
        if (!extinguished[index]) {
            playPopSound();
            const nextState = [...extinguished];
            nextState[index] = true;
            setExtinguished(nextState);

            if (nextState.every(Boolean)) {
                setTimeout(() => {
                    setWishMade(true);
                    playCheerChime();
                    triggerConfetti();
                }, 300);
            }
        }
    };

    const blowAllCandles = () => {
        playPopSound();
        setExtinguished([true, true, true]);
        setTimeout(() => {
            setWishMade(true);
            playCheerChime();
            triggerConfetti();
        }, 300);
    };

    const relightCandles = () => {
        playPopSound();
        setExtinguished([false, false, false]);
        setWishMade(false);
    };

    return (
        <section className="cake-section text-center">
            <div className="section-header">
                <h2 className="section-title">
                    <Cake size={28} style={{ display: 'inline', marginRight: 8 }} /> Make A Birthday Wish!
                </h2>
                <p className="section-desc">Tap or click on the glowing candle flames to blow them out!</p>
            </div>

            <div className="cake-container">
                {wishMade && (
                    <div className="wish-banner">
                        🎉 Yay! Wish Made! May all your dreams come true, my love! 🌟
                    </div>
                )}

                <div className="cake">
                    <div className="candles-wrapper">
                        {[0, 1, 2].map((idx) => (
                            <div
                                key={idx}
                                className={`candle ${extinguished[idx] ? 'extinguished' : ''}`}
                                onClick={() => extinguishCandle(idx)}
                            >
                                <div className="flame"></div>
                                <div className="wick"></div>
                                <div className="candle-body"></div>
                            </div>
                        ))}
                    </div>

                    <div className="cake-tier tier-top">
                        <div className="icing"></div>
                        <div className="strawberry-decor">
                            <span>🍓</span><span>🍓</span><span>🍓</span>
                        </div>
                    </div>
                    <div className="cake-tier tier-middle">
                        <div className="icing"></div>
                    </div>
                    <div className="cake-tier tier-bottom">
                        <div className="icing"></div>
                    </div>
                    <div className="cake-stand"></div>
                </div>

                <div className="cake-action-btns">
                    {!wishMade ? (
                        <button onClick={blowAllCandles} className="btn btn-secondary">
                            <Wind size={20} /> Tap Here to Blow Candles Out!
                        </button>
                    ) : (
                        <button onClick={relightCandles} className="btn btn-outline">
                            <Flame size={20} /> Relight Candles 🕯️
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
