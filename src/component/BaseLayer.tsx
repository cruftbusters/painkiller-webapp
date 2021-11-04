import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Coordinate, {
  DefaultCoordinate,
  fromScreen,
  fromTile,
} from '../types/Coordinate'
import Screen from '../types/Screen'

type BaseLayerProps = {
  width: number
  height: number
}

function BaseLayer({ width, height }: BaseLayerProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
  const [screen] = useState<Screen>({ width, height, scale: 0 })
  const [coordinate] = useState<Coordinate>(new DefaultCoordinate(0, 0))
  useEffect(() => {
    ;(async () => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')!
      context.fillRect(0, 0, screen.width, screen.height)

      const z = 0
      const [right, bottom] = fromScreen(
        screen,
        screen.width,
        screen.height,
      ).toTile(z)
      for (let x = 0; x < right; x++) {
        for (let y = 0; y < bottom; y++) {
          const image = await fetchBaseTile(x, y, z)
          const [left, top] = fromTile(x, y, z).toScreen(screen)
          const [right, bottom] = fromTile(x + 1, y + 1, z).toScreen(
            screen,
          )
          context.drawImage(image, left, top, right - left, bottom - top)
        }
      }
    })()
  }, [canvasRef, screen, coordinate])
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
