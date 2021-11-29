import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode } from 'react'
import useLayout, {
  errIsTooHighScale,
  errScaleIsNotNumber,
} from '../hook/useLayout'

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
  const { layout, error, createLayout, setScale, scale } = useLayout()
  const isDisabled =
    error === errIsTooHighScale || error === errScaleIsNotNumber
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
              backgroundColor: isDisabled ? '#DDD' : '#AFA',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
            disabled={isDisabled}
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
          <p>Scale: {layout.scale}</p>
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
      <Section>
        <Header>Hillshade</Header>
        <p>
          Scale:{' '}
          <input
            type="text"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            style={{ float: 'right' }}
          />
          <input
            type="range"
            min="0.0"
            max="2.0"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            style={{ width: '100%' }}
          />
        </p>
        {layout?.hillshadeURL ? (
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
        ) : layout?.heightmapURL ? (
          <p>Generating hillshade...</p>
        ) : undefined}
      </Section>
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
