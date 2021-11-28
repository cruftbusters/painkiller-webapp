import { MutableRefObject, useEffect, useRef, useState } from 'react'
import BaseLayer from './component/BaseLayer'
import SpatialOverlay from './component/SpatialOverlay'
import HorizontalDrag from './component/HorizontalDrag'
import MapControls from './component/MapControls'
import Sidebar from './component/Sidebar'
import MapState from './types/MapState'
import useLayout from './hook/useLayout'
import useMapState from './hook/useMapState'

export default function App() {
  const mapContainerRef = useRef() as MutableRefObject<HTMLDivElement>

  const { setMapState } = useMapState()

  const { layout } = useLayout()
  const [heightmapOpacity, setHeightmapOpacity] = useState('0.0')
  const [hillshadeOpacity, setHillshadeOpacity] = useState('1.0')

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
  }, [setMapState, mapContainerRef, dividerOffset])

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
          heightmapOpacity={heightmapOpacity}
          hillshadeOpacity={hillshadeOpacity}
          setHeightmapOpacity={setHeightmapOpacity}
          setHillshadeOpacity={setHillshadeOpacity}
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
        <BaseLayer />
        <SpatialOverlay
          url={layout?.heightmapURL}
          overlayOpacity={heightmapOpacity}
        />
        <SpatialOverlay
          url={layout?.hillshadeURL}
          overlayOpacity={hillshadeOpacity}
        />
        <MapControls />
      </div>
    </div>
  )
}
