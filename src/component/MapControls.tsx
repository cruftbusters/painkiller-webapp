import { MutableRefObject, useRef } from 'react'

interface MapControlsProps {
  pan: (dx: number, dy: number) => void
  zoom: (dz: number, mouseX: number, mouseY: number) => void
}

function MapControls({ pan, zoom }: MapControlsProps) {
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0 })
  const mapControlsRef = useRef() as MutableRefObject<HTMLDivElement>
  return (
    <div
      ref={mapControlsRef}
      style={{ width: '100%', height: '100%', position: 'absolute' }}
      onWheel={(e) => {
        const { left, top } =
          mapControlsRef.current.getBoundingClientRect()
        zoom(e.deltaY, e.pageX - left, e.pageY - top)
      }}
      onMouseDown={(e) =>
        (dragStateRef.current = {
          dragging: true,
          lastX: e.pageX,
          lastY: e.pageY,
        })
      }
      onMouseUp={() => (dragStateRef.current.dragging = false)}
      onMouseLeave={() => (dragStateRef.current.dragging = false)}
      onMouseMove={(e) => {
        if (!dragStateRef.current.dragging) return
        const dx = e.pageX - dragStateRef.current.lastX
        const dy = e.pageY - dragStateRef.current.lastY

        pan(dx, dy)

        dragStateRef.current.lastX = e.pageX
        dragStateRef.current.lastY = e.pageY
      }}
    />
  )
}

export default MapControls
