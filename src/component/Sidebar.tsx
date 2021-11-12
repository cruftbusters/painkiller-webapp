import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Metadata from '../types/Metadata'
import MapMetadataSummary from './MapMetadataSummary'

interface SidebarProps {
  mapMetadata?: Metadata
  mapState: MapState
  onCreateMap: (mapMetadata: Metadata) => void
}

export default function Sidebar({
  mapMetadata,
  mapState,
  onCreateMap,
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
      <button
        style={{ fontSize: '1em' }}
        onClick={async () => {
          const { width, height, left, top } = mapState
          const { x: right, y: bottom } = new MapPixel(
            width,
            height,
          ).toEpsg3857Coordinate(mapState)
          const response = await fetch(
            'https://gallery.painkillergis.com/v1/maps',
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
      <MapMetadataSummary mapMetadata={mapMetadata} />
    </div>
  )
}
