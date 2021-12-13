import OverlayOpacity from './OverlayOpacity'
import { CSSProperties, ReactNode, useState } from 'react'
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
  const {
    clearLayout,
    createLayout,
    createLayoutDisabledReason,
    createLayoutError,
    layout,
  } = useLayout()
  const { layoutInProgress, scaleAsString, setScaleAsString } =
    useLayoutInProgress()
  const {
    height,
    isSelecting,
    resetSelection,
    setHeight,
    setSelecting,
    setWidth,
    width,
  } = useExtentSelection()
  const [widthAsString, setWidthAsString] = useState<string>()
  const [heightAsString, setHeightAsString] = useState<string>()
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
          <div style={{ display: 'flex', marginBottom: '0.25rem' }}>
            <span
              style={{
                flex: '0',
                borderRadius: '0.25rem 0 0 0.25rem',
                border: '1px solid gray',
                borderRight: 0,
                padding: '0.125rem 0.5rem',
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
                padding: '0.125rem 0.5rem',
              }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '0.25rem' }}>
            <span
              style={{
                flex: '0',
                borderRadius: '0.25rem 0 0 0.25rem',
                border: '1px solid gray',
                borderRight: 0,
                padding: '0.125rem 0.5rem',
              }}
            >
              Width
            </span>
            <input
              type="text"
              value={widthAsString === undefined ? width : widthAsString}
              onChange={(e) => {
                const widthAsString = e.target.value
                if (widthAsString.match(/^[0-9]+$/)) {
                  const width = parseInt(widthAsString)
                  setWidthAsString(undefined)
                  setWidth(width)
                } else {
                  setWidthAsString(widthAsString)
                }
              }}
              style={{
                flex: '1',
                borderRadius: '0 0.25rem 0.25rem 0',
                border: '1px solid gray',
                textAlign: 'right',
                padding: '0.125rem 0.5rem',

                backgroundColor:
                  widthAsString === undefined ? 'inherit' : '#FAA',
              }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '0.25rem' }}>
            <span
              style={{
                flex: '0',
                borderRadius: '0.25rem 0 0 0.25rem',
                border: '1px solid gray',
                borderRight: 0,
                padding: '0.125rem 0.5rem',
              }}
            >
              Height
            </span>
            <input
              type="text"
              value={
                heightAsString === undefined ? height : heightAsString
              }
              onChange={(e) => {
                const heightAsString = e.target.value
                if (heightAsString.match(/^[0-9]+$/)) {
                  const height = parseInt(heightAsString)
                  setHeightAsString(undefined)
                  setHeight(height)
                } else {
                  setHeightAsString(heightAsString)
                }
              }}
              style={{
                flex: '1',
                borderRadius: '0 0.25rem 0.25rem 0',
                border: '1px solid gray',
                textAlign: 'right',
                padding: '0.125rem 0.5rem',

                backgroundColor:
                  heightAsString === undefined ? 'inherit' : '#FAA',
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
          Image Size: {layoutInProgress.size.width}x
          {layoutInProgress.size.height}
          <br />
          World Size:{' '}
          {Math.round(
            layoutInProgress.bounds.right - layoutInProgress.bounds.left,
          )}
          x
          {Math.round(
            layoutInProgress.bounds.top - layoutInProgress.bounds.bottom,
          )}
          <br />
          World/Image Resolution:{' '}
          {Math.round(
            Math.min(
              (layoutInProgress.bounds.right -
                layoutInProgress.bounds.left) /
                layoutInProgress.size.width,

              (layoutInProgress.bounds.top -
                layoutInProgress.bounds.bottom) /
                layoutInProgress.size.height,
            ),
          )}
        </p>
        <p>
          <ExtentSummary layout={layoutInProgress} />
        </p>
        <p>
          <BiButton
            button1Props={{
              disabled: !!createLayoutDisabledReason,
              onClick: createLayout,
              children: createLayoutDisabledReason || 'Create layout',
            }}
            button2Props={{
              disabled: layout === undefined,
              onClick: clearLayout,
              children: 'Clear layout',
            }}
          />
          {createLayoutError ? <p>{createLayoutError}</p> : undefined}
        </p>
      </Section>
      {layout ? (
        <Section>
          <Header>Layout</Header>
          <p>Scale: {layout.scale}</p>
          <p>
            <ResolutionSummary layout={layout} />
          </p>
          <p>
            <ExtentSummary layout={layout} />
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
