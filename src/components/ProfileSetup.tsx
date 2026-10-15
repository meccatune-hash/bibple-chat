import React, { useState } from 'react';
import { useApp } from '../store';
import { countries, languages, occupations } from '../countries';
import { User } from '../types';
import CharacterCreator from './CharacterCreator';
import { CharacterConfig, DEFAULT_CHARACTER, CharacterAvatar } from './CharacterAvatar';

export default function ProfileSetup() {
  const { setCurrentUser, setScreen } = useApp();
  const [step, setStep] = useState(1);
  
  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('Prefer not to say');
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig>(DEFAULT_CHARACTER);
  
  const detectedLang = typeof navigator !== 'undefined' && navigator.language ? navigator.language.split('-')[0].toLowerCase() : 'ko';
  const initialLang = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'hi', 'ar'].includes(detectedLang) ? detectedLang : 'ko';
  const initialCountry = initialLang === 'ko' ? 'KR' : initialLang === 'ja' ? 'JP' : initialLang === 'zh' ? 'CN' : 'US';

  const [countryCode, setCountryCode] = useState(initialCountry);
  const [languageCode, setLanguageCode] = useState(initialLang);
  const [occupation, setOccupation] = useState(occupations[0] || 'Student');
  const [bio, setBio] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);

  const handleCountryChange = (cCode: string) => {
    setCountryCode(cCode);
    const countryLangMap: Record<string, string> = {
      KR: 'ko', US: 'en', GB: 'en', CA: 'en', AU: 'en',
      JP: 'ja', CN: 'zh', ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es',
      FR: 'fr', DE: 'de', BR: 'pt', IN: 'hi', EG: 'ar', SA: 'ar', AE: 'ar',
      RU: 'ru', IT: 'it', ID: 'id', TR: 'tr', VN: 'vi'
    };
    if (countryLangMap[cCode]) {
      setLanguageCode(countryLangMap[cCode]);
    }
  };

  const handleComplete = () => {
    if (!tosAccepted) return;
    
    const selectedCountry = countries.find(c => c.code === countryCode);
    
    // Store character config as serialized JSON in the avatar field
    const avatarJson = JSON.stringify(characterConfig);

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email: 'user@example.com', // mock email
      avatar: avatarJson,
      country: countryCode,
      countryFlag: selectedCountry?.flag || '🏳️',
      gender,
      age: Number(age) || 18,
      occupation,
      language: languageCode,
      bio,
      isOnline: true,
      joinedAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    setScreen('chat');
  };

  const nextStep = () => {
    if (step === 1 && (!name || !age)) return;
    setStep(s => Math.min(s + 1, 3));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Wizard Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 px-6 py-6 text-center text-white relative">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-amber-400 font-extrabold text-lg">Bib</span>
            <span className="text-white font-extrabold text-lg">ple</span>
            <span className="text-purple-200 text-xs font-semibold px-2 py-0.5 bg-white/10 rounded-full">
              Character Creator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">나만의 캐릭터 만들기</h2>
          <p className="mt-1 text-indigo-100 text-xs sm:text-sm">
            Step {step} of 3 — {step === 1 ? '캐릭터 외형 및 기본 정보' : step === 2 ? '국가 & 소통 언어' : '소개 & 가입 완료'}
          </p>
          
          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto bg-black/20 rounded-full h-2 mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* STEP 1: Basic Info & Game-style Character Creator */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {/* Basic Fields: Name, Age, Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    이름 / 닉네임 <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all" 
                    placeholder="예: 은혜로운다윗, Paul"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    나이 <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    min="13" 
                    max="120"
                    value={age} 
                    onChange={e => setAge(e.target.value ? parseInt(e.target.value) : '')} 
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all" 
                    placeholder="나이 입력 (예: 25)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">성별</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {['Male', 'Female', 'Other', 'Prefer not to say'].map(g => (
                    <label 
                      key={g} 
                      className={`flex items-center justify-center p-2.5 border rounded-xl cursor-pointer text-xs transition-colors ${
                        gender === g 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-sm' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        className="sr-only" 
                        checked={gender === g} 
                        onChange={() => setGender(g)} 
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* GAME CHARACTER CREATOR COMPONENT */}
              <div className="pt-2">
                <CharacterCreator
                  value={characterConfig}
                  onChange={setCharacterConfig}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Language */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center pb-2">
                <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 shadow-md mb-2">
                  <CharacterAvatar config={characterConfig} size={80} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{name || '내 캐릭터'}님의 거주 국가 & 언어</h3>
                <p className="text-xs text-gray-500">전 세계 성도들과 실시간 자동 번역으로 하나가 됩니다.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">국가 (Country / Region)</label>
                <select 
                  value={countryCode} 
                  onChange={e => handleCountryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-sm"
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  소통 모국어 (Native Language - 실시간 자동 번역 기준 언어)
                </label>
                <select 
                  value={languageCode} 
                  onChange={e => setLanguageCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-sm"
                >
                  {languages.map(l => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name} ({l.nativeName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">직업 / 신분 (Occupation)</label>
                <select 
                  value={occupation} 
                  onChange={e => setOccupation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-sm"
                >
                  {occupations.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: About You & Terms */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                <CharacterAvatar config={characterConfig} size={70} />
                <div>
                  <h4 className="font-bold text-indigo-950 text-base">{name}</h4>
                  <p className="text-xs text-indigo-700">
                    {countries.find(c => c.code === countryCode)?.flag} {countries.find(c => c.code === countryCode)?.name} • {languages.find(l => l.code === languageCode)?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{occupation}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">소개 / 기도제목 (Bio, Optional)</label>
                <textarea 
                  value={bio} 
                  onChange={e => setBio(e.target.value)} 
                  maxLength={200}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm" 
                  placeholder="자기소개나 세계의 형제자매들과 나누고 싶은 기도제목을 적어주세요..."
                />
                <div className="text-right text-xs text-gray-400 mt-1">{bio.length}/200</div>
              </div>

              <div className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center h-5">
                  <input 
                    id="tos" 
                    type="checkbox" 
                    checked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" 
                  />
                </div>
                <div className="ml-3 text-xs sm:text-sm">
                  <label htmlFor="tos" className="font-bold text-gray-800 cursor-pointer">
                    Bibple Chat 이용약관 및 커뮤니티 평화 서약 동의
                  </label>
                  <p className="text-gray-500 mt-1 text-xs leading-relaxed">
                    모든 민족이 말씀(Bible) 안에서 하나(People = One)되기 위해 서로를 존중하고 사랑으로 교제할 것을 약속합니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex justify-between items-center">
          {step > 1 ? (
            <button 
              type="button"
              onClick={prevStep} 
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors text-sm"
            >
              ← 이전
            </button>
          ) : <div />}
          
          {step < 3 ? (
            <button 
              type="button"
              onClick={nextStep} 
              disabled={step === 1 && (!name || !age)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto text-sm shadow-md"
            >
              다음 단계 →
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleComplete} 
              disabled={!tosAccepted}
              className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto flex items-center gap-1.5 text-sm shadow-lg active:scale-98"
            >
              <span>✨</span> 캐릭터 생성 완료 & 채팅 시작
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
