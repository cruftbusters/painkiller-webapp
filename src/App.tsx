import { useState } from 'react'
import BaseLayer from './component/BaseLayer'
import MapControls from './component/MapControls'
import MapState from './types/MapState'

function App() {
  const [mapState, setMapState] = useState(
    new MapState({
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 5,
      left: -130,
      top: 27.5,
    }),
  )
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseLayer mapState={mapState} />
      <MapControls
        pan={(dx, dy) => setMapState((mapState) => mapState.pan(dx, dy))}
      />
    </div>
  )
}

export default App
