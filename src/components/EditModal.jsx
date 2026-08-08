import React, { useState } from 'react';
import { PenSquare, X, Check } from 'lucide-react';
import { playPopSound } from '../utils/soundFx';

export default function EditModal({ isOpen, onClose, config, onSave }) {
    const [name, setName] = useState(config.gfName);
    const [startDate, setStartDate] = useState(config.startDate || '2008-08-24');
    const [letterText, setLetterText] = useState(config.letterText);

    if (!isOpen) return null;

    const handleSave = () => {
        playPopSound();
        onSave({
            gfName: name.trim() || 'Varshu',
            startDate: startDate,
            letterText: letterText
        });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-card glass-card">
                <div className="modal-header">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <PenSquare size={20} /> Customize Messages & Name
                    </h3>
                    <span className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </span>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Her Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Relationship / Memory Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Love Letter Message:</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            value={letterText}
                            onChange={(e) => setLetterText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSave} className="btn btn-primary">
                        <Check size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
