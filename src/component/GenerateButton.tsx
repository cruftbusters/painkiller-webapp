import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import { useState } from 'react'

interface GenerateButtonProps {
  mapState: MapState
  onCreateMap: (layout: Layout) => void
}

export default function GenerateButton({
  mapState,
  onCreateMap,
}: GenerateButtonProps) {
  const highScale = mapState.scale < 7
  const [error, setError] = useState('')
  return (
    <>
      <button
        style={{ fontSize: '1em' }}
        disabled={highScale}
        onClick={async () => {
          setError('')

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
          if (response.status < 200 || response.status >= 300) {
            setError(
              `got status code ${
                response.statusText
              }: ${await response.text()}`,
            )
          } else {
            onCreateMap(await response.json())
          }
        }}
      >
        Generate layers
      </button>
      {error ? (
        <>
          <p>There was an error generating layers. Try again later.</p>
          <p style={{ color: 'gray' }}>Error: {error}</p>
        </>
      ) : undefined}
      {highScale ? (
        <p>Zoom in further to enable layer rendering</p>
      ) : undefined}
    </>
  )
}
