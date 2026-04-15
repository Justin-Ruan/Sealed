import { useState, useEffect } from 'react'
import PhoneFrame from './components/PhoneFrame'
import LandingScreen from './screens/LandingScreen'
import ChoosingScreen from './screens/ChoosingScreen'
import EnvelopeScreen from './screens/EnvelopeScreen'
import EditorScreen, { INITIAL_DECOS } from './screens/EditorScreen'
import TakePhotoScreen from './screens/TakePhotoScreen'
import SendingScreen from './screens/SendingScreen'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [direction, setDirection] = useState('forward')
  const [animKey, setAnimKey] = useState(0)
  const [showDecos, setShowDecos] = useState(false)
  const [paperTapped, setPaperTapped]     = useState(false)
  const [selectedFrame, setSelectedFrame] = useState(null)
  const [decos, setDecos]                 = useState([])
  const [scale, setScale]                 = useState(1)

  useEffect(() => {
    const update = () => setScale(Math.min(
      window.innerHeight / 844,
      window.innerWidth  / 390,
    ))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const navigate = (newScreen, dir = 'forward') => {
    setDirection(dir)
    setScreen(newScreen)
    setAnimKey(k => k + 1)
  }

  const screens = {
    landing:  <LandingScreen onBegin={() => navigate('choosing', 'forward')} />,
    choosing: <ChoosingScreen
                onBack={() => navigate('landing', 'back')}
                onNext={() => navigate('envelope', 'forward')}
              />,
    envelope: <EnvelopeScreen
                onBack={() => navigate('choosing', 'back')}
                onNext={() => navigate('editor', 'forward')}
              />,
    editor:   <EditorScreen
                onBack={() => { setShowDecos(false); navigate('envelope', 'back') }}
                onDone={() => navigate('sending', 'forward')}
                onInserts={() => navigate('takePhoto', 'forward')}
                showDecos={showDecos}
                paperTapped={paperTapped} setPaperTapped={setPaperTapped}
                selectedFrame={selectedFrame} setSelectedFrame={setSelectedFrame}
                decos={decos} setDecos={setDecos}
              />,
    sending:   <SendingScreen
                onBack={() => navigate('editor', 'back')}
                decos={decos}
                selectedFrame={selectedFrame}
              />,
    takePhoto: <TakePhotoScreen
                onPhotoTaken={() => {
                  setDecos(INITIAL_DECOS.map((d, i) => ({
                    src: d.src, x: d.initX, y: d.initY,
                    width: d.width, height: d.height,
                    rotate: d.rotate, zIndex: i + 1,
                  })))
                  setShowDecos(true)
                  navigate('editor', 'back')
                }}
              />,
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at center, #d6c4a8 0%, #b8a48a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0,
      }}>
      <PhoneFrame>
        <div
          key={animKey}
          style={{
            width: '100%',
            height: '100%',
            animation: `${direction === 'forward' ? 'slideInFromRight' : 'slideInFromLeft'} 0.32s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {screens[screen]}
        </div>
      </PhoneFrame>
      </div>
    </div>
  )
}
