import React from 'react';
import { DonorTier, DONOR_TIERS } from '../types';

export interface CharacterConfig {
  gender: 'male' | 'female';
  skinTone: string; // hex
  hairStyle: 'short' | 'spiky' | 'curly' | 'long' | 'wavy' | 'bob' | 'afro' | 'bald';
  hairColor: string; // hex
  eyeStyle: 'normal' | 'happy' | 'sparkle' | 'cool' | 'gentle';
  eyeColor: string; // hex
  expression: 'smile' | 'bigSmile' | 'calm' | 'gentle' | 'joy';
  clothing: 'tshirt' | 'hoodie' | 'suit' | 'pastorRobe' | 'casualKnit' | 'traditional';
  clothingColor: string; // hex
  accessory: 'none' | 'glasses' | 'sunglasses' | 'crossNecklace' | 'halo' | 'headband';
  accessoryColor?: string;
  backgroundTheme: 'bibple' | 'sunset' | 'peace' | 'holy' | 'nature' | 'sky';
}

export const DEFAULT_CHARACTER: CharacterConfig = {
  gender: 'male',
  skinTone: '#FCD5B5',
  hairStyle: 'short',
  hairColor: '#3D2314',
  eyeStyle: 'sparkle',
  eyeColor: '#2B1A09',
  expression: 'smile',
  clothing: 'hoodie',
  clothingColor: '#6366F1',
  accessory: 'crossNecklace',
  backgroundTheme: 'bibple'
};

export const SKIN_TONES = [
  { label: 'Fair', color: '#FDDFD0' },
  { label: 'Peach', color: '#FCD5B5' },
  { label: 'Warm Beige', color: '#E8B688' },
  { label: 'Tan', color: '#C88A58' },
  { label: 'Bronze', color: '#99592A' },
  { label: 'Deep', color: '#5B3419' }
];

export const HAIR_COLORS = [
  { label: 'Black', color: '#1A1A1A' },
  { label: 'Dark Brown', color: '#3D2314' },
  { label: 'Chestnut', color: '#6A3D1E' },
  { label: 'Golden Blonde', color: '#E8B953' },
  { label: 'Platinum', color: '#F3E5AB' },
  { label: 'Auburn', color: '#9A3324' },
  { label: 'Silver Gray', color: '#9CA3AF' },
  { label: 'Bibple Purple', color: '#7C3AED' }
];

export const EYE_COLORS = [
  { label: 'Dark Brown', color: '#2B1A09' },
  { label: 'Warm Brown', color: '#5C381E' },
  { label: 'Deep Blue', color: '#1E3A8A' },
  { label: 'Sky Blue', color: '#38BDF8' },
  { label: 'Emerald Green', color: '#059669' },
  { label: 'Amber', color: '#D97706' },
  { label: 'Violet', color: '#7C3AED' }
];

export const CLOTHING_COLORS = [
  { label: 'Bibple Indigo', color: '#6366F1' },
  { label: 'Pure White', color: '#FFFFFF' },
  { label: 'Royal Purple', color: '#7C3AED' },
  { label: 'Navy Blue', color: '#1E3A8A' },
  { label: 'Emerald Peace', color: '#059669' },
  { label: 'Sunset Amber', color: '#F59E0B' },
  { label: 'Rose Love', color: '#F43F5E' },
  { label: 'Charcoal Black', color: '#1F2937' }
];

export const BACKGROUND_THEMES: Record<string, { label: string; gradient: [string, string] }> = {
  bibple: { label: 'Bibple Faith', gradient: ['#4F46E5', '#7C3AED'] },
  holy: { label: 'Holy Grace', gradient: ['#F59E0B', '#D97706'] },
  peace: { label: 'Living Waters', gradient: ['#06B6D4', '#3B82F6'] },
  sunset: { label: 'Evening Praise', gradient: ['#EC4899', '#F97316'] },
  nature: { label: 'Eden Forest', gradient: ['#10B981', '#059669'] },
  sky: { label: 'Heavenly Sky', gradient: ['#60A5FA', '#818CF8'] }
};

interface AvatarProps {
  config?: CharacterConfig | string;
  size?: number | string;
  className?: string;
  showBadge?: boolean;
  tier?: DonorTier;
  showTierBadge?: boolean;
}

/**
 * CharacterAvatar - Renders a game-like customizable SVG character avatar.
 * Falls back gracefully to legacy emoji strings if config is a simple string.
 */
export const CharacterAvatar: React.FC<AvatarProps> = ({
  config,
  size = 64,
  className = '',
  showBadge = false,
  tier,
  showTierBadge = false
}) => {
  // Check if config is a JSON string of CharacterConfig
  let charConfig: CharacterConfig = DEFAULT_CHARACTER;
  let isEmoji = false;
  let emojiChar = '🧑';

  if (typeof config === 'string') {
    if (config.startsWith('{')) {
      try {
        charConfig = { ...DEFAULT_CHARACTER, ...JSON.parse(config) };
      } catch {
        isEmoji = true;
        emojiChar = config;
      }
    } else {
      isEmoji = true;
      emojiChar = config;
    }
  } else if (config) {
    charConfig = { ...DEFAULT_CHARACTER, ...config };
  }

  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 64;

  if (isEmoji) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-bibple-50 select-none overflow-hidden ${className}`}
        style={{
          width: numericSize,
          height: numericSize,
          fontSize: numericSize * 0.55
        }}
      >
        <span>{emojiChar}</span>
      </div>
    );
  }

  const {
    skinTone,
    hairStyle,
    hairColor,
    eyeStyle,
    eyeColor,
    expression,
    clothing,
    clothingColor,
    accessory,
    backgroundTheme
  } = charConfig;

  const bgGrad = BACKGROUND_THEMES[backgroundTheme]?.gradient || BACKGROUND_THEMES.bibple.gradient;
  const gradientId = `avatar-bg-${Math.random().toString(36).substr(2, 9)}`;

  // Donor Tier visual effects
  const tierInfo = tier ? DONOR_TIERS[tier] : null;

  let tierRingClass = '';
  if (tier === 'silver') tierRingClass = 'ring-2 ring-slate-300 ring-offset-1';
  if (tier === 'gold') tierRingClass = 'ring-3 ring-amber-400 ring-offset-1 shadow-lg shadow-amber-400/30';
  if (tier === 'platinum') tierRingClass = 'ring-3 ring-cyan-400 ring-offset-1 shadow-lg shadow-cyan-400/40';
  if (tier === 'seraphim') tierRingClass = 'ring-4 ring-purple-400 ring-offset-1 shadow-xl shadow-purple-500/50 animate-pulse';

  // SVG dimensions: 100 x 100 viewBox
  return (
    <div
      className={`relative inline-block select-none overflow-visible ${className}`}
      style={{ width: numericSize, height: numericSize }}
    >
      <div className={`relative w-full h-full rounded-full overflow-hidden ${tierRingClass}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bgGrad[0]} />
            <stop offset="100%" stopColor={bgGrad[1]} />
          </linearGradient>
          {/* Subtle drop shadow */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Circular Background */}
        <circle cx="50" cy="50" r="50" fill={`url(#${gradientId})`} />

        {/* Seraphim / Angel Wings if seraphim tier */}
        {tier === 'seraphim' && (
          <g opacity="0.85" filter="url(#shadow)">
            {/* Left Wing */}
            <path
              d="M 28 42 C 10 30, 2 50, 14 68 C 18 64, 22 55, 28 50 Z"
              fill="#FFFFFF"
              stroke="#FDE047"
              strokeWidth="1.2"
            />
            {/* Right Wing */}
            <path
              d="M 72 42 C 90 30, 98 50, 86 68 C 82 64, 78 55, 72 50 Z"
              fill="#FFFFFF"
              stroke="#FDE047"
              strokeWidth="1.2"
            />
          </g>
        )}

        {/* Platinum Radiant Aura */}
        {tier === 'platinum' && (
          <circle cx="50" cy="50" r="48" fill="none" stroke="#22D3EE" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
        )}

        {/* Gold Radiant Aura */}
        {tier === 'gold' && (
          <circle cx="50" cy="50" r="48" fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.9" />
        )}

        {/* Aura / Holy glow circle */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Halo Accessory (Behind Head) */}
        {accessory === 'halo' && (
          <ellipse
            cx="50"
            cy="18"
            rx="22"
            ry="6"
            fill="none"
            stroke="#FDE047"
            strokeWidth="3.5"
            filter="url(#shadow)"
          />
        )}

        {/* Hair - Back Layer (for long & wavy) */}
        {(hairStyle === 'long' || hairStyle === 'wavy') && (
          <path
            d={
              hairStyle === 'long'
                ? 'M 24 40 C 22 55, 20 75, 24 88 C 30 88, 38 82, 38 70 L 38 45 Z M 76 40 C 78 55, 80 75, 76 88 C 70 88, 62 82, 62 70 L 62 45 Z'
                : 'M 22 40 C 18 55, 24 75, 20 86 C 28 88, 36 80, 38 68 L 38 45 Z M 78 40 C 82 55, 76 75, 80 86 C 72 88, 64 80, 62 68 L 62 45 Z'
            }
            fill={hairColor}
          />
        )}

        {/* Neck */}
        <rect x="44" y="62" width="12" height="14" rx="3" fill={skinTone} filter="url(#shadow)" />
        {/* Neck shadow */}
        <ellipse cx="50" cy="65" rx="7" ry="2" fill="rgba(0,0,0,0.12)" />

        {/* Body / Clothing */}
        <g filter="url(#shadow)">
          {clothing === 'hoodie' && (
            <>
              {/* Shoulders */}
              <path d="M 22 100 L 22 84 C 22 75, 36 72, 50 72 C 64 72, 78 75, 78 84 L 78 100 Z" fill={clothingColor} />
              {/* Hoodie strings & collar */}
              <path d="M 40 73 C 45 80, 55 80, 60 73 C 58 83, 42 83, 40 73 Z" fill="rgba(0,0,0,0.15)" />
              <line x1="45" y1="80" x2="44" y2="92" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="55" y1="80" x2="56" y2="92" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}

          {clothing === 'tshirt' && (
            <>
              <path d="M 22 100 L 22 83 C 22 74, 36 72, 50 72 C 64 72, 78 74, 78 83 L 78 100 Z" fill={clothingColor} />
              <path d="M 42 72 C 45 78, 55 78, 58 72 Z" fill={skinTone} />
              <path d="M 41 72 C 45 79, 55 79, 59 72" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            </>
          )}

          {clothing === 'suit' && (
            <>
              <path d="M 22 100 L 22 82 C 22 74, 36 72, 50 72 C 64 72, 78 74, 78 82 L 78 100 Z" fill={clothingColor} />
              {/* White shirt triangle */}
              <polygon points="50,72 43,90 57,90" fill="#FFFFFF" />
              {/* Tie */}
              <polygon points="50,74 48,77 52,77" fill="#DC2626" />
              <polygon points="48,77 52,77 53,92 50,96 47,92" fill="#DC2626" />
              {/* Lapels */}
              <path d="M 36 74 L 46 88 L 41 90 L 32 78 Z" fill="rgba(0,0,0,0.2)" />
              <path d="M 64 74 L 54 88 L 59 90 L 68 78 Z" fill="rgba(0,0,0,0.2)" />
            </>
          )}

          {clothing === 'pastorRobe' && (
            <>
              {/* Robe body */}
              <path d="M 20 100 L 20 80 C 20 72, 35 70, 50 70 C 65 70, 80 72, 80 80 L 80 100 Z" fill={clothingColor} />
              {/* Clerical collar or gold stole */}
              <path d="M 42 70 L 44 100 L 48 100 L 46 70 Z" fill="#F59E0B" />
              <path d="M 58 70 L 56 100 L 52 100 L 54 70 Z" fill="#F59E0B" />
              {/* Center small cross on stole */}
              <rect x="44.5" y="82" width="2" height="6" fill="#FFFFFF" />
              <rect x="42.5" y="84" width="6" height="2" fill="#FFFFFF" />
              <rect x="53.5" y="82" width="2" height="6" fill="#FFFFFF" />
              <rect x="51.5" y="84" width="6" height="2" fill="#FFFFFF" />
            </>
          )}

          {clothing === 'casualKnit' && (
            <>
              <path d="M 22 100 L 22 82 C 22 74, 36 71, 50 71 C 64 71, 78 74, 78 82 L 78 100 Z" fill={clothingColor} />
              {/* Turtleneck collar */}
              <rect x="40" y="67" width="20" height="8" rx="3" fill={clothingColor} filter="url(#shadow)" />
              {/* Knit texture stripes */}
              <line x1="44" y1="68" x2="44" y2="74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="68" x2="50" y2="74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="56" y1="68" x2="56" y2="74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </>
          )}

          {clothing === 'traditional' && (
            <>
              <path d="M 22 100 L 22 82 C 22 73, 36 71, 50 71 C 64 71, 78 73, 78 82 L 78 100 Z" fill={clothingColor} />
              {/* Cross overlap collar (Hanbok/Kimono/Traditional tunic style) */}
              <line x1="38" y1="71" x2="54" y2="86" stroke="#FDE047" strokeWidth="2.5" />
              <line x1="62" y1="71" x2="48" y2="84" stroke="#FFFFFF" strokeWidth="2.5" />
            </>
          )}
        </g>

        {/* Head / Ears */}
        {/* Ears */}
        <circle cx="28" cy="46" r="5.5" fill={skinTone} />
        <circle cx="72" cy="46" r="5.5" fill={skinTone} />
        <circle cx="28" cy="46" r="3" fill="rgba(0,0,0,0.08)" />
        <circle cx="72" cy="46" r="3" fill="rgba(0,0,0,0.08)" />

        {/* Head Base */}
        <ellipse cx="50" cy="45" rx="22" ry="24" fill={skinTone} filter="url(#shadow)" />

        {/* Cheeks / Blush */}
        <ellipse cx="36" cy="52" rx="4.5" ry="2.5" fill="#F43F5E" opacity="0.22" />
        <ellipse cx="64" cy="52" rx="4.5" ry="2.5" fill="#F43F5E" opacity="0.22" />

        {/* Eyebrows */}
        <g stroke={hairColor} strokeWidth="1.8" strokeLinecap="round" fill="none">
          {expression === 'joy' ? (
            <>
              <path d="M 35 34 Q 40 31 45 35" />
              <path d="M 65 34 Q 60 31 55 35" />
            </>
          ) : expression === 'smile' || expression === 'bigSmile' ? (
            <>
              <path d="M 35 34 Q 40 32 45 34" />
              <path d="M 65 34 Q 60 32 55 34" />
            </>
          ) : (
            <>
              <path d="M 35 35 Q 40 34 45 35" />
              <path d="M 65 35 Q 60 34 55 35" />
            </>
          )}
        </g>

        {/* Eyes */}
        <g>
          {eyeStyle === 'sparkle' && (
            <>
              {/* Left Eye */}
              <ellipse cx="40" cy="43" rx="3.5" ry="4.5" fill={eyeColor} />
              <circle cx="41.2" cy="41.5" r="1.4" fill="#FFFFFF" />
              <circle cx="39" cy="44.5" r="0.7" fill="#FFFFFF" />
              {/* Right Eye */}
              <ellipse cx="60" cy="43" rx="3.5" ry="4.5" fill={eyeColor} />
              <circle cx="61.2" cy="41.5" r="1.4" fill="#FFFFFF" />
              <circle cx="59" cy="44.5" r="0.7" fill="#FFFFFF" />
            </>
          )}

          {eyeStyle === 'normal' && (
            <>
              <ellipse cx="40" cy="43" rx="3" ry="3.8" fill={eyeColor} />
              <circle cx="41" cy="42" r="1.2" fill="#FFFFFF" />
              <ellipse cx="60" cy="43" rx="3" ry="3.8" fill={eyeColor} />
              <circle cx="61" cy="42" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {eyeStyle === 'happy' && (
            <>
              {/* Curved smiling anime eyes */}
              <path d="M 36 43 Q 40 39 44 43" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 56 43 Q 60 39 64 43" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {eyeStyle === 'cool' && (
            <>
              <path d="M 36 42 Q 40 40 44 42" stroke={eyeColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <ellipse cx="40" cy="44" rx="2.5" ry="2" fill={eyeColor} />
              <path d="M 56 42 Q 60 40 64 42" stroke={eyeColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <ellipse cx="60" cy="44" rx="2.5" ry="2" fill={eyeColor} />
            </>
          )}

          {eyeStyle === 'gentle' && (
            <>
              <ellipse cx="40" cy="43.5" rx="3" ry="3.2" fill={eyeColor} />
              <circle cx="40.8" cy="42.5" r="1" fill="#FFFFFF" />
              <ellipse cx="60" cy="43.5" rx="3" ry="3.2" fill={eyeColor} />
              <circle cx="60.8" cy="42.5" r="1" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Nose */}
        <path d="M 50 46 C 49 49, 50 51, 51 51" stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* Mouth / Expression */}
        <g>
          {expression === 'smile' && (
            <path d="M 45 55 Q 50 59 55 55" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}

          {expression === 'bigSmile' && (
            <>
              <path d="M 44 54 Q 50 62 56 54 Z" fill="#991B1B" />
              {/* Teeth */}
              <path d="M 45 54.5 Q 50 57 55 54.5" fill="#FFFFFF" />
            </>
          )}

          {expression === 'calm' && (
            <line x1="46" y1="56" x2="54" y2="56" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {expression === 'gentle' && (
            <path d="M 46 55 Q 50 58 54 55" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          )}

          {expression === 'joy' && (
            <path d="M 43 53 Q 50 63 57 53 Z" fill="#E11D48" />
          )}
        </g>

        {/* Hair - Front Layer */}
        <g filter="url(#shadow)">
          {hairStyle === 'short' && (
            <path
              d="M 28 38 C 26 24, 40 18, 50 18 C 62 18, 74 24, 72 38 C 66 30, 58 31, 50 31 C 42 31, 34 30, 28 38 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'spiky' && (
            <path
              d="M 27 38 L 30 24 L 38 27 L 44 16 L 50 25 L 56 16 L 62 27 L 70 24 L 73 38 C 66 31, 56 31, 50 31 C 44 31, 34 31, 27 38 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'curly' && (
            <>
              <path
                d="M 26 38 C 24 22, 38 18, 50 18 C 62 18, 76 22, 74 38 C 72 32, 60 30, 50 30 C 40 30, 28 32, 26 38 Z"
                fill={hairColor}
              />
              <circle cx="32" cy="24" r="5" fill={hairColor} />
              <circle cx="42" cy="20" r="5.5" fill={hairColor} />
              <circle cx="50" cy="19" r="6" fill={hairColor} />
              <circle cx="58" cy="20" r="5.5" fill={hairColor} />
              <circle cx="68" cy="24" r="5" fill={hairColor} />
            </>
          )}

          {hairStyle === 'bob' && (
            <path
              d="M 26 48 C 24 30, 36 19, 50 19 C 64 19, 76 30, 74 48 C 72 52, 68 33, 50 32 C 32 33, 28 52, 26 48 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'long' && (
            <path
              d="M 27 46 C 26 26, 38 19, 50 19 C 62 19, 74 26, 73 46 C 70 34, 62 31, 50 31 C 38 31, 30 34, 27 46 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'wavy' && (
            <path
              d="M 26 48 C 25 24, 38 18, 50 18 C 62 18, 75 24, 74 48 C 70 36, 62 30, 50 30 C 38 30, 30 36, 26 48 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'afro' && (
            <circle cx="50" cy="38" r="28" fill={hairColor} />
          )}

          {hairStyle === 'bald' && (
            /* Subtle hair line / sideburns only */
            <path d="M 27 42 C 27 38, 28 35, 29 35" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* Accessories */}
        <g filter="url(#shadow)">
          {accessory === 'glasses' && (
            <g stroke="#1F2937" strokeWidth="1.8" fill="rgba(255,255,255,0.25)">
              <rect x="34" y="38" width="13" height="10" rx="3" />
              <rect x="53" y="38" width="13" height="10" rx="3" />
              <line x1="47" y1="43" x2="53" y2="43" stroke="#1F2937" strokeWidth="1.8" />
              <line x1="28" y1="42" x2="34" y2="42" stroke="#1F2937" strokeWidth="1.5" />
              <line x1="66" y1="42" x2="72" y2="42" stroke="#1F2937" strokeWidth="1.5" />
            </g>
          )}

          {accessory === 'sunglasses' && (
            <g stroke="#000000" strokeWidth="1.5" fill="#111827">
              <path d="M 33 38 L 47 38 L 46 48 C 46 50, 34 50, 34 48 Z" />
              <path d="M 53 38 L 67 38 L 66 48 C 66 50, 54 50, 54 48 Z" />
              <line x1="47" y1="40" x2="53" y2="40" stroke="#000000" strokeWidth="2.5" />
              <line x1="28" y1="40" x2="33" y2="40" stroke="#000000" strokeWidth="2" />
              <line x1="67" y1="40" x2="72" y2="40" stroke="#000000" strokeWidth="2" />
              {/* Gloss reflection */}
              <line x1="36" y1="40" x2="44" y2="46" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
              <line x1="56" y1="40" x2="64" y2="46" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            </g>
          )}

          {accessory === 'headband' && (
            <path
              d="M 27 34 C 34 29, 66 29, 73 34"
              stroke="#EF4444"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {accessory === 'crossNecklace' && (
            <g>
              {/* Chain */}
              <path d="M 44 71 C 47 79, 53 79, 56 71" stroke="#F59E0B" strokeWidth="1" fill="none" />
              {/* Gold Cross Pendant */}
              <rect x="49" y="78" width="2" height="8" rx="0.5" fill="#FDE047" stroke="#D97706" strokeWidth="0.5" />
              <rect x="46.5" y="80.5" width="7" height="2" rx="0.5" fill="#FDE047" stroke="#D97706" strokeWidth="0.5" />
            </g>
          )}
        </g>
      </svg>
      </div>

      {/* Online indicator badge if requested */}
      {showBadge && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10"></span>
      )}

      {/* Donor Tier Badge Pill */}
      {showTierBadge && tierInfo && (
        <span
          className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-white rounded-full text-[10px] font-extrabold shadow-md border border-gray-100 flex items-center gap-0.5 z-10"
          title={`${tierInfo.name} (${tierInfo.badge})`}
        >
          <span>{tierInfo.badge}</span>
        </span>
      )}
    </div>
  );
};
