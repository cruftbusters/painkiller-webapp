import MapState from '../types/MapState'

interface SidebarProps {
  mapState: MapState
  onHeightmapIDChange: (id: string) => void
}

export default function Sidebar({
  mapState,
  onHeightmapIDChange,
}: SidebarProps) {
  return (
    <div style={{ position: 'absolute' }}>
      <button
        style={{ margin: '0.5em', fontSize: '1em' }}
        onClick={async () => {
          const response = await fetch(
            'https://gallery.painkillergis.com/v1/maps',
            {
              method: 'POST',
              body: JSON.stringify({
                size: { width: mapState.width, height: mapState.height },
                position: { left: mapState.left, top: mapState.top },
              }),
            },
          )

          const { id } = await response.json()
          onHeightmapIDChange(id)
        }}
      >
        Generate heightmap
      </button>
    </div>
  )
}
