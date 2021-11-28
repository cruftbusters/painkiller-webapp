import MapState from '../types/MapState'
import Layout from '../types/Layout'
import LayoutSummary from './LayoutSummary'
import GenerateButton from './GenerateButton'
import OverlayOpacity from './OverlayOpacity'
import { ReactNode } from 'react'

interface SidebarProps {
  layout?: Layout
  mapState: MapState
  onCreateMap: (layout: Layout) => void
  heightmapOpacity: string
  hillshadeOpacity: string
  setHeightmapOpacity: (overlayOpacity: string) => void
  setHillshadeOpacity: (overlayOpacity: string) => void
}

export default function Sidebar({
  layout,
  mapState,
  onCreateMap,
  heightmapOpacity,
  hillshadeOpacity,
  setHeightmapOpacity,
  setHillshadeOpacity,
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
      {layout?.heightmapURL ? (
        <Section>
          <Header>Heightmap</Header>
          <OverlayOpacity
            layout={layout}
            overlayOpacity={heightmapOpacity}
            setOverlayOpacity={setHeightmapOpacity}
          />
        </Section>
      ) : undefined}
      {layout?.hillshadeURL ? (
        <Section>
          <Header>Hillshade</Header>
          <OverlayOpacity
            layout={layout}
            overlayOpacity={hillshadeOpacity}
            setOverlayOpacity={setHillshadeOpacity}
          />
        </Section>
      ) : undefined}
    </div>
  )
}

function Section({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        margin: '0 -0.5em',
        padding: '0 0.5em',
      }}
    >
      {children}
    </div>
  )
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        margin: '0 -0.5em',
        padding: '0.5em',
        backgroundColor: '#DDD',
        fontSize: '1.125em',
      }}
    >
      {children}
    </div>
  )
}
