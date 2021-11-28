import MapState from '../types/MapState'
import Layout from '../types/Layout'
import LayoutSummary from './LayoutSummary'
import GenerateButton from './GenerateButton'
import OverlayOpacity from './OverlayOpacity'

interface SidebarProps {
  layout?: Layout
  mapState: MapState
  onCreateMap: (layout: Layout) => void
  setOverlayOpacity: (overlayOpacity: string) => void
  overlayOpacity: string
}

export default function Sidebar({
  layout,
  mapState,
  onCreateMap,
  setOverlayOpacity,
  overlayOpacity,
}: SidebarProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0.5em',
        boxSizing: 'border-box',
      }}
    >
      <GenerateButton mapState={mapState} onCreateMap={onCreateMap} />
      <LayoutSummary layout={layout} />
      <OverlayOpacity
        layout={layout}
        overlayOpacity={overlayOpacity}
        setOverlayOpacity={setOverlayOpacity}
      />
    </div>
  )
}
