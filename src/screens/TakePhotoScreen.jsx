import { useState } from 'react'
import { asset } from '../utils/asset'

export default function TakePhotoScreen({ onPhotoTaken }) {
  const [photoTaken, setPhotoTaken] = useState(false)

  const handleCircleTap = () => {
    if (!photoTaken) {
      setPhotoTaken(true)
    } else {
      onPhotoTaken?.()
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${asset(photoTaken ? '/take%20photo2.png' : '/take%20photo1.png')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      <button
        onClick={handleCircleTap}
        style={{
          position: 'absolute',
          bottom: '9%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      />
    </div>
  )
}
