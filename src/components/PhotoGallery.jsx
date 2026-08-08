import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

const defaultPhotos = [
    { id: 1, defaultSrc: '/assets/photo1.png', caption: 'Watching Golden Sunsets Together 🌅', rotateClass: '' },
    { id: 2, defaultSrc: '/assets/photo2.png', caption: 'Holding Hands Through Every Journey 🤝', rotateClass: 'rotate-right' },
    { id: 3, defaultSrc: '/assets/photo3.png', caption: 'The Cutest Smile In The World 😊', rotateClass: 'rotate-left' }
];

export default function PhotoGallery({ onOpenLightbox }) {
    const [photos, setPhotos] = useState({});
    const fileInputRefs = useRef({});

    useEffect(() => {
        const loaded = {};
        defaultPhotos.forEach(p => {
            const saved = localStorage.getItem(`custom_photo_${p.id}`);
            loaded[p.id] = saved || p.defaultSrc;
        });
        setPhotos(loaded);
    }, []);

    const handlePhotoChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const imgData = evt.target.result;
                setPhotos(prev => ({ ...prev, [id]: imgData }));
                localStorage.setItem(`custom_photo_${id}`, imgData);
                playPopSound();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="gallery-section">
            <div className="section-header text-center">
                <h2 className="section-title">
                    <Camera size={28} style={{ display: 'inline', marginRight: 8 }} /> Precious Moments Gallery
                </h2>
                <p className="section-desc">Tap on any photo to zoom, or upload your favorite pictures!</p>
            </div>

            <div className="gallery-grid">
                {defaultPhotos.map((item) => {
                    const currentSrc = photos[item.id] || item.defaultSrc;

                    return (
                        <div key={item.id} className={`polaroid-card ${item.rotateClass}`}>
                            <div className="pin"></div>
                            <div
                                className="polaroid-img-wrapper"
                                onClick={() => onOpenLightbox(currentSrc, item.caption)}
                            >
                                <img src={currentSrc} alt={item.caption} className="polaroid-img" />
                                <button
                                    className="change-photo-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRefs.current[item.id]?.click();
                                    }}
                                    title="Change Photo"
                                >
                                    <Camera size={18} />
                                </button>
                            </div>
                            <p className="polaroid-caption">{item.caption}</p>
                            <input
                                type="file"
                                ref={el => fileInputRefs.current[item.id] = el}
                                accept="image/*"
                                onChange={(e) => handlePhotoChange(item.id, e)}
                                style={{ display: 'none' }}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
