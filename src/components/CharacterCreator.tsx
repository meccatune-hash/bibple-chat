import React, { useState } from 'react';
import {
  CharacterConfig,
  CharacterAvatar,
  DEFAULT_CHARACTER,
  SKIN_TONES,
  HAIR_COLORS,
  EYE_COLORS,
  CLOTHING_COLORS,
  BACKGROUND_THEMES
} from './CharacterAvatar';

interface CharacterCreatorProps {
  value: CharacterConfig;
  onChange: (config: CharacterConfig) => void;
}

type TabKey = 'hair' | 'face' | 'clothes' | 'accessories' | 'theme';

export default function CharacterCreator({ value, onChange }: CharacterCreatorProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('hair');

  const update = (patch: Partial<CharacterConfig>) => {
    onChange({ ...value, ...patch });
  };

  // Preset styles (presets to jump start)
  const presets: { label: string; config: CharacterConfig }[] = [
    {
      label: 'Classic Faith',
      config: {
        ...DEFAULT_CHARACTER,
        clothing: 'hoodie',
        clothingColor: '#6366F1',
        accessory: 'crossNecklace',
        backgroundTheme: 'bibple'
      }
    },
    {
      label: 'Holy Grace',
      config: {
        gender: 'female',
        skinTone: '#FDDFD0',
        hairStyle: 'wavy',
        hairColor: '#E8B953',
        eyeStyle: 'sparkle',
        eyeColor: '#1E3A8A',
        expression: 'joy',
        clothing: 'pastorRobe',
        clothingColor: '#FFFFFF',
        accessory: 'halo',
        backgroundTheme: 'holy'
      }
    },
    {
      label: 'Global Peace',
      config: {
        gender: 'male',
        skinTone: '#99592A',
        hairStyle: 'curly',
        hairColor: '#1A1A1A',
        eyeStyle: 'happy',
        eyeColor: '#5C381E',
        expression: 'bigSmile',
        clothing: 'traditional',
        clothingColor: '#059669',
        accessory: 'crossNecklace',
        backgroundTheme: 'peace'
      }
    },
    {
      label: 'Youth Worship',
      config: {
        gender: 'male',
        skinTone: '#FCD5B5',
        hairStyle: 'spiky',
        hairColor: '#7C3AED',
        eyeStyle: 'cool',
        eyeColor: '#7C3AED',
        expression: 'smile',
        clothing: 'casualKnit',
        clothingColor: '#F59E0B',
        accessory: 'sunglasses',
        backgroundTheme: 'sunset'
      }
    }
  ];

  const randomize = () => {
    const hairStyles: CharacterConfig['hairStyle'][] = ['short', 'spiky', 'curly', 'long', 'wavy', 'bob', 'afro', 'bald'];
    const eyeStyles: CharacterConfig['eyeStyle'][] = ['normal', 'happy', 'sparkle', 'cool', 'gentle'];
    const expressions: CharacterConfig['expression'][] = ['smile', 'bigSmile', 'calm', 'gentle', 'joy'];
    const clothes: CharacterConfig['clothing'][] = ['tshirt', 'hoodie', 'suit', 'pastorRobe', 'casualKnit', 'traditional'];
    const accessories: CharacterConfig['accessory'][] = ['none', 'glasses', 'sunglasses', 'crossNecklace', 'halo', 'headband'];
    const themes = Object.keys(BACKGROUND_THEMES) as (keyof typeof BACKGROUND_THEMES)[];

    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    onChange({
      gender: Math.random() > 0.5 ? 'male' : 'female',
      skinTone: pick(SKIN_TONES).color,
      hairStyle: pick(hairStyles),
      hairColor: pick(HAIR_COLORS).color,
      eyeStyle: pick(eyeStyles),
      eyeColor: pick(EYE_COLORS).color,
      expression: pick(expressions),
      clothing: pick(clothes),
      clothingColor: pick(CLOTHING_COLORS).color,
      accessory: pick(accessories),
      backgroundTheme: pick(themes) as any
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-lg p-5">
      {/* Top Header / Avatar Preview Area */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
        {/* Live Preview Avatar */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-indigo-500 to-purple-600 shadow-xl flex items-center justify-center animate-pulse-glow">
            <CharacterAvatar config={value} size={120} className="w-full h-full" />
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-indigo-600 text-white text-[11px] font-bold rounded-full shadow-md whitespace-nowrap">
            PREVIEW
          </span>
        </div>

        {/* Info & Randomizer */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between mb-2">
            <div>
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-1.5 justify-center sm:justify-start">
                <span>🎨</span> 캐릭터 커스터마이징
              </h4>
              <p className="text-xs text-gray-500">
                헤어, 표정, 의상, 십자가 목걸이 등 나만의 믿음의 캐릭터를 만들어보세요!
              </p>
            </div>
            <button
              type="button"
              onClick={randomize}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-sm"
              title="랜덤 생성"
            >
              <span>🎲</span> 랜덤 생성
            </button>
          </div>

          {/* Quick Presets */}
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
              프리셋 스타일
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              {presets.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onChange(p.config)}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 text-xs rounded-full font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={randomize}
                className="sm:hidden px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-full font-bold"
              >
                🎲 랜덤
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2 scrollbar-none border-b border-gray-100">
        {[
          { key: 'hair' as TabKey, label: '헤어 & 피부', icon: '💇' },
          { key: 'face' as TabKey, label: '눈 & 표정', icon: '👀' },
          { key: 'clothes' as TabKey, label: '의상 & 컬러', icon: '👕' },
          { key: 'accessories' as TabKey, label: '악세서리', icon: '✝️' },
          { key: 'theme' as TabKey, label: '배경 테마', icon: '🌟' }
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === t.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="pt-4 min-h-[220px]">
        {/* TAB 1: HAIR & SKIN */}
        {activeTab === 'hair' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Skin Tone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                피부톤 (Skin Tone)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {SKIN_TONES.map(s => (
                  <button
                    key={s.color}
                    type="button"
                    onClick={() => update({ skinTone: s.color })}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      value.skinTone === s.color
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: s.color }}
                    title={s.label}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                헤어 스타일 (Hair Style)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                {[
                  { key: 'short', label: '단정한 숏', icon: '👦' },
                  { key: 'spiky', label: '샤기 스파이키', icon: '⚡' },
                  { key: 'curly', label: '풍성한 펌', icon: '🌀' },
                  { key: 'bob', label: '단발 밥컷', icon: '👩' },
                  { key: 'long', label: '스트레이트 롱', icon: '👱' },
                  { key: 'wavy', label: '우아한 웨이브', icon: '✨' },
                  { key: 'afro', label: '개성 넘치는 아프로', icon: '🎈' },
                  { key: 'bald', label: '깔끔한 삭발', icon: '✨' }
                ].map(h => (
                  <button
                    key={h.key}
                    type="button"
                    onClick={() => update({ hairStyle: h.key as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      value.hairStyle === h.key
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="text-lg mb-1">{h.icon}</div>
                    <div className="text-[11px] truncate">{h.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                헤어 컬러 (Hair Color)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {HAIR_COLORS.map(c => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => update({ hairColor: c.color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      value.hairColor === c.color
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EYES & EXPRESSION */}
        {activeTab === 'face' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Eye Style */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                눈 스타일 (Eyes)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'sparkle', label: '초롱초롱 은혜 눈빛', icon: '✨' },
                  { key: 'happy', label: '반달 눈웃음', icon: '😊' },
                  { key: 'normal', label: '클래식 단정 눈', icon: '👀' },
                  { key: 'gentle', label: '온유하고 따뜻한 눈', icon: '🕊️' },
                  { key: 'cool', label: '지혜롭고 또렷한 눈', icon: '🎯' }
                ].map(e => (
                  <button
                    key={e.key}
                    type="button"
                    onClick={() => update({ eyeStyle: e.key as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      value.eyeStyle === e.key
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="text-base mb-1">{e.icon}</div>
                    <div className="text-xs truncate">{e.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Eye Color */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                눈동자 색상 (Eye Color)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {EYE_COLORS.map(c => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => update({ eyeColor: c.color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      value.eyeColor === c.color
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Expression */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                표정 / 미소 (Expression)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'smile', label: '따뜻한 미소', icon: '🙂' },
                  { key: 'bigSmile', label: '환한 감사 웃음', icon: '😄' },
                  { key: 'joy', label: '넘치는 기쁨', icon: '🥰' },
                  { key: 'gentle', label: '온유한 표정', icon: '😌' },
                  { key: 'calm', label: '평안한 묵상', icon: '🧘' }
                ].map(ex => (
                  <button
                    key={ex.key}
                    type="button"
                    onClick={() => update({ expression: ex.key as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      value.expression === ex.key
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="text-base mb-1">{ex.icon}</div>
                    <div className="text-xs truncate">{ex.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLOTHES & COLOR */}
        {activeTab === 'clothes' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Clothing Style */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                의상 종류 (Outfit Style)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'hoodie', label: '청년 캐주얼 후드', icon: '🧥' },
                  { key: 'tshirt', label: '베이직 라운드 티', icon: '👕' },
                  { key: 'suit', label: '단정한 예배 정장', icon: '👔' },
                  { key: 'pastorRobe', label: '성직자 가운/스톨', icon: '🕊️' },
                  { key: 'casualKnit', label: '포근한 터틀넥 니트', icon: '🧶' },
                  { key: 'traditional', label: '전통 민족 의상', icon: '🌏' }
                ].map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => update({ clothing: c.key as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      value.clothing === c.key
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="text-base mb-1">{c.icon}</div>
                    <div className="text-xs truncate">{c.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Clothing Color */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                의상 색상 (Clothing Color)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {CLOTHING_COLORS.map(c => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => update({ clothingColor: c.color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      value.clothingColor === c.color
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACCESSORIES */}
        {activeTab === 'accessories' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                악세서리 & 성물 (Accessories)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'crossNecklace', label: '골드 십자가 목걸이', icon: '✝️', desc: '황금빛 십자가 펜던트' },
                  { key: 'halo', label: '빛나는 거룩한 후광 (Halo)', icon: '😇', desc: '머리 위 거룩한 빛의 링' },
                  { key: 'glasses', label: '스마트 지적 안경', icon: '👓', desc: '단정한 검정 뿔테 안경' },
                  { key: 'sunglasses', label: '스타일리시 선글라스', icon: '🕶️', desc: '쿨한 블랙 셰이드' },
                  { key: 'headband', label: '열정 헤어밴드', icon: '🔴', desc: '찬양팀 스타일 레드 밴드' },
                  { key: 'none', label: '악세서리 없음', icon: '🚫', desc: '자연스러운 기본 상태' }
                ].map(a => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => update({ accessory: a.key as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      value.accessory === a.key
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="text-xl mb-1">{a.icon}</div>
                    <div className="text-xs font-bold">{a.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 truncate">{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: THEME / BACKGROUND */}
        {activeTab === 'theme' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                아바타 배경 테마 (Aura & Gradient)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(BACKGROUND_THEMES).map(([k, t]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => update({ backgroundTheme: k as any })}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      value.backgroundTheme === k
                        ? 'border-indigo-600 ring-2 ring-indigo-200 bg-indigo-50/50 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-white shadow-sm shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-gray-900 truncate">{t.label}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{k}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
