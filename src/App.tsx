import { MutableRefObject, useEffect, useRef, useState } from 'react'
import BaseLayer from './component/BaseLayer'
import SpatialOverlay from './component/SpatialOverlay'
import MapControls from './component/MapControls'
import Sidebar from './component/Sidebar'
import MapState from './types/MapState'
import useLayout from './hook/useLayout'
import useMapState from './hook/useMapState'
import useWindowSize from './hook/useWindowSize'
import StackChildren from './component/StackChildren'
import VerticalSplit from './component/VerticalSplit'

export default function App() {
  const mapContainerRef = useRef() as MutableRefObject<HTMLDivElement>

  const { setMapState } = useMapState()

  const { layout } = useLayout()
  const [heightmapOpacity, setHeightmapOpacity] = useState('0.0')
  const [hillshadeOpacity, setHillshadeOpacity] = useState('1.0')

  const windowSize = useWindowSize()
  const [vspResizeCount, setVspResizeCount] = useState(0)
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
  }, [setMapState, mapContainerRef, vspResizeCount, windowSize])

  return (
    <VerticalSplit
      onResize={() =>
        setVspResizeCount((vspResizeCount) => vspResizeCount + 1)
      }
      left={
        <Sidebar
          heightmapOpacity={heightmapOpacity}
          hillshadeOpacity={hillshadeOpacity}
          setHeightmapOpacity={setHeightmapOpacity}
          setHillshadeOpacity={setHillshadeOpacity}
        />
      }
      right={
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%' }}
        >
          <StackChildren>
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
          </StackChildren>
        </div>
      }
    />
  )
}
