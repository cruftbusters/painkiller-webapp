import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode } from 'react'
import useLayout, {
  errIsTooHighScale,
  errScaleIsNotNumber,
} from '../hook/useLayout'
import useExtentSelection from '../hook/useExtentSelection'

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
  const { isSelecting, setSelecting, setSelection } = useExtentSelection()
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0 0.5rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        minHeight: 0,
      }}
    >
      <Section>
        <Header>Layout</Header>
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
      <Section>
        <p>
          <div style={{ display: 'flex' }}>
            <button
              style={{
                width: '100%',
                borderRadius: '0.25rem 0 0 0.25rem',
                border: '1px solid gray',
                borderRight: 0,
                fontSize: 'inherit',
              }}
              disabled={isSelecting}
              onClick={() => setSelecting(true)}
            >
              {isSelecting
                ? 'Selecting new extent...'
                : 'Select new extent'}
            </button>
            <button
              style={{
                width: '100%',
                borderRadius: '0 0.25rem 0.25rem 0',
                border: '1px solid gray',
                fontSize: 'inherit',
              }}
              onClick={() => setSelection(undefined)}
            >
              Clear extent
            </button>
          </div>
        </p>
        <p>
          <button
            style={{
              width: '100%',
              borderRadius: '0.25rem',
              border: '1px solid gray',
              fontSize: 'inherit',
            }}
            disabled={isDisabled}
            onClick={createLayout}
          >
            Generate layers
          </button>
          {error ? <p>{error}</p> : undefined}
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
