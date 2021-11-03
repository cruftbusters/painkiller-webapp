import { MutableRefObject, useEffect, useRef } from 'react'

type BaseLayerProps = {
  width: number
  height: number
}

function BaseLayer({ width, height }: BaseLayerProps) {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
  useEffect(() => {
    ;(async () => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')!
      context.fillRect(0, 0, width, height)
      const image = await fetchBaseTile(0, 0, 0)
      context.drawImage(image, 0, 0)
    })()
  }, [canvasRef])
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
