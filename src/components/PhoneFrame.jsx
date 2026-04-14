export default function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 390,
      height: 844,
      background: '#ede3d4',
      borderRadius: 48,
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 12px #3a3a3a',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Status bar notch */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 34,
        background: '#1a1a1a',
        borderRadius: '0 0 20px 20px',
        zIndex: 10,
      }} />

      {/* Screen content */}
      <div style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>
        {children}
      </div>
    </div>
  )
}
