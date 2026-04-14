import { useState } from 'react'

const ENVELOPES = [
  { id: 'white', src: '/evenlop white.png' },
  { id: 'brown', src: '/evenlop brown.png' },
  { id: 'red',   src: '/evenlop red.png'   },
]

const CARD_W = 201
const CARD_H = 180
const GAP    = 20
// side padding so item 0 starts centered in the 390px container
const PEEK   = (390 - CARD_W) / 2  // 94.5px

export default function EnvelopeScreen({ onBack, onNext }) {
  const [selectedIndex, setSelectedIndex] = useState(1) // brown default

  // Shift the whole track so selected item is always centered
  const trackOffset = -selectedIndex * (CARD_W + GAP)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '52px 24px 0',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="/back button.png" alt="back" style={{ width: 40, height: 46, objectFit: 'contain' }} />
        </button>
        <img src="/sealed title.png" alt="*sealed." style={{ height: 24, objectFit: 'contain' }} />
        <div style={{ width: 36 }} />
      </div>

      {/* Heading */}
      <div style={{
        textAlign: 'center',
        padding: '48px 32px 0',
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: "'Newsreader', serif",
          fontSize: 48,
          fontWeight: 400,
          color: '#31332F',
          lineHeight: 'normal',
          marginBottom: 16,
        }}>
          pick your<br />envelope
        </h1>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 16,
          fontWeight: 400,
          color: '#5E605B',
          lineHeight: 'normal',
        }}>
          wrap it something that feels right
        </p>
      </div>

      {/* Carousel */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: GAP,
          paddingLeft: PEEK,
          paddingRight: PEEK,
          transform: `translateY(-50%) translateX(${trackOffset}px)`,
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}>
          {ENVELOPES.map((env, i) => (
            <div
              key={env.id}
              style={{
                flexShrink: 0,
                width: CARD_W,
                height: CARD_H,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={env.src}
                alt={env.id}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  userSelect: 'none',
                  opacity: i === selectedIndex ? 1 : 0.5,
                  transition: 'opacity 0.38s ease',
                }}
              />
            </div>
          ))}
        </div>

        {/* Fixed selection frame — always centered */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: CARD_W,
          height: CARD_H,
          border: '2px solid #000',
          borderRadius: 10,
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Left tap zone — tapping the peeking left envelope */}
        {selectedIndex > 0 && (
          <div
            onClick={() => setSelectedIndex(i => i - 1)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: PEEK,
              height: '100%',
              cursor: 'pointer',
              zIndex: 3,
            }}
          />
        )}

        {/* Right tap zone — tapping the peeking right envelope */}
        {selectedIndex < ENVELOPES.length - 1 && (
          <div
            onClick={() => setSelectedIndex(i => i + 1)}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: PEEK,
              height: '100%',
              cursor: 'pointer',
              zIndex: 3,
            }}
          />
        )}
      </div>

      {/* Next button */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0 0 80px',
        flexShrink: 0,
      }}>
        <button
          onClick={() => onNext?.(ENVELOPES[selectedIndex].id)}
          style={{
            background: 'transparent',
            border: '1px solid #2a1f14',
            borderRadius: 30,
            padding: '12px 48px',
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: '0.1em',
            color: '#2a1f14',
            cursor: 'pointer',
          }}
        >
          next
        </button>
      </div>

    </div>
  )
}
