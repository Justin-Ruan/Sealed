import { useState } from 'react'

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

export default function EditorScreen({ onBack, onDone }) {
  const [activeTool, setActiveTool]   = useState(null)
  const [canvasPaper, setCanvasPaper] = useState(null)
  const [selectedPaper, setSelectedPaper] = useState('red')

  const handleToolSelect = (toolId) => {
    if (activeTool === toolId) {
      setActiveTool(null)
      return
    }
    setActiveTool(toolId)
    if (toolId === 'paper' && canvasPaper === null) {
      setCanvasPaper('red')
    }
  }

  const handlePaperSelect = (paperId) => {
    setSelectedPaper(paperId)
    setCanvasPaper(paperId)
  }

  const currentPaperSrc = PAPER_OPTIONS.find(p => p.id === canvasPaper)?.src

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/background.png)',
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
          <img src="/back button.png" alt="back" style={{ width: 40, height: 46, objectFit: 'contain' }} />
        </button>

        <img src="/sealed title.png" alt="*sealed." style={{ height: 24, objectFit: 'contain' }} />

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
      }}>
        <div style={{
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
        }}>
          {currentPaperSrc ? (
            <img
              src={currentPaperSrc}
              alt="paper"
              style={{ width: 260, height: 340, objectFit: 'contain' }}
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

      {/* Paper options tray — floats above the toolbar */}
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
          {PAPER_OPTIONS.map(paper => (
            <div
              key={paper.id}
              onClick={() => handlePaperSelect(paper.id)}
              style={{
                flexShrink: 0,
                borderRadius: 10,
                border: selectedPaper === paper.id
                  ? '2.5px solid #C8334A'
                  : '2.5px solid transparent',
                cursor: 'pointer',
                overflow: 'hidden',
                width: 84,
                height: 108,
              }}
            >
              <img
                src={paper.src}
                alt={paper.id}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
                src={tool.icon}
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
