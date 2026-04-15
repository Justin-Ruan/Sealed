import { useState, useEffect, useRef } from 'react'
import { asset } from '../utils/asset'

const TOOLS = [
  { id: 'paper',   label: 'Paper',   icon: '/paper.svg'   },
  { id: 'photos',  label: 'Photos',  icon: '/photos.svg'  },
  { id: 'voice',   label: 'Voice',   icon: '/voice.svg'   },
  { id: 'inserts', label: 'Inserts', icon: '/inserts.svg' },
  { id: 'music',   label: 'Music',   icon: '/music.svg'   },
]

const PAPER_OPTIONS = [
  { id: 'red',  src: '/paper selected.png' },
  { id: 'blue', src: '/paper blue.png'     },
  { id: 'grid', src: '/paper grid.png'     },
]

const FRAME_OPTIONS = [
  { id: 'frame1', src: '/frame design 1.png', selectable: false },
  { id: 'frame2', src: '/frame design 2.png', selectable: false },
  { id: 'frame3', src: '/frame design 3.png', selectable: true  },
  { id: 'frame4', src: '/frame design 4.png', selectable: false },
]

export const INITIAL_DECOS = [
  { src: 'deco blue flower.png',  width: 92,  height: 92,  initX: -18, initY: -32, rotate: '-10deg' },
  { src: 'deco ticket.png',       width: 185, height: 80,  initX: 195, initY: 10,  rotate: '6deg'   },
  { src: 'deco photo booth.png',  width: 108, height: 272, initX: -55, initY: 38,  rotate: '-4deg'  },
  { src: 'deco heart.png',        width: 60,  height: 66,  initX: 268, initY: 222, rotate: '18deg'  },
  { src: 'deco favorite.png',     width: 160, height: 98,  initX: 52,  initY: 328, rotate: '-14deg' },
  { src: 'deco pinck flower.png', width: 92,  height: 118, initX: -8,  initY: 388, rotate: '8deg'   },
  { src: 'deco text.png',         width: 130, height: 140, initX: 165, initY: 358, rotate: '-4deg'  },
]

export default function EditorScreen({
  onBack, onDone, onInserts, showDecos,
  paperTapped, setPaperTapped,
  selectedFrame, setSelectedFrame,
  decos, setDecos,
}) {
  const [activeTool, setActiveTool]       = useState(null)
  const [canvasPaper, setCanvasPaper]     = useState(null)
  const [selectedPaper, setSelectedPaper] = useState('red')

  const canvasRef  = useRef(null)
  const dragging   = useRef(null)
  const maxZ       = useRef(INITIAL_DECOS.length + 1)

  useEffect(() => {
    if (showDecos) setCanvasPaper('red')
  }, [showDecos])

  const handleToolSelect = (toolId) => {
    if (toolId === 'inserts') {
      onInserts?.()
      return
    }
    if (activeTool === toolId) {
      setActiveTool(null)
      return
    }
    setActiveTool(toolId)
    if (toolId === 'paper' && canvasPaper === null) {
      setCanvasPaper('red')
    }
    if (toolId === 'photos') {
      setSelectedFrame(null)
    }
  }

  const handlePaperSelect = (paperId) => {
    setSelectedPaper(paperId)
    setCanvasPaper(paperId)
    setPaperTapped(false)
  }

  const handleVoiceCheck = () => {
    setActiveTool(null)
    maxZ.current += 1
    setDecos(prev => [...prev, {
      src: 'deco tap.png',
      x: 125,
      y: 170,
      width: 95,
      height: 130,
      rotate: '-5deg',
      zIndex: maxZ.current,
    }])
  }

  const handleDecoPointerDown = (e, index) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    const canvasRect = canvasRef.current.getBoundingClientRect()
    maxZ.current += 1
    dragging.current = {
      index,
      offsetX: e.clientX - canvasRect.left - decos[index].x,
      offsetY: e.clientY - canvasRect.top  - decos[index].y,
    }
    setDecos(prev => prev.map((d, i) =>
      i === index ? { ...d, zIndex: maxZ.current } : d
    ))
  }

  const handleDecoPointerMove = (e, index) => {
    if (!dragging.current || dragging.current.index !== index) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - canvasRect.left - dragging.current.offsetX
    const y = e.clientY - canvasRect.top  - dragging.current.offsetY
    setDecos(prev => prev.map((d, i) =>
      i === index ? { ...d, x, y } : d
    ))
  }

  const handleDecoPointerUp = () => {
    dragging.current = null
  }

  const currentPaperSrc = PAPER_OPTIONS.find(p => p.id === canvasPaper)?.src

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
        padding: '52px 20px 0',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={asset('/back button.png')} alt="back" style={{ width: 40, height: 46, objectFit: 'contain' }} />
        </button>

        <img src={asset('/sealed title.png')} alt="*sealed." style={{ height: 24, objectFit: 'contain' }} />

        <button
          onClick={onDone}
          style={{
            background: 'transparent',
            border: '1px solid #31332F',
            borderRadius: 20,
            padding: '6px 18px',
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: '#31332F',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          done
        </button>
      </div>

      {/* Canvas */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}>
        <div
          ref={canvasRef}
          style={{
            width: 379.535,
            height: 506.038,
            borderRadius: 11.525,
            border: '0.807px solid rgba(0, 0, 0, 0.05)',
            background: '#FFFEFA',
            boxShadow: '0 1.152px 3.457px 0 rgba(0,0,0,0.10), 0 1.152px 2.305px -1.152px rgba(0,0,0,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Draggable deco elements */}
          {decos.map((deco, i) => (
            <img
              key={i}
              src={asset(`/${deco.src}`)}
              alt=""
              draggable={false}
              onPointerDown={(e) => handleDecoPointerDown(e, i)}
              onPointerMove={(e) => handleDecoPointerMove(e, i)}
              onPointerUp={handleDecoPointerUp}
              style={{
                position: 'absolute',
                left: deco.x,
                top: deco.y,
                width: deco.width,
                height: deco.height,
                transform: `rotate(${deco.rotate})`,
                objectFit: 'contain',
                cursor: 'grab',
                userSelect: 'none',
                touchAction: 'none',
                zIndex: deco.zIndex,
              }}
            />
          ))}

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
                pointerEvents: 'none',
              }}
            />
          )}

          {currentPaperSrc ? (
            <img
              src={paperTapped ? asset('/paper with text.png') : asset(currentPaperSrc)}
              alt="paper"
              onClick={() => setPaperTapped(true)}
              style={{ width: 260, height: 340, objectFit: 'contain', cursor: 'pointer' }}
            />
          ) : (
            <p style={{
              color: 'rgba(113, 113, 130, 0.70)',
              textAlign: 'center',
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              maxWidth: 200,
            }}>
              What do you want them to see first?
            </p>
          )}
        </div>
      </div>

      {/* Voice recorder bottom sheet */}
      {activeTool === 'voice' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src={asset('/voice%20reocrder.png')}
              alt="voice recorder"
              style={{ width: '100%', display: 'block' }}
            />
            {/* Check button overlay */}
            <button
              onClick={handleVoiceCheck}
              style={{
                position: 'absolute',
                bottom: '6%',
                left: '72%',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          </div>
        </div>
      )}

      {/* Paper options tray */}
      {activeTool === 'paper' && (
        <div style={{
          position: 'absolute',
          bottom: 151,
          left: 0,
          right: 0,
          display: 'flex',
          gap: 10,
          padding: '10px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {PAPER_OPTIONS.map(paper => {
            const isSelected = selectedPaper === paper.id
            return (
              <div
                key={paper.id}
                onClick={isSelected ? () => handlePaperSelect(paper.id) : undefined}
                style={{
                  flexShrink: 0,
                  borderRadius: 10,
                  border: isSelected ? '2px solid #000000' : '2px solid transparent',
                  cursor: isSelected ? 'pointer' : 'default',
                  overflow: 'hidden',
                  width: 88,
                  height: 116,
                  padding: 4,
                  boxSizing: 'border-box',
                  opacity: isSelected ? 1 : 0.35,
                  pointerEvents: isSelected ? 'auto' : 'none',
                }}
              >
                <img
                  src={asset(paper.src)}
                  alt={paper.id}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Frame options tray */}
      {activeTool === 'photos' && (
        <div style={{
          position: 'absolute',
          bottom: 151,
          left: 0,
          right: 0,
          display: 'flex',
          gap: 10,
          padding: '10px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {FRAME_OPTIONS.map(frame => (
            <div
              key={frame.id}
              onClick={frame.selectable ? () => setSelectedFrame(frame.id) : undefined}
              style={{
                flexShrink: 0,
                borderRadius: 10,
                border: selectedFrame === frame.id ? '2px solid #000000' : '2px solid transparent',
                cursor: frame.selectable ? 'pointer' : 'default',
                overflow: 'hidden',
                width: 88,
                height: 116,
                padding: 4,
                boxSizing: 'border-box',
                pointerEvents: frame.selectable ? 'auto' : 'none',
                position: 'relative',
              }}
            >
              <img
                src={asset(frame.src)}
                alt={frame.id}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom toolbar */}
      <div style={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '12px 8px 32px',
        flexShrink: 0,
      }}>
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 79,
              height: 107,
              borderRadius: activeTool === tool.id ? 15 : 0,
              background: activeTool === tool.id ? '#ffffff' : 'transparent',
              cursor: 'pointer',
              gap: 6,
              transition: 'background 0.18s ease',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(51, 49, 47, 0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={asset(tool.icon)}
                alt={tool.label}
                style={{ width: 24, height: 24 }}
              />
            </div>
            <span style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: '#31332F',
              letterSpacing: '0.01em',
            }}>
              {tool.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
