import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface FriendGroupSceneProps {
  morphState: MorphState;
}

export function FriendGroupScene({ morphState }: FriendGroupSceneProps) {
  const { phase, cameraDepth } = morphState;
  const smoothDepth = useSmoothValue(cameraDepth, 0.04);

  const isVisible = phase === 'scene-reveal' || phase === 'zoom-approach' || phase === 'zoom-diving';
  if (!isVisible) return null;

  const sceneOpacity = phase === 'scene-reveal' ? Math.min(smoothDepth * 4, 1) : 1;
  const parallaxY = smoothDepth * -30;
  const groupScale = 1 + smoothDepth * 0.15;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        opacity: sceneOpacity,
        willChange: 'opacity, transform',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxY}px) scale(${groupScale})`,
          transformOrigin: 'center 60%',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full"
          style={{ display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient light gradient */}
            <radialGradient id="ambientGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#d4a04a" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#d4a04a" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
            </radialGradient>

            {/* Overhead lamp glow */}
            <radialGradient id="lampGlow" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#d4a04a" stopOpacity="0.25" />
              <stop offset="30%" stopColor="#d4a04a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
            </radialGradient>

            {/* Phone screen glow */}
            <radialGradient id="phoneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4a04a" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#d4a04a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
            </radialGradient>

            {/* Face skin tones */}
            <linearGradient id="skin1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4a882" />
              <stop offset="100%" stopColor="#a08060" />
            </linearGradient>
            <linearGradient id="skin2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4b896" />
              <stop offset="100%" stopColor="#b09070" />
            </linearGradient>
            <linearGradient id="skin3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8ac86" />
              <stop offset="100%" stopColor="#a68a68" />
            </linearGradient>
            <linearGradient id="skin4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d0b48e" />
              <stop offset="100%" stopColor="#ae9272" />
            </linearGradient>

            {/* Hair */}
            <linearGradient id="hair1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
            <linearGradient id="hair2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a1a0a" />
              <stop offset="100%" stopColor="#1a0d05" />
            </linearGradient>

            {/* Clothing */}
            <linearGradient id="shirt1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a35" />
              <stop offset="100%" stopColor="#1a1a22" />
            </linearGradient>
            <linearGradient id="shirt2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1e28" />
              <stop offset="100%" stopColor="#12121a" />
            </linearGradient>
            <linearGradient id="shirt3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#252530" />
              <stop offset="100%" stopColor="#18181f" />
            </linearGradient>
            <linearGradient id="shirt4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c1c26" />
              <stop offset="100%" stopColor="#101018" />
            </linearGradient>

            {/* Suit jacket highlights */}
            <linearGradient id="jacket1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222230" />
              <stop offset="50%" stopColor="#1a1a25" />
              <stop offset="100%" stopColor="#141420" />
            </linearGradient>

            {/* Table felt */}
            <linearGradient id="felt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f4f28" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0a3518" stopOpacity="0.15" />
            </linearGradient>

            {/* Shadows */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
              <feOffset dx="0" dy="4" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="phoneShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="20" />
              <feOffset dx="0" dy="8" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="faceGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
            </filter>
          </defs>

          {/* Background - deep dark lounge */}
          <rect width="1200" height="800" fill="#0a0a0c" />

          {/* Ambient atmosphere */}
          <rect width="1200" height="800" fill="url(#ambientGlow)" />

          {/* Back wall panels */}
          <rect x="50" y="30" width="1100" height="400" rx="4" fill="none" stroke="#1a1a22" strokeWidth="0.5" opacity="0.3" />
          <rect x="80" y="50" width="1040" height="360" rx="2" fill="none" stroke="#151520" strokeWidth="0.3" opacity="0.2" />

          {/* Wall sconce lights */}
          <g opacity="0.4">
            <rect x="180" y="100" width="6" height="30" rx="3" fill="#d4a04a" opacity="0.3" />
            <circle cx="183" cy="95" r="15" fill="#d4a04a" opacity="0.06" />
            <rect x="1014" y="100" width="6" height="30" rx="3" fill="#d4a04a" opacity="0.3" />
            <circle cx="1017" cy="95" r="15" fill="#d4a04a" opacity="0.06" />
          </g>

          {/* Overhead billiard lamp */}
          <g>
            <rect x="400" y="25" width="400" height="3" rx="1.5" fill="#d4a04a" opacity="0.15" />
            <rect x="500" y="15" width="200" height="12" rx="6" fill="#1a1a1a" stroke="#d4a04a" strokeWidth="0.5" opacity="0.4" />
            <rect x="510" y="27" width="180" height="2" fill="#d4a04a" opacity="0.2" />
            <ellipse cx="600" cy="30" rx="250" ry="200" fill="url(#lampGlow)" />
          </g>

          {/* Pool table (bottom) */}
          <g>
            <rect x="200" y="620" width="800" height="160" rx="8" fill="url(#felt)" />
            <rect x="200" y="620" width="800" height="160" rx="8" fill="none" stroke="#d4a04a" strokeWidth="1" opacity="0.1" />
            {/* Rails */}
            <rect x="195" y="615" width="810" height="8" rx="4" fill="#1a1a12" stroke="#d4a04a" strokeWidth="0.5" opacity="0.2" />
            <rect x="195" y="775" width="810" height="8" rx="4" fill="#1a1a12" stroke="#d4a04a" strokeWidth="0.5" opacity="0.2" />
            {/* Diamonds on rail */}
            {[300, 400, 500, 600, 700, 800, 900].map((x) => (
              <circle key={x} cx={x} cy={619} r="2" fill="#d4a04a" opacity="0.15" />
            ))}
          </g>

          {/* Pool balls scattered on table */}
          <g>
            <circle cx="420" cy="680" r="10" fill="#d4a04a" opacity="0.5" />
            <circle cx="420" cy="680" r="10" fill="none" stroke="#f0c050" strokeWidth="0.5" opacity="0.3" />
            <circle cx="417" cy="677" r="3" fill="white" opacity="0.2" />

            <circle cx="520" cy="710" r="10" fill="#8b5cf6" opacity="0.4" />
            <circle cx="517" cy="707" r="3" fill="white" opacity="0.15" />

            <circle cx="650" cy="690" r="10" fill="#3b82f6" opacity="0.35" />
            <circle cx="647" cy="687" r="3" fill="white" opacity="0.15" />

            <circle cx="750" cy="720" r="10" fill="#f5f0e8" opacity="0.3" />
            <circle cx="747" cy="717" r="3" fill="white" opacity="0.1" />

            <circle cx="580" cy="660" r="10" fill="#ef4444" opacity="0.3" />
            <circle cx="577" cy="657" r="3" fill="white" opacity="0.12" />

            {/* Cue ball */}
            <circle cx="480" cy="740" r="11" fill="#f5f0e8" opacity="0.4" />
            <circle cx="477" cy="737" r="4" fill="white" opacity="0.2" />
          </g>

          {/* === FRIEND GROUP === */}
          {/* Four friends huddled, leaning toward center phone */}

          {/* Friend 1 - Left, leaning in */}
          <g filter="url(#softShadow)">
            {/* Body / jacket */}
            <path d="M280,520 Q300,420 340,400 Q370,390 380,400 Q400,420 420,520 Q400,580 350,600 Q300,580 280,520Z" fill="url(#jacket1)" />
            {/* Collar */}
            <path d="M325,400 Q340,395 355,400" fill="none" stroke="#2a2a35" strokeWidth="2" opacity="0.5" />
            {/* Neck */}
            <rect x="332" y="370" width="20" height="35" rx="10" fill="url(#skin1)" />
            {/* Head */}
            <ellipse cx="342" cy="345" rx="35" ry="42" fill="url(#skin1)" />
            {/* Hair */}
            <path d="M307,330 Q310,295 342,288 Q375,295 378,330 Q375,310 342,305 Q310,310 307,330Z" fill="url(#hair1)" />
            <path d="M307,335 Q305,320 310,310" fill="none" stroke="#1a1a1a" strokeWidth="3" opacity="0.4" />
            {/* Eyes - looking at phone (center-right) */}
            <ellipse cx="333" cy="348" rx="5" ry="3.5" fill="#1a1a0a" />
            <ellipse cx="352" cy="346" rx="5" ry="3.5" fill="#1a1a0a" />
            <circle cx="335" cy="347" r="1.5" fill="white" opacity="0.6" />
            <circle cx="354" cy="345" r="1.5" fill="white" opacity="0.6" />
            {/* Eyebrows */}
            <path d="M327,342 Q333,339 339,341" fill="none" stroke="#1a1a0a" strokeWidth="1.2" opacity="0.5" />
            <path d="M347,340 Q352,337 358,340" fill="none" stroke="#1a1a0a" strokeWidth="1.2" opacity="0.5" />
            {/* Nose */}
            <path d="M342,350 Q340,356 342,358 Q344,356 342,350" fill="none" stroke="#a08060" strokeWidth="0.8" opacity="0.4" />
            {/* Smile - laughing */}
            <path d="M332,364 Q342,372 352,364" fill="none" stroke="#8a6040" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M334,365 Q342,370 350,365" fill="#f5f0e8" opacity="0.3" />
            {/* Phone glow on face */}
            <ellipse cx="345" cy="360" rx="30" ry="20" fill="#d4a04a" opacity="0.04" />
          </g>

          {/* Friend 2 - Center-left, holding phone, leaning forward */}
          <g filter="url(#softShadow)">
            <path d="M420,510 Q440,400 480,380 Q510,370 520,380 Q540,400 560,510 Q540,575 490,595 Q440,575 420,510Z" fill="url(#shirt1)" />
            <path d="M465,380 Q480,375 495,380" fill="none" stroke="#2a2a35" strokeWidth="2" opacity="0.5" />
            <rect x="472" y="350" width="20" height="35" rx="10" fill="url(#skin2)" />
            <ellipse cx="482" cy="325" rx="36" ry="43" fill="url(#skin2)" />
            {/* Hair - slightly longer */}
            <path d="M446,310 Q450,270 482,262 Q515,270 518,310 Q515,288 482,282 Q450,288 446,310Z" fill="url(#hair1)" />
            <path d="M446,315 Q444,298 448,288" fill="none" stroke="#1a1a1a" strokeWidth="3" opacity="0.3" />
            <path d="M518,315 Q520,298 516,288" fill="none" stroke="#1a1a1a" strokeWidth="3" opacity="0.3" />
            {/* Eyes - looking DOWN at phone in hands */}
            <ellipse cx="472" cy="328" rx="5.5" ry="4" fill="#1a1a0a" />
            <ellipse cx="493" cy="327" rx="5.5" ry="4" fill="#1a1a0a" />
            <circle cx="474" cy="329" r="1.5" fill="white" opacity="0.6" />
            <circle cx="495" cy="328" r="1.5" fill="white" opacity="0.6" />
            {/* Eyebrows - raised with interest */}
            <path d="M465,322 Q472,318 479,321" fill="none" stroke="#1a1a0a" strokeWidth="1.2" opacity="0.5" />
            <path d="M487,320 Q493,316 500,320" fill="none" stroke="#1a1a0a" strokeWidth="1.2" opacity="0.5" />
            <path d="M482,330 Q480,336 482,338" fill="none" stroke="#b09070" strokeWidth="0.8" opacity="0.4" />
            {/* Big smile */}
            <path d="M470,344 Q482,354 494,344" fill="none" stroke="#8a6040" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
            <path d="M472,345 Q482,352 492,345" fill="#f5f0e8" opacity="0.35" />
            {/* Phone in hand */}
            <g>
              <rect x="462" y="480" width="44" height="75" rx="8" fill="#1a1a22" stroke="#d4a04a" strokeWidth="0.8" opacity="0.9" />
              <rect x="466" y="486" width="36" height="60" rx="4" fill="#0f0f18" />
              {/* Phone screen content - B.A.M. promo */}
              <rect x="468" y="488" width="32" height="56" rx="3" fill="linear-gradient(180deg, #1a1a2e, #0f0f1a)" />
              <text x="484" y="506" textAnchor="middle" fill="#d4a04a" fontSize="7" fontFamily="'Cinzel', serif" fontWeight="bold" opacity="0.9">B.A.M.</text>
              <line x1="474" y1="512" x2="494" y2="512" stroke="#d4a04a" strokeWidth="0.5" opacity="0.4" />
              <text x="484" y="522" textAnchor="middle" fill="#f5f0e8" fontSize="4" opacity="0.5">EXCLUSIVE</text>
              <text x="484" y="528" textAnchor="middle" fill="#f5f0e8" fontSize="4" opacity="0.5">PROMO</text>
              <rect x="476" y="534" width="16" height="6" rx="3" fill="#d4a04a" opacity="0.3" />
              <text x="484" y="539" textAnchor="middle" fill="#0a0a0c" fontSize="4" fontWeight="bold">FRIDAY</text>
              {/* Screen glow */}
              <ellipse cx="484" cy="518" rx="40" ry="30" fill="url(#phoneGlow)" />
            </g>
            {/* Hand holding phone */}
            <path d="M458,500 Q455,510 458,520 Q462,525 465,520 L465,500Z" fill="url(#skin2)" opacity="0.9" />
            <path d="M506,500 Q509,510 506,520 Q502,525 499,520 L499,500Z" fill="url(#skin2)" opacity="0.9" />
          </g>

          {/* Friend 3 - Center-right, leaning in from right */}
          <g filter="url(#softShadow)">
            <path d="M580,515 Q600,410 635,395 Q660,387 670,395 Q690,410 710,515 Q690,578 645,598 Q600,578 580,515Z" fill="url(#shirt2)" />
            <path d="M622,395 Q635,390 648,395" fill="none" stroke="#1e1e28" strokeWidth="2" opacity="0.5" />
            <rect x="629" y="365" width="20" height="35" rx="10" fill="url(#skin3)" />
            <ellipse cx="639" cy="340" rx="34" ry="41" fill="url(#skin3)" />
            {/* Hair - neat side part */}
            <path d="M605,325 Q608,288 639,280 Q670,288 673,325 Q670,305 639,298 Q608,305 605,325Z" fill="url(#hair2)" />
            <path d="M639,298 L639,318" stroke="#2a1a0a" strokeWidth="0.5" opacity="0.3" />
            {/* Eyes - looking at phone (left) */}
            <ellipse cx="629" cy="343" rx="5" ry="3.5" fill="#1a1a0a" />
            <ellipse cx="649" cy="342" rx="5" ry="3.5" fill="#1a1a0a" />
            <circle cx="627" cy="342" r="1.5" fill="white" opacity="0.6" />
            <circle cx="647" cy="341" r="1.5" fill="white" opacity="0.6" />
            <path d="M623,337 Q629,334 635,336" fill="none" stroke="#2a1a0a" strokeWidth="1.2" opacity="0.5" />
            <path d="M644,335 Q649,332 655,335" fill="none" stroke="#2a1a0a" strokeWidth="1.2" opacity="0.5" />
            <path d="M639,345 Q637,351 639,353" fill="none" stroke="#a68a68" strokeWidth="0.8" opacity="0.4" />
            {/* Laughing expression */}
            <path d="M628,360 Q639,369 650,360" fill="none" stroke="#8a6040" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M630,361 Q639,367 648,361" fill="#f5f0e8" opacity="0.3" />
            {/* Phone glow on face */}
            <ellipse cx="635" cy="355" rx="28" ry="18" fill="#d4a04a" opacity="0.04" />
          </g>

          {/* Friend 4 - Right, slightly behind, peeking in */}
          <g filter="url(#softShadow)">
            <path d="M740,530 Q760,430 790,415 Q815,407 825,415 Q845,430 865,530 Q845,590 800,610 Q760,590 740,530Z" fill="url(#shirt4)" />
            <path d="M778,415 Q790,410 802,415" fill="none" stroke="#1c1c26" strokeWidth="2" opacity="0.5" />
            <rect x="785" y="385" width="20" height="35" rx="10" fill="url(#skin4)" />
            <ellipse cx="795" cy="360" rx="33" ry="40" fill="url(#skin4)" />
            {/* Hair */}
            <path d="M762,345 Q765,310 795,302 Q825,310 828,345 Q825,325 795,318 Q765,325 762,345Z" fill="url(#hair1)" />
            {/* Eyes - looking at phone */}
            <ellipse cx="786" cy="363" rx="4.5" ry="3.5" fill="#1a1a0a" />
            <ellipse cx="804" cy="362" rx="4.5" ry="3.5" fill="#1a1a0a" />
            <circle cx="784" cy="362" r="1.3" fill="white" opacity="0.5" />
            <circle cx="802" cy="361" r="1.3" fill="white" opacity="0.5" />
            <path d="M780,357 Q786,354 792,356" fill="none" stroke="#1a1a0a" strokeWidth="1" opacity="0.5" />
            <path d="M799,356 Q804,353 810,356" fill="none" stroke="#1a1a0a" strokeWidth="1" opacity="0.5" />
            <path d="M795,365 Q793,370 795,372" fill="none" stroke="#ae9272" strokeWidth="0.8" opacity="0.4" />
            {/* Smile */}
            <path d="M785,378 Q795,386 805,378" fill="none" stroke="#8a6040" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            {/* Phone glow */}
            <ellipse cx="790" cy="373" rx="25" ry="16" fill="#d4a04a" opacity="0.03" />
          </g>

          {/* Central phone screen glow on group */}
          <ellipse cx="484" cy="460" rx="120" ry="80" fill="url(#phoneGlow)" opacity="0.15" />

          {/* Ambient rim light on shoulders */}
          <line x1="280" y1="520" x2="350" y2="420" stroke="#d4a04a" strokeWidth="0.5" opacity="0.08" />
          <line x1="865" y1="530" x2="800" y2="430" stroke="#d4a04a" strokeWidth="0.5" opacity="0.06" />

          {/* Bottom vignette */}
          <rect y="700" width="1200" height="100" fill="url(#felt)" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
