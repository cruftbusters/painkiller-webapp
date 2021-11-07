import { MutableRefObject, useEffect, useRef, useState } from 'react'
import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Tile from '../types/Tile'

type BaseLayerProps = {
  width: number
  height: number
}

function BaseLayer({ width, height }: BaseLayerProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
  const [mapState] = useState<MapState>({
    width,
    height,
    scale: 3,
    x: -140,
    y: 31,
  })
  useEffect(() => {
    ;(async () => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')!
      context.fillRect(0, 0, mapState.width, mapState.height)

      const z = 4
      const [left, top] = new MapPixel(0, 0)
        .toEpsg3857Coordinate(mapState)
        .toTile(z)
      const [right, bottom] = new MapPixel(mapState.width, mapState.height)
        .toEpsg3857Coordinate(mapState)
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
      width={width}
      height={height}
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
