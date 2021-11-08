import { MutableRefObject, useEffect, useRef } from 'react'
import MapState from '../types/MapState'
import Tile from '../types/Tile'

interface BaseLayerTileProps {
  tile: Tile
  mapState: MapState
}

export default function BaseLayerTile({
  tile,
  mapState,
}: BaseLayerTileProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>

  const { x: left, y: top } = tile
    .toEpsg3857Coordinate()
    .toMapPixel(mapState)
  const { x: right, y: bottom } = tile
    .bottomRight()
    .toEpsg3857Coordinate()
    .toMapPixel(mapState)
  const width = Math.ceil(right - left)
  const height = Math.ceil(bottom - top)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')!
    const image = new Image()
    image.onload = () => context.drawImage(image, 0, 0, width, height)
    image.src = `https://mt0.google.com/vt/lyrs=y&hl=en&x=${tile.x}&y=${tile.y}&z=${tile.z}`
  }, [canvasRef, tile, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  )
}
