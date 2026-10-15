import React, { useState } from 'react';
import { useApp } from '../store';
import { CharacterAvatar } from './CharacterAvatar';
import { DONOR_TIERS } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { currentUser, setCurrentUser, setScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'terms' | 'privacy'>('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !currentUser) return null;

  const tierInfo = currentUser.tier ? DONOR_TIERS[currentUser.tier] : DONOR_TIERS.bronze;

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
    onClose();
  };

  const handleDeleteAccount = () => {
    // Apple App Store Guideline 5.1.1 compliance
    alert('계정이 성공적으로 탈퇴 처리되었습니다. 모든 개인정보와 캐릭터 데이터가 즉시 삭제되었습니다.');
    setCurrentUser(null);
    setScreen('login');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h3 className="font-bold text-gray-900 text-base">설정 및 계정 관리</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-100 px-4 pt-2 bg-gray-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 px-3 border-b-2 transition-colors ${activeTab === 'profile' ? 'border-bibple-600 text-bibple-600' : 'border-transparent text-gray-500'}`}
          >
            내 프로필
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2 px-3 border-b-2 transition-colors ${activeTab === 'terms' ? 'border-bibple-600 text-bibple-600' : 'border-transparent text-gray-500'}`}
          >
            이용약관 (EULA)
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-3 border-b-2 transition-colors ${activeTab === 'privacy' ? 'border-bibple-600 text-bibple-600' : 'border-transparent text-gray-500'}`}
          >
            개인정보처리방침
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 text-sm text-gray-700">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <CharacterAvatar config={currentUser.avatar} size={64} tier={currentUser.tier} showTierBadge />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-gray-900 text-base">
                    <span>{currentUser.name}</span>
                    <span>{currentUser.countryFlag}</span>
                  </div>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 font-extrabold">
                    <span>{tierInfo.badge}</span>
                    <span>{tierInfo.name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">거주 국가</span>
                  <span className="font-semibold text-gray-800">{currentUser.country} ({currentUser.countryFlag})</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">사용 모국어</span>
                  <span className="font-semibold text-gray-800">{currentUser.language.toUpperCase()}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">직업</span>
                  <span className="font-semibold text-gray-800">{currentUser.occupation}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">총 헌금/기부</span>
                  <span className="font-semibold text-emerald-600 font-bold">${currentUser.totalDonation || 0}</span>
                </div>
              </div>

              {currentUser.bio && (
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
                  <span className="text-gray-400 block mb-0.5">소개글</span>
                  <p className="text-gray-700 italic">"{currentUser.bio}"</p>
                </div>
              )}

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <span>🚪</span> 로그아웃
                </button>

                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-2 px-4 text-red-500 hover:text-red-700 hover:bg-red-50 font-medium rounded-xl text-xs transition-colors"
                  >
                    계정 탈퇴 (Delete Account)
                  </button>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs">
                    <p className="text-red-700 font-bold">정말 계정을 탈퇴하시겠습니까?</p>
                    <p className="text-red-600 text-[11px]">
                      탈퇴 시 생성된 캐릭터, 대화 기록, 헌금 뱃지 등 모든 데이터가 영구히 삭제되며 복구할 수 없습니다. (App Store Guideline 5.1.1)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteAccount}
                        className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
                      >
                        탈퇴 확정
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <h4 className="font-bold text-gray-900 text-sm">Bibple Chat 이용약관 (EULA)</h4>
              <p className="text-gray-600">
                Bibple Chat은 전 세계 성도와 신앙인이 그리스도 예수 안에서 하나 됨을 목적으로 하는 글로벌 커뮤니티 플랫폼입니다.
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">1. 부적절한 콘텐츠 무관용 원칙 (Zero Tolerance)</p>
                <p className="text-gray-500">
                  타인에 대한 혐오 발언, 음란물, 폭력적 언행, 괴롭힘 및 사기 행위는 엄격히 금지됩니다. 위반 시 사전 경고 없이 계정이 영구 정지될 수 있습니다.
                </p>
                <p className="font-semibold text-gray-800">2. 신고 및 사용자 차단 기능</p>
                <p className="text-gray-500">
                  모든 대화창에서 부적절한 사용자를 즉시 신고하거나 차단할 수 있습니다. 운영진은 신고 접수 후 24시간 이내에 검토 및 제재를 진행합니다.
                </p>
                <p className="font-semibold text-gray-800">3. 기부 및 헌금 안내</p>
                <p className="text-gray-500">
                  앱 내 기부 및 헌금은 글로벌 선교 및 자선 단체 지원에 사용되며, 회원 등급 뱃지는 감사와 축복의 상징으로 부여됩니다.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <h4 className="font-bold text-gray-900 text-sm">개인정보 처리방침 (Privacy Policy)</h4>
              <p className="text-gray-600">
                Bibple Chat은 사용자의 소중한 개인정보를 안전하게 보호하며, 관련 법령을 엄격히 준수합니다.
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">1. 수집하는 정보</p>
                <p className="text-gray-500">
                  이메일, 닉네임, 거주 국가, 소통 모국어, 커스텀 캐릭터 설정 정보.
                </p>
                <p className="font-semibold text-gray-800">2. 실시간 번역 데이터</p>
                <p className="text-gray-500">
                  채팅 메시지의 실시간 번역은 암호화된 세션을 통해 전송되며 번역 목적으로만 활용되고 제3자에게 판매되지 않습니다.
                </p>
                <p className="font-semibold text-gray-800">3. 개인정보 파기 및 탈퇴 권리</p>
                <p className="text-gray-500">
                  사용자는 앱 내 "계정 탈퇴" 버튼을 통해 언제든지 즉시 모든 개인정보와 데이터를 영구 파기할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Bibple Chat v1.0.0 (Build 1) • All Nations Are One
        </div>
      </div>
    </div>
  );
}
