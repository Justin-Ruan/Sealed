import { useState } from 'react'

export default function ChoosingScreen({ onBack, onNext }) {
  const [selected, setSelected] = useState(false)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/choosing.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 40px',
    }}>
      {/* Back button — transparent hit area over the ← icon in the image */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 48,
          left: 16,
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      />

      {/* "to a loved one" card — tap to toggle selected state */}
      <button
        onClick={() => setSelected(s => !s)}
        style={{
          position: 'absolute',
          top: 524,
          left: 38,
          width: 'calc(100% - 73px)',
          height: 80,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 12,
          padding: 0,
        }}
      />

      {/* Selection border overlay */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 509,
            left: 37,
            width: 'calc(100% - 71px)',
            height: 129,
            borderRadius: 12,
            border: '4px solid #DD9E59',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Next button */}
      <button
        onClick={() => onNext?.('loved-one')}
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 130,
          height: 42,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 30,
        }}
      />
    </div>
  )
}
