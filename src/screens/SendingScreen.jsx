import { useState, useRef, useEffect } from 'react'
import { asset } from '../utils/asset'

const CANVAS_W = 379.535
const CANVAS_H = 506.038

export default function SendingScreen({ onBack, decos = [], selectedFrame }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')

  const [flying, setFlying]         = useState(false)
  const [flapClosed, setFlapClosed] = useState(false)
  const [done, setDone]             = useState(false)
  const [targets, setTargets]       = useState(null)

  const containerRef   = useRef(null)
  const envelopeRef    = useRef(null)
  const mainContentRef = useRef(null)

  const [envelopeLift, setEnvelopeLift] = useState(0)

  // When items are removed, measure the gap and float the envelope up to center
  useEffect(() => {
    if (!done) return
    const eRect = envelopeRef.current?.getBoundingClientRect()
    const mRect = mainContentRef.current?.getBoundingClientRect()
    if (!eRect || !mRect) return
    const dy = (mRect.top + mRect.height / 3) - (eRect.top + eRect.height / 2)
    setEnvelopeLift(dy)
  }, [done])

  const handleSend = () => {
    if (flying) return

    const cRect = containerRef.current?.getBoundingClientRect()
    const eRect = envelopeRef.current?.getBoundingClientRect()

    if (cRect && eRect) {
      const tx = eRect.left + eRect.width / 2 - cRect.left
      const ty = eRect.top + eRect.height / 2 - cRect.top

      setTargets({
        decos: decos.map(d => ({
          dx: tx - (d.x + d.width  / 2),
          dy: ty - (d.y + d.height / 2),
        })),
        paper: { dx: tx - CANVAS_W / 2, dy: ty - CANVAS_H / 2 },
        photo: { dx: tx - (176 + 42),   dy: ty - (271 + 38)   },
      })
    }

    setFlying(true)
    setTimeout(() => setFlapClosed(true), 950)
    setTimeout(() => setDone(true), 1400)
  }

  // opacity delays 0.6s so items fade AFTER arriving at the envelope
  const flyStyle = (transform) => ({
    transition: flying
      ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.6s'
      : 'none',
    transform,
    opacity: flying ? 0 : 1,
  })

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${asset('/background.png')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
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
          <img src={asset('/back button.png')} alt="back" style={{ width: 40, height: 46, objectFit: 'contain' }} />
        </button>
        <img src={asset('/sealed title.png')} alt="*sealed." style={{ height: 24, objectFit: 'contain' }} />
        <div style={{ width: 36 }} />
      </div>

      {/* Main content — letter items are absolute so they don't affect layout height.
          Only the envelope is a flex item, so it centers without causing scroll. */}
      <div
        ref={mainContentRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 24,
          position: 'relative',
          isolation: 'isolate',
          overflow: 'visible',
        }}
      >

        {/* Letter instances — absolutely positioned, out of flex flow */}
        {!done && (
          <div
            ref={containerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: CANVAS_W,
              height: CANVAS_H,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {/* Decos — z-index 2: above body, below cover */}
            {decos.map((deco, i) => {
              const t = targets?.decos[i]
              return (
                <img
                  key={i}
                  src={asset(`/${deco.src}`)}
                  alt=""
                  draggable={false}
                  style={{
                    position: 'absolute',
                    left: deco.x,
                    top: deco.y,
                    width: deco.width,
                    height: deco.height,
                    objectFit: 'contain',
                    userSelect: 'none',
                    zIndex: 2,
                    ...flyStyle(
                      flying && t
                        ? `translate(${t.dx}px, ${t.dy}px) scale(0.12)`
                        : `rotate(${deco.rotate})`
                    ),
                  }}
                />
              )
            })}

            {/* Inserted photo — z-index 2 */}
            {selectedFrame === 'frame3' && (
              <img
                src={asset('/inserted photo.png')}
                alt="inserted photo"
                style={{
                  position: 'absolute',
                  top: 271,
                  left: 176,
                  width: 84,
                  height: 76,
                  objectFit: 'cover',
                  zIndex: 2,
                  ...flyStyle(
                    flying && targets?.photo
                      ? `translate(${targets.photo.dx}px, ${targets.photo.dy}px) scale(0.12)`
                      : 'none'
                  ),
                }}
              />
            )}

            {/* Paper — z-index 2 */}
            <img
              src={asset('/paper with text.png')}
              alt="paper"
              style={{
                position: 'absolute',
                top: CANVAS_H / 2 - 153,
                left: CANVAS_W / 2 - 117,
                width: 234,
                height: 306,
                objectFit: 'contain',
                zIndex: 2,
                ...flyStyle(
                  flying && targets?.paper
                    ? `translate(${targets.paper.dx}px, ${targets.paper.dy}px) scale(0.08)`
                    : 'none'
                ),
              }}
            />
          </div>
        )}

        {/* Envelope — floats up to center after animation */}
        <div
          ref={envelopeRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
            position: 'relative',
            transform: envelopeLift ? `translateY(${envelopeLift}px)` : 'none',
            transition: envelopeLift ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {/* Flap — z-index 1 initially (behind paper), rises to 4 when closing
               since items are already transparent by the time the flap closes */}
          <div style={{
            transformOrigin: '50% 100%',
            transform: flapClosed ? 'perspective(600px) rotateX(180deg)' : 'none',
            transition: 'transform 0.55s ease-in-out',
            position: 'relative',
            zIndex: flapClosed ? 4 : 1,
          }}>
            <img src={asset('/evenlop head.png')} alt="envelope head" style={{ width: 220, display: 'block' }} />
          </div>

          {/* Body (z-index 1) + Cover (z-index 3) */}
          <div style={{ position: 'relative', width: 220 }}>
            <img
              src={asset('/evenlop body.png')}
              alt="envelope body"
              style={{ position: 'relative', zIndex: 1, width: 220, display: 'block' }}
            />
            <img
              src={asset('/envelop cover.png')}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 220,
                display: 'block',
                zIndex: 3,
              }}
            />
          </div>
        </div>

      </div>

      {/* Bottom form card */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px 16px 0 0',
        padding: '24px 16px 40px',
        width: '80%',
        alignSelf: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <span style={{
            fontSize: 13,
            color: '#888',
            marginRight: 16,
            paddingBottom: 6,
            whiteSpace: 'nowrap',
            fontFamily: "'Manrope', sans-serif",
          }}>To:</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: '#333',
              background: 'transparent',
              paddingBottom: 6,
              borderBottom: '1px dashed #bbb',
              fontFamily: "'Manrope', sans-serif",
            }}
          />
        </div>

        <div style={{ paddingLeft: 42 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: '#333',
              background: 'transparent',
              paddingTop: 10,
              paddingBottom: 6,
              borderBottom: '1px dashed #bbb',
              boxSizing: 'border-box',
              fontFamily: "'Manrope', sans-serif",
            }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={flying}
          style={{
            marginTop: 20,
            width: '100%',
            padding: '13px',
            background: flying ? '#aaa' : '#31332F',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            cursor: flying ? 'default' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {flapClosed ? 'Sent!' : 'Send'}
        </button>
      </div>

    </div>
  )
}
