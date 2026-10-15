import React, { useState, useMemo } from 'react';
import { useApp } from '../store';
import { countries } from '../countries';
import { User, DONOR_TIERS } from '../types';
import { CharacterAvatar } from './CharacterAvatar';

export default function MembersPage() {
  const { showMembers, setShowMembers, allUsers, currentUser, rooms, inviteToRoom } = useApp();
  
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const [inviteDropdownId, setInviteDropdownId] = useState<string | null>(null);
  const [invitedStatus, setInvitedStatus] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!showMembers || !currentUser) return null;

  const filteredUsers = allUsers.filter(u => {
    if (u.id === currentUser.id) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (countryFilter !== 'all' && u.country !== countryFilter) return false;
    if (onlineOnly && !u.isOnline) return false;
    return true;
  });

  const uniqueCountries = useMemo(() => {
    const codes = new Set(allUsers.filter(u => u.id !== currentUser.id).map(u => u.country));
    return countries.filter(c => codes.has(c.code));
  }, [allUsers, currentUser.id]);

  const handleInvite = (userId: string, roomId: string) => {
    inviteToRoom(roomId, userId);
    setInviteDropdownId(null);
    setInvitedStatus(prev => ({ ...prev, [`${userId}-${roomId}`]: true }));
    setTimeout(() => {
      setInvitedStatus(prev => ({ ...prev, [`${userId}-${roomId}`]: false }));
    }, 2000);
  };

  const getInvitableRooms = (userId: string) => {
    return rooms.filter(r => r.type === 'group' && r.participantIds.includes(currentUser.id) && !r.participantIds.includes(userId));
  };

  const isSharedRoom = (userId: string) => {
    return rooms.some(r => r.type === 'group' && r.participantIds.includes(currentUser.id) && r.participantIds.includes(userId));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <button 
          onClick={() => setShowMembers(false)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">👥 Members</h1>
            <span className="bg-bibple-100 text-bibple-700 py-0.5 px-2.5 rounded-full text-sm font-medium">
              {allUsers.length - 1}
            </span>
          </div>
          
          <div className="relative w-64 hidden sm:block">
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-bibple-500 focus:ring-1 focus:ring-bibple-500 text-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 py-2 bg-white sm:hidden border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-bibple-500 focus:ring-1 focus:ring-bibple-500 text-sm"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm z-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => setCountryFilter('all')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${countryFilter === 'all' ? 'bg-bibple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {uniqueCountries.map(c => (
            <button
              key={c.code}
              onClick={() => setCountryFilter(c.code)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${countryFilter === c.code ? 'bg-bibple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
            </button>
          ))}
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap pl-2">
          <input 
            type="checkbox" 
            checked={onlineOnly} 
            onChange={e => setOnlineOnly(e.target.checked)} 
            className="w-4 h-4 text-bibple-500 rounded focus:ring-bibple-500"
          />
          <span className="text-sm font-medium text-gray-700">Online Only</span>
        </label>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6" onClick={() => setInviteDropdownId(null)}>
        {filteredUsers.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <span className="text-4xl mb-3">🔍</span>
            <p>No members match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {filteredUsers.map(member => {
              const invitableRooms = getInvitableRooms(member.id);
              const isShared = isSharedRoom(member.id);
              const isExpanded = expandedId === member.id;
              
              const memberCountry = countries.find(c => c.code === member.country);

              return (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <CharacterAvatar config={member.avatar} size={64} tier={member.tier} showTierBadge />
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${member.isOnline ? 'bg-green-500' : 'bg-gray-400'} z-10`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base truncate flex items-center gap-1.5">
                        <span className="truncate">{member.name}</span>
                        <span title={memberCountry?.name}>{memberCountry?.flag}</span>
                      </h3>
                      {member.tier && (
                        <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <span>{DONOR_TIERS[member.tier].badge}</span>
                          <span className="truncate">{DONOR_TIERS[member.tier].name}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {member.isOnline ? '🟢 Online' : '⚪ Offline'}
                      </p>
                    </div>

                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInviteDropdownId(inviteDropdownId === member.id ? null : member.id);
                        }}
                        className="px-4 py-1.5 rounded-full border border-bibple-500 text-bibple-600 font-medium text-sm hover:bg-bibple-50 transition-colors focus:outline-none"
                      >
                        Invite
                      </button>

                      {/* Dropdown */}
                      {inviteDropdownId === member.id && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20" onClick={e => e.stopPropagation()}>
                          <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                            Invite to Room
                          </div>
                          {invitableRooms.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                              No rooms to invite to
                            </div>
                          ) : (
                            <div className="max-h-48 overflow-y-auto">
                              {invitableRooms.map(room => (
                                <button
                                  key={room.id}
                                  onClick={() => handleInvite(member.id, room.id)}
                                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                                >
                                  <span className="truncate flex-1 flex items-center gap-2">
                                    <span>{room.icon}</span> 
                                    <span className="truncate">{room.name}</span>
                                  </span>
                                  {invitedStatus[`${member.id}-${room.id}`] ? (
                                    <span className="text-green-500 text-xs ml-2 whitespace-nowrap">Invited!✅</span>
                                  ) : (
                                    <span className="text-bibple-500 opacity-0 group-hover:opacity-100 text-xs font-medium ml-2 transition-opacity">Add +</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Info for Shared Members */}
                  {isShared && (
                    <div className="pt-2 border-t border-gray-100">
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : member.id)}
                        className="text-xs font-medium text-bibple-600 flex items-center gap-1 hover:text-bibple-700 transition-colors w-full justify-center"
                      >
                        {isExpanded ? 'Hide Info ▲' : 'Show More Info ▼'}
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm space-y-2 text-gray-700">
                          {memberCountry?.name && <p><span className="font-medium text-gray-900">Country:</span> {memberCountry.name}</p>}
                          {member.age && <p><span className="font-medium text-gray-900">Age:</span> {member.age}</p>}
                          {member.occupation && <p><span className="font-medium text-gray-900">Occupation:</span> {member.occupation}</p>}
                          {member.bio && (
                            <p className="mt-2 text-gray-600 italic">"{member.bio}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
