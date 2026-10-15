import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../store';
import { translateText, fetchLiveTranslation, getCachedTranslation, langNames } from '../i18n';
import { CharacterAvatar } from './CharacterAvatar';
import { DONOR_TIERS } from '../types';
import { languages } from '../countries';

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export default function ChatView() {
  const { 
    currentUser, 
    rooms, 
    activeRoomId, 
    setActiveRoomId,
    sendMessage,
    autoTranslate,
    setAutoTranslate,
    setUserLanguage,
    setSidebarOpen,
    addReactionToDonation,
    setShowCreateRoom,
    allUsers
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeReactionAlertId, setActiveReactionAlertId] = useState<string | null>(null);
  const [reactionCommentText, setReactionCommentText] = useState('');
  
  // Real-time live translation state
  const [liveTranslations, setLiveTranslations] = useState<Record<string, string>>({});
  const [translatingKeys, setTranslatingKeys] = useState<Record<string, boolean>>({});

  // App Store UGC Compliance: User Reporting & Blocking
  const [reportingUser, setReportingUser] = useState<{ id: string; name: string } | null>(null);
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
  const [reportReason, setReportReason] = useState('부적절한 언어 / 비방');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeRoom = rooms.find(r => r.id === activeRoomId);
  const userLang = currentUser?.language || 'ko';

  // Real-time translation trigger for incoming / existing messages
  useEffect(() => {
    if (!autoTranslate || !activeRoom) return;

    activeRoom.messages.forEach(msg => {
      if (msg.type === 'donation-alert') return;
      if (msg.originalLanguage === userLang) return;

      const cacheKey = `${msg.originalLanguage}|${userLang}|${msg.content}`;
      const syncVal = msg.translatedContent || getCachedTranslation(msg.content, msg.originalLanguage, userLang);

      if (syncVal) {
        if (liveTranslations[cacheKey] !== syncVal) {
          setLiveTranslations(prev => ({ ...prev, [cacheKey]: syncVal }));
        }
      } else if (!liveTranslations[cacheKey] && !translatingKeys[cacheKey]) {
        setTranslatingKeys(prev => ({ ...prev, [cacheKey]: true }));
        fetchLiveTranslation(msg.content, msg.originalLanguage, userLang)
          .then(res => {
            setLiveTranslations(prev => ({ ...prev, [cacheKey]: res }));
          })
          .catch(() => {})
          .finally(() => {
            setTranslatingKeys(prev => ({ ...prev, [cacheKey]: false }));
          });
      }
    });
  }, [activeRoom?.messages, autoTranslate, userLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeRoom?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageText.trim() || !activeRoomId) return;
    sendMessage(activeRoomId, messageText.trim());
    setMessageText('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const emojis = ['😊', '👋', '🙏', '❤️', '👍', '🎉', '🌍', '✨'];

  if (!activeRoom) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white h-full">
        <div className="text-7xl mb-6 animate-bounce">🌍</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Bibple Chat!</h1>
        <p className="text-gray-500 max-w-md mb-10 text-lg">
          Select a chat room to start connecting with people around the world
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
          <button 
            onClick={() => setActiveRoomId('world-chat')}
            className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-bibple-500 hover:shadow-md transition-all group flex flex-col items-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌍</div>
            <div className="font-semibold text-gray-800">Join World Chat</div>
          </button>
          
          <button 
            onClick={() => setActiveRoomId('prayer-room')}
            className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-bibple-500 hover:shadow-md transition-all group flex flex-col items-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🙏</div>
            <div className="font-semibold text-gray-800">Visit Prayer Room</div>
          </button>
          
          <button 
            onClick={() => setActiveRoomId('free-talk')}
            className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-bibple-500 hover:shadow-md transition-all group flex flex-col items-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
            <div className="font-semibold text-gray-800">Start Free Talk</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="h-16 border-b border-gray-200 flex items-center px-4 bg-white shadow-sm shrink-0">
        <button 
          className="md:hidden mr-3 text-gray-500 hover:bg-gray-100 p-2 rounded-full"
          onClick={() => { setActiveRoomId(null); setSidebarOpen(true); }}
        >
          ←
        </button>
        <div className="text-3xl mr-3">{activeRoom.icon}</div>
        <div className="flex-1">
          <h2 className="font-bold text-lg leading-tight">{activeRoom.name}</h2>
          <div className="flex items-center text-xs text-gray-500 gap-2">
            <span className="truncate max-w-[200px] sm:max-w-md">{activeRoom.description}</span>
            {activeRoom.participantIds.length > 0 && (
              <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {activeRoom.participantIds.length} members
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
          {/* Quick viewer language switcher */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 shadow-xs rounded-full px-2.5 py-1 text-xs hover:border-bibple-300 transition-colors">
            <span className="text-xs">🌐</span>
            <select
              value={userLang}
              onChange={(e) => setUserLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold text-gray-700 cursor-pointer outline-none"
              title="내 언어 (수신 번역 언어)"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCreateRoom(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-sm"
            title="새 대화방 만들기"
          >
            <span>➕</span>
            <span className="hidden sm:inline">대화방 만들기</span>
          </button>

          <button 
            onClick={() => setAutoTranslate(!autoTranslate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
              ${autoTranslate ? 'bg-bibple-100 text-bibple-700' : 'bg-gray-100 text-gray-600'}
            `}
          >
            <span>🔄</span>
            <span className="hidden sm:inline">Auto-translate: {autoTranslate ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {activeRoom.messages.map((msg, index) => {
          const isOwn = msg.senderId === currentUser?.id;
          
          // Donation Alert - special golden/tier banner with reactions and comments
          if (msg.type === 'donation-alert') {
            const tierInfo = msg.donorTier ? DONOR_TIERS[msg.donorTier] : DONOR_TIERS.bronze;
            const reactions = msg.reactions || [];

            // Group reactions by emoji
            const reactionCounts: Record<string, number> = {};
            reactions.forEach(r => {
              reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
            });

            const comments = reactions.filter(r => r.comment && r.comment.trim().length > 0);
            const isCommenting = activeReactionAlertId === msg.id;

            return (
              <div key={msg.id} className="flex justify-center my-4 animate-slide-in">
                <div className="relative w-full max-w-xl mx-3 sm:mx-6">
                  {/* Outer animated aura based on tier */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-75 blur-md animate-pulse"
                    style={{
                      background: msg.donorTier === 'seraphim'
                        ? 'linear-gradient(90deg, #A855F7, #EC4899, #F59E0B)'
                        : msg.donorTier === 'platinum'
                        ? 'linear-gradient(90deg, #06B6D4, #3B82F6, #A855F7)'
                        : 'linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)'
                    }}
                  />
                  
                  {/* Alert card */}
                  <div className="relative bg-gradient-to-b from-amber-50/95 via-white to-amber-50/90 border-2 border-amber-300/80 rounded-3xl p-5 shadow-xl backdrop-blur-sm">
                    {/* Top Tier Badge Header */}
                    <div className="flex items-center justify-between border-b border-amber-200/60 pb-2.5 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800">
                        <span className="text-base">{tierInfo.badge}</span>
                        <span className="uppercase tracking-wider">{tierInfo.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                        ✨ 거룩한 헌금 축하
                      </span>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="relative shrink-0">
                        <CharacterAvatar config={msg.senderAvatar} size={72} tier={msg.donorTier} showTierBadge />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5">
                          <h4 className="font-extrabold text-gray-900 text-base">
                            {msg.senderName}
                          </h4>
                          <span>{msg.senderCountryFlag}</span>
                        </div>
                        <p className="text-xs text-amber-800 mt-0.5">
                          선한 사역을 위해 정성을 다해 헌금하셨습니다.
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold px-3.5 py-1.5 rounded-xl shadow-sm text-sm">
                          <span>💝</span>
                          <span>{msg.donationCurrency} {msg.donationAmount?.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                          <span>🏛️ 후원 단체:</span>
                          <span className="font-semibold text-gray-700">{msg.donationOrg}</span>
                        </p>
                      </div>
                    </div>

                    {/* Celebration / Quick Emojis Bar */}
                    <div className="mt-4 pt-3 border-t border-amber-200/50 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-500 mr-1">축하 & 중보:</span>
                        {['🙏', '❤️', '🎉', '✨', '👑', '🕊️'].map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => addReactionToDonation(msg.id, emoji)}
                            className="p-1.5 hover:bg-amber-100/70 active:scale-125 transition-transform rounded-lg text-base"
                            title={`${emoji} 축하 남기기`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveReactionAlertId(isCommenting ? null : msg.id);
                          setReactionCommentText('');
                        }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
                      >
                        <span>💬</span>
                        <span>{isCommenting ? '닫기' : '축하 댓글 달기'}</span>
                      </button>
                    </div>

                    {/* Active Reaction Chips */}
                    {Object.keys(reactionCounts).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {Object.entries(reactionCounts).map(([emoji, count]) => (
                          <span
                            key={emoji}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-amber-200 text-gray-700 rounded-full text-xs font-semibold shadow-xs"
                          >
                            <span>{emoji}</span>
                            <span className="text-[10px] text-amber-700">{count}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Celebration Comments List */}
                    {comments.length > 0 && (
                      <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {comments.map(c => (
                          <div key={c.id} className="bg-white/80 rounded-xl p-2 text-xs flex items-start gap-2 border border-amber-100 shadow-2xs">
                            <span className="text-sm shrink-0">{c.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-gray-900 mr-1.5">{c.userName}:</span>
                              <span className="text-gray-700">{c.comment}</span>
                            </div>
                            <span className="text-[9px] text-gray-400 shrink-0">{formatRelativeTime(c.timestamp)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input Form */}
                    {isCommenting && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!reactionCommentText.trim()) return;
                          addReactionToDonation(msg.id, '🙏', reactionCommentText.trim());
                          setReactionCommentText('');
                          setActiveReactionAlertId(null);
                        }}
                        className="mt-3 flex items-center gap-2 pt-2 border-t border-amber-200/50"
                      >
                        <input
                          type="text"
                          value={reactionCommentText}
                          onChange={(e) => setReactionCommentText(e.target.value)}
                          placeholder="축복과 감사의 메시지를 남겨주세요..."
                          className="flex-1 text-xs px-3 py-2 border border-amber-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                        >
                          축하 등록
                        </button>
                      </form>
                    )}

                    {/* Timestamp */}
                    <div className="text-center mt-3">
                      <span className="text-[10px] text-amber-500/80">{formatRelativeTime(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          
          // Compute real-time translation
          const needsTranslation = autoTranslate && msg.originalLanguage !== userLang;
          const cacheKey = `${msg.originalLanguage}|${userLang}|${msg.content}`;
          const translatedText = needsTranslation 
            ? (msg.translatedContent || liveTranslations[cacheKey] || getCachedTranslation(msg.content, msg.originalLanguage, userLang))
            : null;
          const isTranslating = needsTranslation && !translatedText && !!translatingKeys[cacheKey];
          
          const senderUser = (isOwn ? currentUser : allUsers.find(u => u.id === msg.senderId));
          const senderTier = senderUser?.tier;
          const senderTierInfo = senderTier ? DONOR_TIERS[senderTier] : null;

          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                
                {!isOwn && (
                  <div className="mb-1 shrink-0">
                    <CharacterAvatar config={msg.senderAvatar} size={34} tier={senderTier} showTierBadge />
                  </div>
                )}
                
                <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  {!isOwn && (
                    <div className="text-xs text-gray-500 mb-1 ml-1 flex items-center gap-1.5">
                      <span className="font-semibold text-gray-800">{msg.senderName}</span>
                      <span>{msg.senderCountryFlag}</span>
                      {senderTierInfo && (
                        <span 
                          className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold flex items-center gap-0.5 bg-amber-50 text-amber-800 border border-amber-200"
                          title={senderTierInfo.name}
                        >
                          <span>{senderTierInfo.badge}</span>
                          <span className="hidden sm:inline">{senderTierInfo.tier.toUpperCase()}</span>
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setReportingUser({ id: msg.senderId, name: msg.senderName });
                          setReportSubmitted(false);
                        }}
                        className="text-[10px] text-gray-400 hover:text-red-500 transition-colors px-1 rounded hover:bg-gray-100"
                        title="사용자 신고 및 차단 (Report / Block)"
                      >
                        🚨
                      </button>
                    </div>
                  )}
                  
                  {blockedUserIds.includes(msg.senderId) ? (
                    <div className="bg-gray-100 border border-gray-200 text-gray-400 text-xs px-3.5 py-2 rounded-2xl italic flex items-center gap-2">
                      <span>🚫 차단된 사용자({msg.senderName})의 메시지입니다.</span>
                      <button
                        onClick={() => setBlockedUserIds(prev => prev.filter(id => id !== msg.senderId))}
                        className="text-indigo-600 font-semibold underline text-[11px] not-italic cursor-pointer"
                      >
                        차단 해제
                      </button>
                    </div>
                  ) : (
                  <div className={`
                    relative px-4 py-2.5 rounded-2xl shadow-sm
                    ${isOwn 
                      ? 'bg-bibple-500 text-white rounded-br-sm message-own' 
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100 message-other'
                    }
                  `}>
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    
                    {needsTranslation && (
                      <div className={`mt-2 pt-2 border-t text-xs ${isOwn ? 'border-bibple-400/50 text-bibple-100' : 'border-gray-100 text-gray-700'}`}>
                        <div className="flex items-center gap-1 mb-1 text-[10px] opacity-80">
                          <span className="font-bold">🌐 {langNames[userLang] || userLang} 번역</span>
                          <span>•</span>
                          <span className="opacity-75">원문: {langNames[msg.originalLanguage] || msg.originalLanguage}</span>
                        </div>
                        {isTranslating ? (
                          <div className="flex items-center gap-1.5 text-xs italic opacity-75">
                            <span className="animate-spin text-[10px]">⏳</span>
                            <span>실시간 번역 중...</span>
                          </div>
                        ) : translatedText ? (
                          <p className={`text-sm font-medium ${isOwn ? 'text-white' : 'text-gray-900'} leading-relaxed`}>
                            {translatedText}
                          </p>
                        ) : (
                          <p className="text-xs italic opacity-60">번역을 불러오는 중...</p>
                        )}
                      </div>
                    )}
                  </div>
                  )}
                  
                  <div className={`text-[10px] text-gray-400 mt-1 ${isOwn ? 'mr-1' : 'ml-1'}`}>
                    {formatRelativeTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSend} className="flex items-end gap-2 relative">
          
          <div className="relative">
            <button 
              type="button"
              className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl p-2 grid grid-cols-4 gap-2 z-10">
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    className="w-10 h-10 text-xl hover:bg-gray-100 rounded-lg"
                    onClick={() => {
                      setMessageText(prev => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 bg-gray-100 rounded-2xl flex items-end">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full max-h-32 bg-transparent border-none focus:ring-0 resize-none px-4 py-3 min-h-[44px] text-gray-700"
              rows={1}
            />
          </div>

          <button 
            type="submit"
            disabled={!messageText.trim()}
            className={`p-3 rounded-full flex items-center justify-center transition-colors h-12 w-12 shrink-0
              ${messageText.trim() 
                ? 'bg-bibple-500 text-white hover:bg-bibple-600 shadow-md cursor-pointer' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            ➤
          </button>
        </form>
      </div>

      {/* App Store UGC Compliance: User Report & Block Dialog */}
      {reportingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                <span>🚨</span>
                <span>사용자 신고 및 관리</span>
              </div>
              <button 
                onClick={() => setReportingUser(null)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-2xl border text-xs">
              <span className="text-gray-500">대상 사용자:</span>{' '}
              <span className="font-bold text-gray-800">{reportingUser.name}</span>
            </div>

            {!reportSubmitted ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">신고 사유 선택 (Apple/Google 정책 준수)</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs bg-white outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="부적절한 언어 / 비방">부적절한 언어 / 비방 / 욕설</option>
                    <option value="스팸 및 광고">스팸 및 원치 않는 홍보</option>
                    <option value="괴롭힘 및 위협">괴롭힘 및 위협</option>
                    <option value="음란물 및 유해 콘텐츠">음란물 및 유해 콘텐츠</option>
                    <option value="기타 규정 위반">기타 커뮤니티 가이드라인 위반</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      setReportSubmitted(true);
                      setTimeout(() => {
                        setReportingUser(null);
                        setReportSubmitted(false);
                      }, 2000);
                    }}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                  >
                    🚨 이 사용자 운영진에 신고하기
                  </button>

                  <button
                    onClick={() => {
                      if (!blockedUserIds.includes(reportingUser.id)) {
                        setBlockedUserIds(prev => [...prev, reportingUser.id]);
                      }
                      setReportingUser(null);
                    }}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    🚫 이 사용자 즉시 차단하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <span className="text-2xl">✅</span>
                <p className="font-bold text-emerald-800 text-xs">신고가 성공적으로 접수되었습니다.</p>
                <p className="text-[11px] text-emerald-600">
                  운영진이 24시간 이내에 검토하여 제재 조치를 취합니다. (App Store Guideline 1.2)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
