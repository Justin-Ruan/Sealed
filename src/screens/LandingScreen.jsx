import { asset } from '../utils/asset'

export default function LandingScreen({ onBegin }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: `url(${asset('/landing.png')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }}>
      {/* Transparent tap target over the "begin" button in the image */}
      <button
        onClick={onBegin}
        style={{
          position: 'absolute',
          bottom: '19%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 30,
        }}
      />
    </div>
  )
}
