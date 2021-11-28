import {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import useMapState from '../hook/useMapState'
import Tile from '../types/Tile'

interface BaseLayerTileProps {
  style: CSSProperties
  tile: Tile
}

export default function BaseLayerTile({
  style,
  tile,
}: BaseLayerTileProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>

  const { mapState } = useMapState()

  const tileURL = useMemo(
    () =>
      `https://mt0.google.com/vt/lyrs=y&hl=en&x=${tile.x}&y=${tile.y}&z=${tile.z}`,
    [tile],
  )
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')!
    const image = new Image()
    image.onload = () =>
      context.drawImage(image, 0, 0, mapState.tileSize, mapState.tileSize)
    image.src = tileURL
  }, [canvasRef, tileURL, mapState.tileSize])

  return (
    <canvas
      ref={canvasRef}
      width={mapState.tileSize}
      height={mapState.tileSize}
      style={style}
    />
  )
}
