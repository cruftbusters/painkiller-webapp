import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'

interface GenerateButtonProps {
  mapState: MapState
  onCreateMap: (layout: Layout) => void
}

export default function GenerateButton({
  mapState,
  onCreateMap,
}: GenerateButtonProps) {
  const highScale = mapState.scale < 7
  return (
    <>
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
        Generate layers
      </button>
      {highScale ? (
        <p>Zoom in further to enable layer rendering</p>
      ) : undefined}
    </>
  )
}
