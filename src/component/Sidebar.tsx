import MapState from '../types/MapState'
import Layout from '../types/Layout'
import LayoutSummary from './LayoutSummary'
import GenerateButton from './GenerateButton'

interface SidebarProps {
  layout?: Layout
  mapState: MapState
  onCreateMap: (layout: Layout) => void
}

export default function Sidebar({
  layout,
  mapState,
  onCreateMap,
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
    </div>
  )
}
