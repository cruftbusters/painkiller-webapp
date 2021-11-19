import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import LayoutSummary from './LayoutSummary'

interface SidebarProps {
  layout?: Layout
  mapState: MapState
  onCreateMap: (layout: Layout) => void
}

export default function Sidebar({
  layout,
  mapState,
  onCreateMap,
}: SidebarProps) {
  const highScale = mapState.scale < 7
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0.5em',
        boxSizing: 'border-box',
      }}
    >
      <button
        style={{ fontSize: '1em' }}
        disabled={highScale}
        onClick={async () => {
          const { width, height, left, top } = mapState
          const { x: right, y: bottom } = new MapPixel(
            width,
            height,
          ).toEpsg3857Coordinate(mapState)
          const response = await fetch(
            'https://layouts.painkillergis.com/v1/layouts',
            {
              method: 'POST',
              body: JSON.stringify({
                size: { width, height },
                bounds: { left, top, right, bottom },
              }),
            },
          )

          onCreateMap(await response.json())
        }}
      >
        Generate heightmap
      </button>
      {highScale ? (
        <p>Zoom in further to enable layer rendering</p>
      ) : undefined}
      <LayoutSummary layout={layout} />
    </div>
  )
}
