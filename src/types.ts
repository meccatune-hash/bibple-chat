export type DonorTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'seraphim';

export interface TierInfo {
  tier: DonorTier;
  name: string;
  badge: string;
  color: string;
  borderClass: string;
  glowClass: string;
  minAmount: number;
  description: string;
  perks: string[];
}

export const DONOR_TIERS: Record<DonorTier, TierInfo> = {
  bronze: {
    tier: 'bronze',
    name: '은혜의 씨앗 (Seed of Grace)',
    badge: '🌱',
    color: '#D97706',
    borderClass: 'border-amber-600',
    glowClass: 'shadow-amber-500/20',
    minAmount: 0,
    description: '나눔의 첫 발걸음을 내딛은 은혜로운 성도',
    perks: ['프로필 브론즈 뱃지', '글로벌 기도방 참여']
  },
  silver: {
    tier: 'silver',
    name: '평화의 샘 (Spring of Peace)',
    badge: '🕊️',
    color: '#94A3B8',
    borderClass: 'border-slate-400 ring-2 ring-slate-300',
    glowClass: 'shadow-slate-400/40',
    minAmount: 50,
    description: '사랑과 헌신으로 평화를 심는 귀한 성도',
    perks: ['실버 아우라 링', '후광/십자가 악세서리 특화', '자유 대화방 개설']
  },
  gold: {
    tier: 'gold',
    name: '찬양의 빛 (Light of Praise)',
    badge: '👑',
    color: '#F59E0B',
    borderClass: 'border-amber-400 ring-2 ring-amber-300',
    glowClass: 'shadow-amber-400/50',
    minAmount: 200,
    description: '빛과 소금의 사명을 감당하는 믿음의 리더',
    perks: ['골드 엠페러 크라운 뱃지', '금빛 반짝임 아우라', '댓글 & 축하 특별 이모지']
  },
  platinum: {
    tier: 'platinum',
    name: '사랑의 기둥 (Pillar of Love)',
    badge: '💎',
    color: '#06B6D4',
    borderClass: 'border-cyan-400 ring-2 ring-cyan-300',
    glowClass: 'shadow-cyan-400/60',
    minAmount: 500,
    description: '선한 사역의 든든한 동역자이자 기둥',
    perks: ['다이아몬드 찬란한 빛', 'VIP 방 개설 권한', '헌금 축하 우선 알림']
  },
  seraphim: {
    tier: 'seraphim',
    name: '세라핌 수호자 (Seraphim Guardian)',
    badge: '✨👼',
    color: '#8B5CF6',
    borderClass: 'border-purple-400 ring-4 ring-amber-300',
    glowClass: 'shadow-purple-500/80 animate-pulse',
    minAmount: 1000,
    description: '전 세계 선교와 영혼 구원을 이끄는 최고의 후원자',
    perks: ['천상의 천사 날개 & 홀리 아우라', '전체 채팅 강조 뱃지', '무제한 대화방 개설 & 초대']
  }
};

export function getTierFromAmount(amount: number): TierInfo {
  if (amount >= DONOR_TIERS.seraphim.minAmount) return DONOR_TIERS.seraphim;
  if (amount >= DONOR_TIERS.platinum.minAmount) return DONOR_TIERS.platinum;
  if (amount >= DONOR_TIERS.gold.minAmount) return DONOR_TIERS.gold;
  if (amount >= DONOR_TIERS.silver.minAmount) return DONOR_TIERS.silver;
  return DONOR_TIERS.bronze;
}

export interface DonationReaction {
  id: string;
  donationId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  emoji: string;
  comment?: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
  countryFlag: string;
  gender: string;
  age: number;
  occupation: string;
  language: string;
  bio: string;
  isOnline: boolean;
  joinedAt: string;
  totalDonation?: number;
  tier?: DonorTier;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderCountryFlag: string;
  content: string;
  translatedContent?: string;
  originalLanguage: string;
  timestamp: string;
  type?: 'message' | 'donation-alert';
  donationAmount?: number;
  donationCurrency?: string;
  donationOrg?: string;
  donorTier?: DonorTier;
  reactions?: DonationReaction[];
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'global' | 'direct' | 'group';
  icon: string;
  description: string;
  participantIds: string[];
  messages: ChatMessage[];
  unreadCount: number;
  creatorId?: string;
  country?: string;
  countryFlag?: string;
  isPublic?: boolean;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  amount: number;
  currency: string;
  platformFee: number;
  processingFee: number;
  totalFee: number;
  netDonation: number;
  recipientOrg: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export type Screen = 'login' | 'profile-setup' | 'chat';
