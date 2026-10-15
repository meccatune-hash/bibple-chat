import React, { useState } from 'react';
import { useApp } from '../store';
import { CharacterAvatar } from './CharacterAvatar';
import { DONOR_TIERS } from '../types';
import SettingsModal from './SettingsModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { 
    currentUser, 
    rooms, 
    activeRoomId, 
    setActiveRoomId,
    autoTranslate,
    setAutoTranslate,
    setShowDonation,
    allUsers,
    sidebarOpen,
    setSidebarOpen,
    setShowCreateRoom,
    setShowMembers
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState<'all' | 'global' | 'group'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const query = searchQuery.trim().toLowerCase();

  const searchMatchingRooms = query 
    ? rooms.filter(r => r.name.toLowerCase().includes(query) || r.description.toLowerCase().includes(query))
    : [];

  const searchMatchingUsers = query
    ? allUsers.filter(u => 
        u.id !== currentUser?.id && (
          u.name.toLowerCase().includes(query) ||
          u.country.toLowerCase().includes(query) ||
          u.occupation.toLowerCase().includes(query) ||
          (u.bio && u.bio.toLowerCase().includes(query))
        )
      )
    : [];

  const filteredRooms = rooms.filter(r => {
    if (r.type === 'direct') return false; // direct messages shown separately
    if (query) {
      const matchName = r.name.toLowerCase().includes(query);
      const matchDesc = r.description.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }
    if (roomTypeFilter === 'global' && r.type !== 'global') return false;
    if (roomTypeFilter === 'group' && r.type !== 'group') return false;
    if (countryFilter !== 'all' && r.country && r.country !== countryFilter) return false;
    if (countryFilter !== 'all' && !r.country && r.type !== 'global') return false;
    return true;
  });

  const uniqueCountries = [...new Set(rooms.filter(r => r.country).map(r => r.country!))];
  const directRooms = rooms.filter(r => r.type === 'direct');
  
  const displayedUsers = allUsers.filter(u => {
    if (u.id === currentUser?.id) return false;
    if (query) {
      const matchName = u.name.toLowerCase().includes(query);
      const matchCountry = u.country.toLowerCase().includes(query);
      const matchOcc = u.occupation.toLowerCase().includes(query);
      return matchName || matchCountry || matchOcc;
    }
    return true;
  });

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="font-bold text-xl text-bibple-600">💬 Bibple Chat</div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex max-w-md w-full px-4 relative">
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="대화방, 성도 검색 (Search rooms, people)..." 
              className="w-full pl-9 pr-8 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-bibple-500 focus:bg-white focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 rounded-full w-4 h-4 flex items-center justify-center bg-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Floating Search Results Dropdown */}
          {query && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>검색 결과: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">닫기</button>
              </div>

              {/* Rooms results */}
              {searchMatchingRooms.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1">대화방 ({searchMatchingRooms.length})</div>
                  {searchMatchingRooms.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRoomId(r.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-indigo-50 flex items-center gap-2.5 transition-colors"
                    >
                      <span className="text-xl">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-gray-800 truncate">{r.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">{r.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* People results */}
              {searchMatchingUsers.length > 0 && (
                <div className="p-2 border-t border-gray-50">
                  <div className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1">성도 / 회원 ({searchMatchingUsers.length})</div>
                  {searchMatchingUsers.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setShowMembers(true);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-indigo-50 flex items-center gap-2.5 transition-colors"
                    >
                      <CharacterAvatar config={u.avatar} size={28} tier={u.tier} showTierBadge />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-gray-800 flex items-center gap-1">
                          <span>{u.name}</span>
                          <span className="text-[10px]">{u.countryFlag}</span>
                        </div>
                        <div className="text-[10px] text-gray-400">{u.occupation} • {u.country}</div>
                      </div>
                      {u.tier && (
                        <span className="text-xs">{DONOR_TIERS[u.tier]?.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {searchMatchingRooms.length === 0 && searchMatchingUsers.length === 0 && (
                <div className="p-6 text-center text-xs text-gray-400">
                  <span>일치하는 대화방이나 성도를 찾을 수 없습니다.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 text-base"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            title="검색"
          >
            🔍
          </button>

          <button 
            onClick={() => setAutoTranslate(!autoTranslate)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${autoTranslate ? 'bg-bibple-100 text-bibple-700' : 'bg-gray-100 text-gray-600'}`}
            title="Toggle Auto-Translate"
          >
            🌐 {autoTranslate ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => setShowDonation(true)}
            className="p-2 text-xl hover:scale-110 transition-transform"
            title="Make an Offering"
          >
            💝
          </button>
          {currentUser && (
            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group"
              title="내 프로필 및 설정"
            >
              <CharacterAvatar config={currentUser.avatar} size={36} tier={currentUser.tier} showTierBadge />
              <div className="hidden sm:block text-left">
                <div className="font-semibold text-sm leading-tight flex items-center gap-1 group-hover:text-bibple-600 transition-colors">
                  <span>{currentUser.name}</span>
                  {currentUser.tier && (
                    <span className="text-xs" title={DONOR_TIERS[currentUser.tier]?.name}>
                      {DONOR_TIERS[currentUser.tier]?.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400">설정 ⚙️</div>
              </div>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Expandable Search Bar */}
      {showMobileSearch && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-gray-200 p-3 shadow-md md:hidden">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="대화방, 성도 검색..." 
              className="w-full pl-9 pr-8 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-bibple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-16 left-0 bottom-0 z-40
        w-72 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {currentUser && (
          <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-indigo-50/40 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <CharacterAvatar config={currentUser.avatar} size={48} tier={currentUser.tier} showTierBadge />
                {currentUser.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full z-10"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 flex items-center gap-1 truncate text-sm">
                  <span>{currentUser.name}</span>
                  <span>{currentUser.countryFlag}</span>
                </div>
                {currentUser.tier ? (
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full w-fit">
                    <span>{DONOR_TIERS[currentUser.tier].badge}</span>
                    <span className="truncate">{DONOR_TIERS[currentUser.tier].name}</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400">Bibple Member</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {/* Rooms */}
          <div className="py-2">
            <div className="px-4 flex items-center justify-between mb-2 mt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rooms</h3>
              <button 
                onClick={() => setShowCreateRoom(true)}
                className="text-bibple-600 border border-bibple-300 rounded-full px-3 py-1 text-xs hover:bg-bibple-50 transition-colors"
              >
                + Create
              </button>
            </div>
            
            <div className="flex gap-1 flex-wrap px-4 mb-2">
              <button 
                onClick={() => setRoomTypeFilter('all')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${roomTypeFilter === 'all' ? 'bg-bibple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setRoomTypeFilter('global')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${roomTypeFilter === 'global' ? 'bg-bibple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Global
              </button>
              <button 
                onClick={() => setRoomTypeFilter('group')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${roomTypeFilter === 'group' ? 'bg-bibple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                My Rooms
              </button>
            </div>

            {uniqueCountries.length > 0 && (
              <div className="px-4 mb-2">
                <select 
                  className="w-full text-xs rounded border border-gray-300 px-2 py-1 bg-white focus:outline-none focus:border-bibple-500"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map(country => {
                    const countryFlag = rooms.find(r => r.country === country)?.countryFlag;
                    return (
                      <option key={country} value={country}>
                        {countryFlag ? `${countryFlag} ` : ''}{country}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <ul>
              {filteredRooms.map(room => (
                <li key={room.id}>
                  <button 
                    onClick={() => { setActiveRoomId(room.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50
                      ${activeRoomId === room.id ? 'bg-bibple-50 border-l-4 border-bibple-500 pr-4' : 'border-l-4 border-transparent pl-5'}
                    `}
                  >
                    <span className="text-xl">{room.icon}</span>
                    <span className="flex-1 font-medium truncate">
                      {room.name} {room.countryFlag && <span className="text-sm ml-1">{room.countryFlag}</span>}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {room.creatorId === currentUser?.id && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 rounded">Owner</span>
                      )}
                      <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded-full">{room.participantIds.length}👤</span>
                      {room.unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Messages */}
          <div className="py-2 border-t border-gray-100">
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Direct Messages</h3>
            <ul>
              {directRooms.map(room => (
                <li key={room.id}>
                  <button 
                    onClick={() => { setActiveRoomId(room.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50
                      ${activeRoomId === room.id ? 'bg-bibple-50 border-l-4 border-bibple-500 pr-4' : 'border-l-4 border-transparent pl-5'}
                    `}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">{room.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{room.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {room.messages[room.messages.length - 1]?.content || 'Say hi!'}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* People */}
          <div className="py-2 border-t border-gray-100">
            <div className="px-4 flex items-center justify-between mb-2 mt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">People</h3>
              <button 
                onClick={() => setShowMembers(true)}
                className="text-bibple-600 border border-bibple-300 rounded-full px-3 py-1 text-xs hover:bg-bibple-50 transition-colors"
              >
                👥 View All
              </button>
            </div>
            <ul>
              {displayedUsers.slice(0, 5).map(user => (
                <li key={user.id}>
                  <button className="w-full flex items-center gap-3 px-5 py-2 hover:bg-gray-50 text-left transition-colors">
                    <div className="relative">
                      <CharacterAvatar config={user.avatar} size={32} tier={user.tier} showTierBadge />
                      {user.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full z-10"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 font-medium truncate text-sm">
                        <span className="truncate">{user.name}</span>
                        <span className="text-xs">{user.countryFlag}</span>
                      </div>
                      {user.tier && (
                        <div className="text-[10px] text-amber-600 font-semibold truncate">
                          {DONOR_TIERS[user.tier].badge} {DONOR_TIERS[user.tier].name.split(' ')[0]}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
              {displayedUsers.length > 5 && (
                <li>
                  <button 
                    onClick={() => setShowMembers(true)}
                    className="w-full text-left px-5 py-2 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    ... and {displayedUsers.length - 5} more
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={() => setShowDonation(true)}
            className="w-full bg-bibple-600 hover:bg-bibple-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2"
          >
            <span className="text-lg">💝</span> Make an Offering
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-16 md:relative md:w-[calc(100%-18rem)]">
        {children}
      </main>

      {/* Settings & Account Deletion Modal (App Store compliance) */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
