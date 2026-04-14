import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import LandingScreen from './screens/LandingScreen'
import ChoosingScreen from './screens/ChoosingScreen'
import EnvelopeScreen from './screens/EnvelopeScreen'
import EditorScreen from './screens/EditorScreen'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [direction, setDirection] = useState('forward')
  const [animKey, setAnimKey] = useState(0)

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
                onBack={() => navigate('envelope', 'back')}
                onDone={() => {/* wire done here */}}
              />,
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #d6c4a8 0%, #b8a48a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
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
  )
}
