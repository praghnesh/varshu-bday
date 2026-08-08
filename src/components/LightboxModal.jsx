import React from 'react';
import { X } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, imgSrc, caption }) {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <span className="modal-close" onClick={onClose}>
                <X size={32} />
            </span>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={imgSrc} alt={caption} />
                <p className="lightbox-caption-text">{caption}</p>
            </div>
        </div>
    );
}
