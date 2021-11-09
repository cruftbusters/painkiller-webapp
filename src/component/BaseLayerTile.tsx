import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import Tile from '../types/Tile'

interface BaseLayerTileProps {
  tile: Tile
  envelope: { left: number; top: number; right: number; bottom: number }
}

export default function BaseLayerTile({
  tile,
  envelope: { left, top, right, bottom },
}: BaseLayerTileProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>

  const width = Math.round(right - left)
  const height = Math.round(bottom - top)
  const tileURL = useMemo(
    () =>
      `https://mt0.google.com/vt/lyrs=y&hl=en&x=${tile.x}&y=${tile.y}&z=${tile.z}`,
    [tile],
  )
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')!
    const image = new Image()
    image.onload = () => context.drawImage(image, 0, 0, width, height)
    image.src = tileURL
  }, [canvasRef, tileURL, width, height])

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
