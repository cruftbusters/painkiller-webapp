import { MutableRefObject, useEffect, useRef, useState } from 'react'
import BaseLayer from './component/BaseLayer'
import SpatialOverlay from './component/SpatialOverlay'
import HorizontalDrag from './component/HorizontalDrag'
import MapControls from './component/MapControls'
import Sidebar from './component/Sidebar'
import usePollLayerURLs from './hook/usePollLayerURLs'
import {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './types/Epsg3857Coordinate'
import MapState from './types/MapState'
import Layout from './types/Layout'

function App() {
  const [layout, setLayout] = useState<Layout>()
  const [overlayOpacity, setOverlayOpacity] = useState('1.0')
  usePollLayerURLs(layout, setLayout)

  const mapContainerRef = useRef() as MutableRefObject<HTMLDivElement>
  const [mapState, setMapState] = useState(
    new MapState({
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 5,
      left: (-130 / 180) * maxMercatorLongitude,
      top: (27.5 / 90) * maxMercatorLatitude,
    }),
  )
  const [dividerOffset, setDividerOffset] = useState(0)
  useEffect(() => {
    const { clientWidth, clientHeight } = mapContainerRef.current
    setMapState(
      (mapState) =>
        new MapState({
          ...mapState,
          width: clientWidth,
          height: clientHeight,
        }),
    )
  }, [mapContainerRef, dividerOffset])
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <div style={{ flex: `0 0 calc(20% + ${dividerOffset}px)` }}>
        <Sidebar
          layout={layout}
          mapState={mapState}
          onCreateMap={setLayout}
          overlayOpacity={overlayOpacity}
          setOverlayOpacity={setOverlayOpacity}
        />
      </div>
      <div
        style={{
          flex: '0 0 2px',
          backgroundColor: 'steelblue',
        }}
      >
        <HorizontalDrag
          onDrag={(dx, _) => setDividerOffset((v) => v + dx)}
        />
      </div>
      <div
        ref={mapContainerRef}
        style={{ flex: '1 1 auto', position: 'relative' }}
      >
        <BaseLayer mapState={mapState} />
        <SpatialOverlay
          layout={layout}
          url={layout?.hillshadeURL || layout?.heightmapURL}
          mapState={mapState}
          overlayOpacity={overlayOpacity}
        />
        <MapControls
          pan={(dx, dy) => setMapState((mapState) => mapState.pan(dx, dy))}
          zoom={(dz) => setMapState((mapState) => mapState.zoom(dz))}
        />
      </div>
    </div>
  )
}

export default App
