import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User, Screen, ChatRoom, Donation, ChatMessage, DonorTier, getTierFromAmount, DONOR_TIERS } from './types';
import { t, translateText } from './i18n';
import { countries, languages, occupations } from './countries';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  
  rooms: ChatRoom[];
  activeRoomId: string | null;
  setActiveRoomId: (id: string | null) => void;
  sendMessage: (roomId: string, content: string) => void;
  
  autoTranslate: boolean;
  setAutoTranslate: (val: boolean) => void;
  
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'timestamp' | 'status'>) => void;
  showDonation: boolean;
  setShowDonation: (val: boolean) => void;
  
  allUsers: User[];
  
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  
  setUserLanguage: (lang: string) => void;
  
  translate: (key: string) => string;
  createRoom: (room: Omit<ChatRoom, 'messages' | 'unreadCount'>) => void;
  inviteToRoom: (roomId: string, userId: string) => void;
  showCreateRoom: boolean;
  setShowCreateRoom: (val: boolean) => void;
  showMembers: boolean;
  setShowMembers: (val: boolean) => void;
  addReactionToDonation: (messageId: string, emoji: string, comment?: string) => void;
}

const mockUsers: User[] = [
  { id: 'u1', name: 'Ji-hoon', email: 'jh@example.com', avatar: '👨🏻', country: 'KR', countryFlag: '🇰🇷', gender: 'Male', age: 28, occupation: 'Software Engineer', language: 'ko', bio: 'Hello from Seoul!', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 1200, tier: 'seraphim' },
  { id: 'u2', name: 'Sarah', email: 'sarah@example.com', avatar: '👩🏼', country: 'US', countryFlag: '🇺🇸', gender: 'Female', age: 24, occupation: 'Designer', language: 'en', bio: 'Love art and design.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 550, tier: 'platinum' },
  { id: 'u3', name: 'Kenji', email: 'kenji@example.com', avatar: '🧑🏻', country: 'JP', countryFlag: '🇯🇵', gender: 'Male', age: 32, occupation: 'Teacher', language: 'ja', bio: 'Teaching English in Tokyo.', isOnline: false, joinedAt: new Date().toISOString(), totalDonation: 250, tier: 'gold' },
  { id: 'u4', name: 'Maria', email: 'maria@example.com', avatar: '👩🏽', country: 'BR', countryFlag: '🇧🇷', gender: 'Female', age: 29, occupation: 'Doctor', language: 'pt', bio: 'Saving lives in Rio.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 80, tier: 'silver' },
  { id: 'u5', name: 'Lukas', email: 'lukas@example.com', avatar: '👨🏼', country: 'DE', countryFlag: '🇩🇪', gender: 'Male', age: 35, occupation: 'Engineer', language: 'de', bio: 'Engineering the future.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 25, tier: 'bronze' },
  { id: 'u6', name: 'Sophie', email: 'sophie@example.com', avatar: '👩🏼', country: 'FR', countryFlag: '🇫🇷', gender: 'Female', age: 26, occupation: 'Chef', language: 'fr', bio: 'Culinary arts.', isOnline: false, joinedAt: new Date().toISOString(), totalDonation: 300, tier: 'gold' },
  { id: 'u7', name: 'Aarav', email: 'aarav@example.com', avatar: '👨🏽', country: 'IN', countryFlag: '🇮🇳', gender: 'Male', age: 30, occupation: 'Entrepreneur', language: 'hi', bio: 'Building startups.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 60, tier: 'silver' },
  { id: 'u8', name: 'Fatima', email: 'fatima@example.com', avatar: '🧕🏽', country: 'EG', countryFlag: '🇪🇬', gender: 'Female', age: 27, occupation: 'Writer', language: 'ar', bio: 'Writing stories.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 1500, tier: 'seraphim' },
  { id: 'u9', name: 'Carlos', email: 'carlos@example.com', avatar: '👨🏽', country: 'MX', countryFlag: '🇲🇽', gender: 'Male', age: 31, occupation: 'Artist', language: 'es', bio: 'Painting the world.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 15, tier: 'bronze' },
  { id: 'u10', name: 'Emma', email: 'emma@example.com', avatar: '👩🏼', country: 'GB', countryFlag: '🇬🇧', gender: 'Female', age: 25, occupation: 'Student', language: 'en', bio: 'Studying literature.', isOnline: true, joinedAt: new Date().toISOString(), totalDonation: 100, tier: 'silver' }
];

const initialRooms: ChatRoom[] = [
  {
    id: 'world-chat',
    name: '🌍 World Chat',
    type: 'global',
    icon: '🌍',
    description: 'Chat with people from around the world',
    participantIds: mockUsers.map(u => u.id),
    messages: [
      { id: 'm1', roomId: 'world-chat', senderId: 'u1', senderName: 'Ji-hoon', senderAvatar: '👨🏻', senderCountryFlag: '🇰🇷', content: '안녕하세요 여러분!', originalLanguage: 'ko', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'm2', roomId: 'world-chat', senderId: 'u2', senderName: 'Sarah', senderAvatar: '👩🏼', senderCountryFlag: '🇺🇸', content: 'Hello everyone! How is your day going?', originalLanguage: 'en', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { id: 'm3', roomId: 'world-chat', senderId: 'u4', senderName: 'Maria', senderAvatar: '👩🏽', senderCountryFlag: '🇧🇷', content: 'Olá! Tudo bem?', originalLanguage: 'pt', timestamp: new Date(Date.now() - 3400000).toISOString() },
      { id: 'm4', roomId: 'world-chat', senderId: 'u7', senderName: 'Aarav', senderAvatar: '👨🏽', senderCountryFlag: '🇮🇳', content: 'नमस्ते! इंडिया से प्यार।', originalLanguage: 'hi', timestamp: new Date(Date.now() - 3300000).toISOString() },
      { id: 'm5', roomId: 'world-chat', senderId: 'u6', senderName: 'Sophie', senderAvatar: '👩🏼', senderCountryFlag: '🇫🇷', content: 'Bonjour! Je prépare le dîner.', originalLanguage: 'fr', timestamp: new Date(Date.now() - 3200000).toISOString() }
    ],
    unreadCount: 0
  },
  {
    id: 'prayer-room',
    name: '🙏 Prayer Room',
    type: 'global',
    icon: '🙏',
    description: 'A place for prayer and spiritual sharing',
    participantIds: mockUsers.map(u => u.id),
    messages: [
      { id: 'p1', roomId: 'prayer-room', senderId: 'u2', senderName: 'Sarah', senderAvatar: '👩🏼', senderCountryFlag: '🇺🇸', content: 'Praying for world peace today.', originalLanguage: 'en', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: 'p2', roomId: 'prayer-room', senderId: 'u8', senderName: 'Fatima', senderAvatar: '🧕🏽', senderCountryFlag: '🇪🇬', content: 'اللهم آمين', originalLanguage: 'ar', timestamp: new Date(Date.now() - 7100000).toISOString() },
      { id: 'p3', roomId: 'prayer-room', senderId: 'u9', senderName: 'Carlos', senderAvatar: '👨🏽', senderCountryFlag: '🇲🇽', content: 'Que Dios nos bendiga a todos.', originalLanguage: 'es', timestamp: new Date(Date.now() - 7000000).toISOString() }
    ],
    unreadCount: 0
  },
  {
    id: 'free-talk',
    name: '💬 Free Talk',
    type: 'global',
    icon: '💬',
    description: 'Talk about anything freely',
    participantIds: mockUsers.map(u => u.id),
    messages: [
      { id: 'f1', roomId: 'free-talk', senderId: 'u5', senderName: 'Lukas', senderAvatar: '👨🏼', senderCountryFlag: '🇩🇪', content: 'Hat jemand gute Buchempfehlungen?', originalLanguage: 'de', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { id: 'f2', roomId: 'free-talk', senderId: 'u10', senderName: 'Emma', senderAvatar: '👩🏼', senderCountryFlag: '🇬🇧', content: 'I just read "1984" again. It is amazing!', originalLanguage: 'en', timestamp: new Date(Date.now() - 900000).toISOString() }
    ],
    unreadCount: 0
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>('login');
  const [rooms, setRooms] = useState<ChatRoom[]>(initialRooms);
  const [activeRoomId, setActiveRoomId] = useState<string | null>('world-chat');
  const [autoTranslate, setAutoTranslate] = useState<boolean>(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonation, setShowDonation] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false);
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const allUsers = mockUsers;

  const setUserLanguage = useCallback((lang: string) => {
    setCurrentUser(prev => prev ? { ...prev, language: lang } : null);
  }, []);

  const translate = useCallback((key: string) => {
    return t(key, currentUser?.language || 'en');
  }, [currentUser]);

  const sendMessage = (roomId: string, content: string) => {
    if (!currentUser) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      roomId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderCountryFlag: currentUser.countryFlag,
      content,
      originalLanguage: currentUser.language,
      timestamp: new Date().toISOString()
    };

    // Translation is now computed in real-time by ChatView based on the viewer's language,
    // so we don't need to store translatedContent at send time.

    setRooms(prevRooms => prevRooms.map(r => {
      if (r.id === roomId) {
        return { ...r, messages: [...r.messages, newMessage] };
      }
      return r;
    }));

    // Mock reply in the user's native language
    setTimeout(() => {
      const otherUsers = mockUsers.filter(u => u.id !== currentUser.id);
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
      
      // Reply pool in each language
      const replyPool: Record<string, string[]> = {
        ko: ['반갑습니다! 😊', '좋은 이야기네요!', '저도 동감합니다 👍', '오늘 날씨가 좋네요!', '감사합니다 🙏', '정말요? 대단해요!', '재미있는 얘기네요 ㅎㅎ', '언제 한번 만나요!'],
        en: ['That\'s awesome! 😊', 'I totally agree!', 'Thanks for sharing! 👍', 'Great to hear from you!', 'God bless! 🙏', 'That\'s really interesting!', 'Love this community!', 'Have a wonderful day!'],
        ja: ['素晴らしいですね！😊', 'それは面白いです！', '同感です！👍', 'ありがとうございます 🙏', '今日もいい一日を！', '本当ですか？すごい！', 'よろしくお願いします！', '楽しいですね！'],
        zh: ['太棒了！😊', '我完全同意！', '谢谢分享！👍', '说得对！', '上帝保佑！🙏', '真的很有趣！', '大家好！', '祝你有美好的一天！'],
        es: ['¡Qué bueno! 😊', '¡Estoy de acuerdo!', '¡Gracias por compartir! 👍', '¡Dios los bendiga! 🙏', '¡Qué interesante!', '¡Hola a todos!', '¡Genial!', '¡Que tengan un buen día!'],
        fr: ['C\'est génial ! 😊', 'Je suis tout à fait d\'accord !', 'Merci pour le partage ! 👍', 'Que Dieu vous bénisse ! 🙏', 'C\'est très intéressant !', 'Bonjour à tous !', 'Super !', 'Bonne journée !'],
        de: ['Das ist toll! 😊', 'Da stimme ich zu!', 'Danke fürs Teilen! 👍', 'Gott segne euch! 🙏', 'Das ist wirklich interessant!', 'Hallo zusammen!', 'Wunderbar!', 'Einen schönen Tag noch!'],
        pt: ['Que legal! 😊', 'Concordo totalmente!', 'Obrigado por compartilhar! 👍', 'Deus abençoe! 🙏', 'Que interessante!', 'Olá a todos!', 'Maravilhoso!', 'Tenham um ótimo dia!'],
        hi: ['बहुत अच्छा! 😊', 'मैं सहमत हूँ!', 'शेयर करने के लिए धन्यवाद! 👍', 'भगवान आशीर्वाद दें! 🙏', 'बहुत दिलचस्प!', 'सभी को नमस्ते!', 'शानदार!', 'आपका दिन शुभ हो!'],
        ar: ['رائع! 😊', 'أتفق تماماً!', 'شكراً للمشاركة! 👍', 'بارك الله فيكم! 🙏', 'مثير للاهتمام!', 'مرحباً بالجميع!', 'ممتاز!', 'أتمنى لكم يوماً سعيداً!']
      };
      
      const replies = replyPool[randomUser.language] || replyPool['en'];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        roomId,
        senderId: randomUser.id,
        senderName: randomUser.name,
        senderAvatar: randomUser.avatar,
        senderCountryFlag: randomUser.countryFlag,
        content: replyText,
        originalLanguage: randomUser.language,
        timestamp: new Date().toISOString()
      };
      
      // Translation is computed in real-time by ChatView
      
      setRooms(prev => prev.map(r => {
        if (r.id === roomId) {
          return { ...r, messages: [...r.messages, replyMessage] };
        }
        return r;
      }));
    }, 1500 + Math.random() * 1000);
  };

  const addDonation = (donationData: Omit<Donation, 'id' | 'timestamp' | 'status'>) => {
    const newDonation: Donation = {
      ...donationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    setDonations(prev => [newDonation, ...prev]);

    // Update currentUser total donation & tier
    if (currentUser) {
      const newTotal = (currentUser.totalDonation || 0) + donationData.amount;
      const newTierInfo = getTierFromAmount(newTotal);
      const updatedUser: User = {
        ...currentUser,
        totalDonation: newTotal,
        tier: newTierInfo.tier
      };
      setCurrentUser(updatedUser);

      // Broadcast donation alert with tier & empty reactions array
      const alertMessage: ChatMessage = {
        id: `donation-${Date.now()}`,
        roomId: '',
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        senderCountryFlag: currentUser.countryFlag,
        content: `💝 ${currentUser.name} ${currentUser.countryFlag} has made an offering of ${donationData.currency} ${donationData.amount.toLocaleString()} to ${donationData.recipientOrg}!`,
        originalLanguage: currentUser.language,
        timestamp: new Date().toISOString(),
        type: 'donation-alert',
        donationAmount: donationData.amount,
        donationCurrency: donationData.currency,
        donationOrg: donationData.recipientOrg,
        donorTier: newTierInfo.tier,
        reactions: []
      };

      setRooms(prevRooms => prevRooms.map(r => {
        if (r.type === 'global') {
          return { ...r, messages: [...r.messages, { ...alertMessage, roomId: r.id }] };
        }
        return r;
      }));

      // Simulate global members cheering with emojis & prayers after 2-4 seconds!
      setTimeout(() => {
        const cheerers = mockUsers.slice(0, 3);
        const cheerEmojis = ['🙏', '💖', '🎉', '✨', '👑', '🕊️'];
        const cheerComments = [
          '하나님의 은혜와 축복이 가득하길 기도합니다! 🙏',
          'God bless your generous heart! ❤️',
          '귀한 나눔에 진심으로 감사와 축하를 드립니다! ✨',
          'Hallelujah! Thank you for your support!'
        ];

        cheerers.forEach((cheerer, idx) => {
          setTimeout(() => {
            const reaction = {
              id: `r-${Date.now()}-${idx}`,
              donationId: alertMessage.id,
              userId: cheerer.id,
              userName: cheerer.name,
              userAvatar: cheerer.avatar,
              emoji: cheerEmojis[Math.floor(Math.random() * cheerEmojis.length)],
              comment: idx === 0 ? cheerComments[Math.floor(Math.random() * cheerComments.length)] : undefined,
              timestamp: new Date().toISOString()
            };

            setRooms(prevRooms => prevRooms.map(r => {
              return {
                ...r,
                messages: r.messages.map(m => {
                  if (m.id === alertMessage.id) {
                    return {
                      ...m,
                      reactions: [...(m.reactions || []), reaction]
                    };
                  }
                  return m;
                })
              };
            }));
          }, (idx + 1) * 1200);
        });
      }, 1500);
    }
  };

  const addReactionToDonation = (messageId: string, emoji: string, comment?: string) => {
    if (!currentUser) return;

    const newReaction = {
      id: `r-${Date.now()}`,
      donationId: messageId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      emoji,
      comment: comment?.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    setRooms(prevRooms => prevRooms.map(r => ({
      ...r,
      messages: r.messages.map(m => {
        if (m.id === messageId) {
          const currentReactions = m.reactions || [];
          return {
            ...m,
            reactions: [...currentReactions, newReaction]
          };
        }
        return m;
      })
    })));
  };

  const createRoom = (roomData: Omit<ChatRoom, 'messages' | 'unreadCount'>) => {
    const newRoom: ChatRoom = {
      ...roomData,
      messages: [],
      unreadCount: 0
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const inviteToRoom = (roomId: string, userId: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId && !r.participantIds.includes(userId)) {
        return { ...r, participantIds: [...r.participantIds, userId] };
      }
      return r;
    }));
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    screen,
    setScreen,
    rooms,
    activeRoomId,
    setActiveRoomId,
    sendMessage,
    autoTranslate,
    setAutoTranslate,
    donations,
    addDonation,
    showDonation,
    setShowDonation,
    allUsers,
    sidebarOpen,
    setSidebarOpen,
    setUserLanguage,
    translate,
    createRoom,
    inviteToRoom,
    showCreateRoom,
    setShowCreateRoom,
    showMembers,
    setShowMembers,
    addReactionToDonation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
