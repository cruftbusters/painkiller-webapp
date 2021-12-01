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
        padding: '0 0.5rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <Section>
        <Header>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              margin: '-0.5rem',
              border: 0,
              boxSizing: 'content-box',
              fontSize: 'inherit',
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
      </Section>
      {layout ? (
        <Section>
          <Header>Summary</Header>
          <p>
            Image Size: {layout.size.width}x{layout.size.height}
            <br />
            World Size:{' '}
            {Math.round(layout.bounds.right - layout.bounds.left)}x
            {Math.round(layout.bounds.top - layout.bounds.bottom)}
            <br />
            World/Image Resolution:{' '}
            {Math.round(
              Math.min(
                (layout.bounds.right - layout.bounds.left) /
                  layout.size.width,

                (layout.bounds.top - layout.bounds.bottom) /
                  layout.size.height,
              ),
            )}
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
            <p>
              <a href={layout.heightmapURL}>Download heightmap preview</a>
            </p>
          ) : undefined}
          {layout.hiResHeightmapURL ? (
            <p>
              <a href={layout.hiResHeightmapURL}>Download heightmap</a>
            </p>
          ) : undefined}
          {layout.heightmapURL ? (
            <OverlayOpacity
              layout={layout}
              overlayOpacity={heightmapOpacity}
              setOverlayOpacity={setHeightmapOpacity}
            />
          ) : undefined}
          {layout.heightmapURL && layout.hiResHeightmapURL ? undefined : (
            <p>Generating heightmap...</p>
          )}
        </Section>
      ) : undefined}
      {layout?.heightmapURL ? (
        <Section>
          <Header>Hillshade</Header>
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
      ) : undefined}
    </div>
  )
}

function Section({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        margin: '0 -0.5rem',
        padding: '0 0.5rem',
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
        margin: '0 -0.5rem',
        padding: '0.5rem',
        backgroundColor: '#DDD',
        fontSize: '1.125rem',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
