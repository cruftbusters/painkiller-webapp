import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode } from 'react'
import useLayout from '../hook/useLayout'
import useExtentSelection from '../hook/useExtentSelection'
import BiButton from './BiButton'

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
  const {
    createLayout,
    error,
    isDisabledReason,
    layout,
    scale,
    setLayout,
    setScale,
  } = useLayout()
  const { isSelecting, selection, setSelecting, setSelection } =
    useExtentSelection()
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
          <div style={{ display: 'flex' }}>
            <span
              style={{
                flex: '0 1 1',
                borderRadius: '0.25rem 0 0 0.25rem',
                border: '1px solid gray',
                borderRight: 0,
                padding: '0.25rem 1rem',
              }}
            >
              Scale
            </span>
            <input
              type="text"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              style={{
                flex: '1',
                borderRadius: '0 0.25rem 0.25rem 0',
                border: '1px solid gray',
                textAlign: 'right',
              }}
            />
          </div>
        </p>
      </Section>
      <Section>
        <p>
          <BiButton
            button1Props={{
              disabled: isSelecting,
              onClick: () => setSelecting(true),
              children: isSelecting
                ? 'Selecting new extent...'
                : 'Select new extent',
            }}
            button2Props={{
              disabled: selection === undefined,
              onClick: () => setSelection(undefined),
              children: 'Clear extent',
            }}
          />
        </p>
        <p>
          <BiButton
            button1Props={{
              disabled: !!isDisabledReason,
              onClick: createLayout,
              children: isDisabledReason || 'Create layout',
            }}
            button2Props={{
              disabled: layout === undefined,
              onClick: () => setLayout(undefined),
              children: 'Clear layout',
            }}
          />
          {error ? <p>{error}</p> : undefined}
        </p>
      </Section>
      {layout ? (
        <Section>
          <Header>Summary</Header>
          <p>Scale: {layout.scale}</p>
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
