import { MutableRefObject, useEffect, useRef } from 'react'
import Screen, { NewScreen } from '../types/Screen'

type BaseLayerProps = {
  width: number
  height: number
}

function BaseLayer({ width, height }: BaseLayerProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
  const screenRef = useRef(
    NewScreen(width, height, 0),
  ) as MutableRefObject<Screen>
  useEffect(() => {
    ;(async () => {
      const screen = screenRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')!
      context.fillRect(0, 0, width, height)
      drawTile(screen, context, 0, 0, 0)
    })()
  }, [canvasRef, screenRef, width, height])
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

const drawTile = async (
  screen: Screen,
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  z: number,
) => {
  const image = await fetchBaseTile(x, y, z)
  const [left, top, right, bottom] = screen.tileToScreenEnvelope(x, y, z)
  context.drawImage(image, left, top, right - left, bottom - top)
}

const fetchBaseTile = (tx: number, ty: number, tz: number) =>
  new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = `https://mt0.google.com/vt/lyrs=y&hl=en&x=${tx}&y=${ty}&z=${tz}`
  })

export default BaseLayer
