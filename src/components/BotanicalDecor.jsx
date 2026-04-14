export default function BotanicalDecor() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      viewBox="0 0 390 844"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top-left botanical — branch with leaves */}
      <g opacity="0.55" transform="translate(-10, 20)">
        <path d="M30 10 Q45 40 35 80 Q50 55 70 45" stroke="#8a9e6a" strokeWidth="1.5" fill="none" />
        <ellipse cx="70" cy="44" rx="14" ry="8" fill="#9aae7a" transform="rotate(-30, 70, 44)" />
        <ellipse cx="50" cy="56" rx="12" ry="7" fill="#8a9e6a" transform="rotate(15, 50, 56)" />
        <ellipse cx="38" cy="72" rx="10" ry="6" fill="#9aae7a" transform="rotate(-20, 38, 72)" />
        {/* Small flower */}
        <circle cx="32" cy="8" r="5" fill="#d4a8a0" opacity="0.7" />
        <circle cx="32" cy="8" r="2.5" fill="#e8c4a0" opacity="0.9" />
        <circle cx="26" cy="12" r="4" fill="#c4989090" opacity="0.6" />
        <circle cx="38" cy="12" r="4" fill="#d4a8a0" opacity="0.6" />
        <circle cx="32" cy="2" r="4" fill="#d4a8a0" opacity="0.6" />
      </g>

      {/* Top-right botanical — flowers */}
      <g opacity="0.5" transform="translate(310, -5)">
        <path d="M80 0 Q60 30 70 60" stroke="#8a9e6a" strokeWidth="1.5" fill="none" />
        <ellipse cx="55" cy="35" rx="13" ry="7" fill="#9aae7a" transform="rotate(25, 55, 35)" />
        <ellipse cx="72" cy="52" rx="11" ry="6" fill="#8a9e6a" transform="rotate(-10, 72, 52)" />
        {/* Flower top right */}
        <circle cx="78" cy="6" r="5" fill="#c4b0d0" opacity="0.65" />
        <circle cx="78" cy="6" r="2.5" fill="#d4c8a0" opacity="0.9" />
        <circle cx="72" cy="10" r="4" fill="#b4a0c0" opacity="0.55" />
        <circle cx="84" cy="10" r="4" fill="#c4b0d0" opacity="0.55" />
        <circle cx="78" cy="0" r="4" fill="#c4b0d0" opacity="0.55" />
        <circle cx="84" cy="2" r="3.5" fill="#c4b0d0" opacity="0.5" />
        {/* Butterfly */}
        <g transform="translate(40, 10) rotate(15)">
          <path d="M0 0 Q-12 -10 -8 2 Q-12 12 0 4" fill="#8a7a6a" opacity="0.5" />
          <path d="M0 0 Q12 -10 8 2 Q12 12 0 4" fill="#7a6a5a" opacity="0.45" />
          <line x1="0" y1="0" x2="0" y2="4" stroke="#5a4a3a" strokeWidth="0.8" />
        </g>
      </g>

      {/* Left side — scattered petals / small flowers */}
      <g opacity="0.4" transform="translate(8, 200)">
        <circle cx="12" cy="0" r="4.5" fill="#d4a8a0" />
        <circle cx="12" cy="0" r="2" fill="#e8c4a0" />
        <circle cx="6" cy="4" r="3.5" fill="#c49898" />
        <circle cx="18" cy="4" r="3.5" fill="#d4a8a0" />
        <circle cx="12" cy="-6" r="3.5" fill="#d4a8a0" />
        <circle cx="6" cy="-4" r="3" fill="#c49898" />
        <circle cx="18" cy="-4" r="3" fill="#d4a8a0" />
      </g>

      {/* Right side small leaves */}
      <g opacity="0.35" transform="translate(355, 240)">
        <path d="M0 30 Q15 15 30 0" stroke="#8a9e6a" strokeWidth="1.2" fill="none" />
        <ellipse cx="22" cy="8" rx="10" ry="6" fill="#9aae7a" transform="rotate(-45, 22, 8)" />
        <ellipse cx="10" cy="22" rx="9" ry="5" fill="#8a9e6a" transform="rotate(-30, 10, 22)" />
      </g>

      {/* Bottom-left botanical */}
      <g opacity="0.45" transform="translate(-5, 680)">
        <path d="M20 160 Q40 120 30 80 Q50 110 75 105" stroke="#8a9e6a" strokeWidth="1.5" fill="none" />
        <ellipse cx="76" cy="104" rx="13" ry="7" fill="#9aae7a" transform="rotate(10, 76, 104)" />
        <ellipse cx="55" cy="108" rx="11" ry="6" fill="#8a9e6a" transform="rotate(-15, 55, 108)" />
        <ellipse cx="36" cy="90" rx="10" ry="6" fill="#9aae7a" transform="rotate(20, 36, 90)" />
        {/* Small flower bottom left */}
        <circle cx="22" cy="158" r="5" fill="#d4a8a0" opacity="0.7" />
        <circle cx="22" cy="158" r="2.5" fill="#e8c4a0" opacity="0.9" />
        <circle cx="16" cy="162" r="4" fill="#c49898" opacity="0.6" />
        <circle cx="28" cy="162" r="4" fill="#d4a8a0" opacity="0.6" />
        <circle cx="22" cy="152" r="4" fill="#d4a8a0" opacity="0.6" />
      </g>

      {/* Bottom-right botanical */}
      <g opacity="0.4" transform="translate(330, 750)">
        <path d="M60 90 Q45 60 55 30 Q35 55 15 50" stroke="#8a9e6a" strokeWidth="1.5" fill="none" />
        <ellipse cx="14" cy="49" rx="12" ry="7" fill="#9aae7a" transform="rotate(-20, 14, 49)" />
        <ellipse cx="32" cy="42" rx="11" ry="6" fill="#8a9e6a" transform="rotate(10, 32, 42)" />
        {/* Butterfly bottom right */}
        <g transform="translate(50, 70) rotate(-20)">
          <path d="M0 0 Q-14 -8 -9 2 Q-13 10 0 4" fill="#8a7a6a" opacity="0.5" />
          <path d="M0 0 Q14 -8 9 2 Q13 10 0 4" fill="#7a6a5a" opacity="0.45" />
          <line x1="0" y1="0" x2="0" y2="4" stroke="#5a4a3a" strokeWidth="0.8" />
        </g>
        {/* Small flower */}
        <circle cx="62" cy="88" r="5" fill="#c4b0d0" opacity="0.65" />
        <circle cx="62" cy="88" r="2.5" fill="#d4c8a0" opacity="0.9" />
        <circle cx="56" cy="92" r="4" fill="#b4a0c0" opacity="0.55" />
        <circle cx="68" cy="92" r="4" fill="#c4b0d0" opacity="0.55" />
        <circle cx="62" cy="82" r="4" fill="#c4b0d0" opacity="0.55" />
      </g>

      {/* Scattered tiny dots / seeds */}
      {[
        [60, 130], [320, 160], [45, 400], [350, 380],
        [80, 620], [300, 640], [160, 760], [230, 780],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#a8906a" opacity="0.25" />
      ))}
    </svg>
  )
}
