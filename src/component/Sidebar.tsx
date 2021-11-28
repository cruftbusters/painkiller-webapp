import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode } from 'react'
import useLayout, { errIsTooHighScale } from '../hook/useLayout'

interface SidebarProps {
  heightmapOpacity: string
  hillshadeOpacity: string
  setHeightmapOpacity: (overlayOpacity: string) => void
  setHillshadeOpacity: (overlayOpacity: string) => void
}

export default function Sidebar({
  heightmapOpacity,
  hillshadeOpacity,
  setHeightmapOpacity,
  setHillshadeOpacity,
}: SidebarProps) {
  const { layout, error, createLayout } = useLayout()
  const isTooHighScale = error === errIsTooHighScale
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0 0.5em',
        boxSizing: 'border-box',
      }}
    >
      <Section>
        <Header style={{ padding: 0 }}>
          <button
            style={{
              width: '100%',
              padding: '0.5em',
              border: 'none',
              fontSize: '1.25em',
              backgroundColor: isTooHighScale ? '#DDD' : '#AFA',
              cursor: isTooHighScale ? 'not-allowed' : 'pointer',
            }}
            disabled={isTooHighScale}
            onClick={createLayout}
          >
            Generate layers
          </button>
        </Header>
        {error ? <p>{error}</p> : undefined}
      </Section>
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

function Header({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        margin: '0 -0.5em',
        padding: '0.5em',
        backgroundColor: '#DDD',
        fontSize: '1.125em',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
