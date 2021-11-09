import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import Tile from '../types/Tile'

interface BaseLayerTileProps {
  tile: Tile
  position: { left: number; top: number }
  size: { width: number; height: number }
}

export default function BaseLayerTile({
  tile,
  position: { left, top },
  size: { width, height },
}: BaseLayerTileProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>

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
