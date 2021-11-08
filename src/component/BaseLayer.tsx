import { MutableRefObject, useEffect, useRef } from 'react'
import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Tile from '../types/Tile'

type BaseLayerProps = {
  mapState: MapState
}

function BaseLayer({ mapState }: BaseLayerProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
  useEffect(() => {
    ;(async () => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')!
      context.fillRect(0, 0, mapState.width, mapState.height)

      const z = 4
      const [left, top] = new MapPixel(0, 0)
        .toEpsg3857Coordinate(mapState)
        .clamp()
        .toTile(z)
      const [right, bottom] = new MapPixel(mapState.width, mapState.height)
        .toEpsg3857Coordinate(mapState)
        .clamp()
        .toTile(z)
      for (let x = Math.floor(left); x < right; x++) {
        for (let y = Math.floor(top); y < bottom; y++) {
          const image = await fetchBaseTile(x, y, z)
          const { x: left, y: top } = new Tile(x, y, z)
            .toEpsg3857Coordinate()
            .toMapPixel(mapState)
          const { x: right, y: bottom } = new Tile(x + 1, y + 1, z)
            .toEpsg3857Coordinate()
            .toMapPixel(mapState)
          context.drawImage(image, left, top, right - left, bottom - top)
        }
      }
    })()
  }, [canvasRef, mapState])
  return (
    <canvas
      width={mapState.width}
      height={mapState.height}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      ref={canvasRef}
    />
  )
}

const fetchBaseTile = (tx: number, ty: number, tz: number) =>
  new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = `https://mt0.google.com/vt/lyrs=y&hl=en&x=${tx}&y=${ty}&z=${tz}`
  })

export default BaseLayer
