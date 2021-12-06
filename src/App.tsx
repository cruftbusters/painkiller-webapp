import { useCallback, useState } from 'react'
import BaseLayer from './component/BaseLayer'
import SpatialOverlay from './component/SpatialOverlay'
import MapControls from './component/MapControls'
import Sidebar from './component/Sidebar'
import useLayout from './hook/useLayout'
import StackChildren from './component/StackChildren'
import VerticalSplit, { SplitMode } from './component/VerticalSplit'
import MapContainer from './component/MapContainer'
import ExtentSelection from './component/ExtentSelection'
import ExtentSelector from './component/ExtentSelector'

export default function App() {
  const [splitMode] = useState(
    window.innerWidth > window.innerHeight
      ? SplitMode.vertical
      : SplitMode.horizontal,
  )
  const [vspResizeCount, setVspResizeCount] = useState(0)
  const [heightmapOpacity, setHeightmapOpacity] = useState('0.0')
  const [hillshadeOpacity, setHillshadeOpacity] = useState('1.0')
  const { layout } = useLayout()

  return (
    <VerticalSplit
      splitMode={splitMode}
      onResize={useCallback(
        () => setVspResizeCount((vspResizeCount) => vspResizeCount + 1),
        [],
      )}
      left={
        <Sidebar
          heightmapOpacity={heightmapOpacity}
          hillshadeOpacity={hillshadeOpacity}
          setHeightmapOpacity={setHeightmapOpacity}
          setHillshadeOpacity={setHillshadeOpacity}
        />
      }
      right={
        <MapContainer resizeCount={vspResizeCount}>
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
            <ExtentSelection />
            <MapControls />
            <ExtentSelector />
          </StackChildren>
        </MapContainer>
      }
    />
  )
}
