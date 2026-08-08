import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Utensils, HeartHandshake, Star } from 'lucide-react';
import { playCheerChime } from '../utils/soundFx';

const defaultGifts = [
    {
        id: 1,
        icon: Utensils,
        title: 'Special Coupon #1',
        desc: '1x Romantic Candlelight Dinner & Late Night Ice Cream Date! 🍦🍷'
    },
    {
        id: 2,
        icon: HeartHandshake,
        title: 'Special Coupon #2',
        desc: 'Unlimited Warm Hugs & Long Drive Whenever You Want! 🚗❤️'
    },
    {
        id: 3,
        icon: Star,
        title: 'Special Coupon #3',
        desc: '1 Wish Granted (No Questions Asked, 100% Guaranteed)! ✨👑'
    }
];

export default function GiftSection() {
    const [openedGifts, setOpenedGifts] = useState({});

    const handleOpenGift = (id, event) => {
        if (!openedGifts[id]) {
            setOpenedGifts(prev => ({ ...prev, [id]: true }));
            playCheerChime();

            if (typeof confetti === 'function') {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 45,
                    spread: 55,
                    origin: { x, y }
                });
            }
        }
    };

    return (
        <section className="gift-section text-center">
            <div className="section-header">
                <h2 className="section-title">
                    <Gift size={28} style={{ display: 'inline', marginRight: 8 }} /> Unbox Your Birthday Presents!
                </h2>
                <p className="section-desc">Tap on any mystery gift box to unlock your romantic vouchers!</p>
            </div>

            <div className="gifts-grid">
                {defaultGifts.map((gift) => {
                    const isOpened = !!openedGifts[gift.id];
                    const IconComponent = gift.icon;

                    return (
                        <div
                            key={gift.id}
                            className={`gift-item ${isOpened ? 'opened' : ''}`}
                            onClick={(e) => handleOpenGift(gift.id, e)}
                        >
                            <div className="gift-box">
                                <div className="gift-lid"></div>
                                <div className="gift-ribbon"></div>
                                <div className="gift-body">
                                    <Gift size={42} className="gift-icon" />
                                </div>
                            </div>

                            {isOpened && (
                                <div className="gift-revealed-card glass-card">
                                    <IconComponent size={28} className="voucher-icon" />
                                    <h4>{gift.title}</h4>
                                    <p>{gift.desc}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
