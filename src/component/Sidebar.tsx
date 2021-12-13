import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode } from 'react'
import useLayout from '../hook/useLayout'
import useExtentSelection from '../hook/useExtentSelection'
import BiButton from './BiButton'
import { ExtentSummary, ResolutionSummary } from './Summary'
import useLayoutInProgress from '../hook/useLayoutInProgress'

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
  const { layoutInProgress, scaleAsString, setScaleAsString } =
    useLayoutInProgress()
  const { isSelecting, resetSelection, setSelecting } =
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
        <Header>Layout Settings</Header>
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
              value={scaleAsString}
              onChange={(e) => setScaleAsString(e.target.value)}
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
              children: isSelecting ? 'Cancel' : 'Select extent',
            }}
            button2Props={{
              onClick: resetSelection,
              children: 'Reset extent',
            }}
          />
        </p>
        <p>
          <ResolutionSummary layout={layoutInProgress} />
        </p>
        <p>
          <ExtentSummary layout={layoutInProgress} />
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
          <Header>Layout</Header>
          <p>Scale: {layoutContext.layout.scale}</p>
          <p>
            <ResolutionSummary layout={layoutContext.layout} />
          </p>
          <p>
            <ExtentSummary layout={layoutContext.layout} />
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
