import React, { useState, useEffect } from 'react';
import { useApp } from '../store';
import { countries } from '../countries';

const EMOJIS = ['🎮', '📚', '🎵', '🏃', '🍳', '💼', '🎨', '⚽', '🌱', '🎬', '📸', '💡', '🙏', '❤️', '🌍', '🎯'];

export default function CreateRoomModal() {
  const { showCreateRoom, setShowCreateRoom, createRoom, currentUser, setActiveRoomId } = useApp();
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💬');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [countryId, setCountryId] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCreateRoom(false);
      }
    };
    if (showCreateRoom) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showCreateRoom, setShowCreateRoom]);

  if (!showCreateRoom || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const roomId = `room-${Date.now()}`;
    const selectedCountry = countries.find(c => c.code === countryId);

    createRoom({
      id: roomId,
      name: name.trim(),
      type: 'group',
      icon,
      description: description.trim(),
      participantIds: [currentUser.id],
      creatorId: currentUser.id,
      country: selectedCountry?.code,
      countryFlag: selectedCountry?.flag,
      isPublic,
    });
    
    setActiveRoomId(roomId);
    setShowCreateRoom(false);
    
    setName('');
    setIcon('💬');
    setDescription('');
    setIsPublic(true);
    setCountryId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateRoom(false)}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Create a New Room</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bibple-500 focus:border-bibple-500 outline-none transition-all"
                placeholder="E.g. Music Lovers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Icon</label>
              <div className="grid grid-cols-8 gap-2">
                {EMOJIS.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setIcon(e)}
                    className={`w-8 h-8 flex items-center justify-center text-xl rounded-lg transition-all ${icon === e ? 'bg-bibple-100 ring-2 ring-bibple-500 scale-110' : 'hover:bg-gray-100'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                maxLength={100}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bibple-500 focus:border-bibple-500 outline-none transition-all resize-none h-20"
                placeholder="What is this room about? (Max 100 chars)"
              />
              <div className="text-right text-xs text-gray-400 mt-1">{description.length}/100</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} className="text-bibple-500 focus:ring-bibple-500" />
                  <span className="text-sm">🌐 Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} className="text-bibple-500 focus:ring-bibple-500" />
                  <span className="text-sm">🔒 Private</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region (Optional)</label>
              <select
                value={countryId}
                onChange={e => setCountryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bibple-500 focus:border-bibple-500 outline-none transition-all bg-white"
              >
                <option value="">All / Global</option>
                {countries.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCreateRoom(false)}
                className="flex-1 px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] px-4 py-3 bg-bibple-500 text-white font-medium rounded-xl hover:bg-bibple-600 transition-colors shadow-sm"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
