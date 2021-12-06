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
  const layoutContext = useLayout()
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
              value={layoutContext.scale}
              onChange={(e) => layoutContext.setScale(e.target.value)}
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
              onClick: () => setSelecting(!isSelecting),
              children: isSelecting ? 'Cancel' : 'Select new extent',
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
              disabled: !!layoutContext.isDisabledReason,
              onClick: layoutContext.createLayout,
              children: layoutContext.isDisabledReason || 'Create layout',
            }}
            button2Props={{
              disabled: layoutContext.layout === undefined,
              onClick: () => layoutContext.setLayout(undefined),
              children: 'Clear layout',
            }}
          />
          {layoutContext.error ? <p>{layoutContext.error}</p> : undefined}
        </p>
      </Section>
      {layoutContext.layout ? (
        <Section>
          <Header>Summary</Header>
          <p>Scale: {layoutContext.layout.scale}</p>
          <p>
            Image Size: {layoutContext.layout.size.width}x
            {layoutContext.layout.size.height}
            <br />
            World Size:{' '}
            {Math.round(
              layoutContext.layout.bounds.right -
                layoutContext.layout.bounds.left,
            )}
            x
            {Math.round(
              layoutContext.layout.bounds.top -
                layoutContext.layout.bounds.bottom,
            )}
            <br />
            World/Image Resolution:{' '}
            {Math.round(
              Math.min(
                (layoutContext.layout.bounds.right -
                  layoutContext.layout.bounds.left) /
                  layoutContext.layout.size.width,

                (layoutContext.layout.bounds.top -
                  layoutContext.layout.bounds.bottom) /
                  layoutContext.layout.size.height,
              ),
            )}
          </p>
          <p>
            Bounds: {layoutContext.layout.bounds.left}{' '}
            {layoutContext.layout.bounds.top}{' '}
            {layoutContext.layout.bounds.right}{' '}
            {layoutContext.layout.bounds.bottom} (EPSG:3857)
          </p>
        </Section>
      ) : undefined}
      {layoutContext.layout ? (
        <Section>
          <Header>Heightmap</Header>
          {layoutContext.layout.heightmapURL ? (
            <p>
              <a href={layoutContext.layout.heightmapURL}>
                Download heightmap preview
              </a>
            </p>
          ) : undefined}
          {layoutContext.layout.hiResHeightmapURL ? (
            <p>
              <a href={layoutContext.layout.hiResHeightmapURL}>
                Download heightmap
              </a>
            </p>
          ) : undefined}
          {layoutContext.layout.heightmapURL ? (
            <OverlayOpacity
              layout={layoutContext.layout}
              overlayOpacity={heightmapOpacity}
              setOverlayOpacity={setHeightmapOpacity}
            />
          ) : undefined}
          {layoutContext.layout.heightmapURL &&
          layoutContext.layout.hiResHeightmapURL ? undefined : (
            <p>Generating heightmap...</p>
          )}
        </Section>
      ) : undefined}
      {layoutContext.layout?.heightmapURL ? (
        <Section>
          <Header>Hillshade</Header>
          {layoutContext.layout?.hillshadeURL ? (
            <>
              <p>
                <a href={layoutContext.layout.hillshadeURL}>
                  Download hillshade
                </a>
              </p>
              <OverlayOpacity
                layout={layoutContext.layout}
                overlayOpacity={hillshadeOpacity}
                setOverlayOpacity={setHillshadeOpacity}
              />
            </>
          ) : layoutContext.layout?.heightmapURL ? (
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
