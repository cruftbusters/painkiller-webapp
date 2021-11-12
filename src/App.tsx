import { useState } from 'react'
import BaseLayer from './component/BaseLayer'
import Heightmap from './component/Heightmap'
import MapControls from './component/MapControls'
import Sidebar from './component/Sidebar'
import useMapMetadata from './hook/useMapMetadata'
import {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './types/Epsg3857Coordinate'
import MapState from './types/MapState'

function App() {
  const [mapID, setMapID] = useState<string>()
  const mapMetadata = useMapMetadata(mapID)
  const [mapState, setMapState] = useState(
    new MapState({
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 5,
      left: (-130 / 180) * maxMercatorLongitude,
      top: (27.5 / 90) * maxMercatorLatitude,
    }),
  )
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BaseLayer mapState={mapState} />
      <Heightmap mapMetadata={mapMetadata} mapState={mapState} />
      <MapControls
        pan={(dx, dy) => setMapState((mapState) => mapState.pan(dx, dy))}
        zoom={(dz) => setMapState((mapState) => mapState.zoom(dz))}
      />
      <Sidebar
        mapState={mapState}
        onHeightmapIDChange={(id) => setMapID(id)}
      />
    </div>
  )
}

export default App
