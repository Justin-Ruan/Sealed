export default function EnvelopeIllustration() {
  return (
    <svg
      viewBox="0 0 220 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      {/* Letter 1 (back, rotated left) */}
      <g transform="rotate(-18, 110, 80)">
        <rect x="72" y="14" width="76" height="98" rx="3" fill="#f5f0e8" stroke="#d4c9b0" strokeWidth="0.8" />
        <line x1="82" y1="34" x2="138" y2="34" stroke="#c9bda4" strokeWidth="1.2" />
        <line x1="82" y1="44" x2="138" y2="44" stroke="#c9bda4" strokeWidth="1.2" />
        <line x1="82" y1="54" x2="124" y2="54" stroke="#c9bda4" strokeWidth="1.2" />
        <line x1="82" y1="64" x2="138" y2="64" stroke="#c9bda4" strokeWidth="1.2" />
        <line x1="82" y1="74" x2="130" y2="74" stroke="#c9bda4" strokeWidth="1.2" />
        {/* Small stamp area */}
        <rect x="122" y="20" width="20" height="16" rx="2" fill="#d4c4a8" stroke="#b8a88a" strokeWidth="0.8" />
        <rect x="124" y="22" width="16" height="12" rx="1" fill="#c4b494" />
      </g>

      {/* Letter 2 (middle, slight right tilt) */}
      <g transform="rotate(10, 110, 80)">
        <rect x="78" y="10" width="72" height="94" rx="3" fill="#faf6ee" stroke="#d4c9b0" strokeWidth="0.8" />
        <line x1="88" y1="28" x2="140" y2="28" stroke="#d4c9b0" strokeWidth="1" />
        <line x1="88" y1="38" x2="140" y2="38" stroke="#d4c9b0" strokeWidth="1" />
        <line x1="88" y1="48" x2="128" y2="48" stroke="#d4c9b0" strokeWidth="1" />
        <line x1="88" y1="58" x2="140" y2="58" stroke="#d4c9b0" strokeWidth="1" />
        {/* Wax seal dot */}
        <circle cx="105" cy="80" r="7" fill="#c96b4a" opacity="0.7" />
        <circle cx="105" cy="80" r="4" fill="#b55a3a" opacity="0.6" />
      </g>

      {/* Postcard (front left, slight angle) */}
      <g transform="rotate(-6, 90, 75)">
        <rect x="52" y="18" width="78" height="56" rx="3" fill="#e8e0d0" stroke="#c8bda8" strokeWidth="0.8" />
        {/* Postcard image area */}
        <rect x="56" y="22" width="36" height="28" rx="2" fill="#b8cca8" opacity="0.7" />
        {/* Simple landscape in postcard */}
        <ellipse cx="74" cy="44" rx="14" ry="8" fill="#8aaa78" opacity="0.8" />
        <circle cx="68" cy="38" r="6" fill="#96b480" opacity="0.7" />
        {/* Postcard lines */}
        <line x1="98" y1="28" x2="124" y2="28" stroke="#c8bda8" strokeWidth="1" />
        <line x1="98" y1="36" x2="124" y2="36" stroke="#c8bda8" strokeWidth="1" />
        <line x1="98" y1="44" x2="116" y2="44" stroke="#c8bda8" strokeWidth="1" />
        <rect x="118" y="24" width="10" height="8" rx="1" fill="#c4a870" opacity="0.7" />
      </g>

      {/* Envelope body */}
      <rect x="18" y="88" width="184" height="110" rx="6" fill="#c49a6c" />

      {/* Envelope inner shadow */}
      <rect x="18" y="88" width="184" height="20" rx="0" fill="#b8864e" opacity="0.3" />

      {/* Envelope bottom fold lines */}
      <path d="M18 198 L110 148 L202 198" fill="#b8864e" opacity="0.35" />

      {/* Envelope side folds */}
      <path d="M18 88 L110 148 L18 198" fill="#a87840" opacity="0.2" />
      <path d="M202 88 L110 148 L202 198" fill="#a87840" opacity="0.2" />

      {/* Envelope top flap (open, folded back) */}
      <path d="M18 88 Q110 60 202 88 L110 138 Z" fill="#b8864e" />
      <path d="M18 88 Q110 60 202 88 L110 138 Z" fill="url(#flapGrad)" />

      {/* Wax seal on envelope */}
      <circle cx="110" cy="150" r="12" fill="#c96b4a" opacity="0.85" />
      <circle cx="110" cy="150" r="8" fill="#b55a3a" opacity="0.8" />
      <text x="110" y="154" textAnchor="middle" fill="#f5ede3" fontSize="8" fontFamily="serif" fontStyle="italic">S</text>

      <defs>
        <linearGradient id="flapGrad" x1="110" y1="60" x2="110" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a87840" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a87840" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
