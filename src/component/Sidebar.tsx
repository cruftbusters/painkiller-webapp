import MapState from '../types/MapState'
import Layout from '../types/Layout'
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
      {layout ? (
        <Section>
          <Header>Summary</Header>
          <p>
            Size: {layout.size.width}x{layout.size.height}
          </p>
          <p>
            Bounds: {layout.bounds.left} {layout.bounds.top}{' '}
            {layout.bounds.right} {layout.bounds.bottom} (EPSG:3857)
          </p>
        </Section>
      ) : undefined}
      {layout ? (
        <Section>
          <Header>Heightmap</Header>
          {layout.heightmapURL ? (
            <>
              <p>
                <a href={layout.heightmapURL}>Download heightmap</a>
              </p>
              <OverlayOpacity
                layout={layout}
                overlayOpacity={heightmapOpacity}
                setOverlayOpacity={setHeightmapOpacity}
              />
            </>
          ) : (
            <p>Generating heightmap...</p>
          )}
        </Section>
      ) : undefined}
      {layout?.heightmapURL ? (
        <Section>
          <Header>Hillshade</Header>
          {layout.hillshadeURL ? (
            <>
              <p>
                <a href={layout.hillshadeURL}>Download hillshade</a>
              </p>
              <OverlayOpacity
                layout={layout}
                overlayOpacity={hillshadeOpacity}
                setOverlayOpacity={setHillshadeOpacity}
              />
            </>
          ) : (
            <p>Generating hillshade...</p>
          )}
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
