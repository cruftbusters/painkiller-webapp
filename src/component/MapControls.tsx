import { useRef } from 'react'

interface MapControlsProps {
  pan: (dx: number, dy: number) => void
  zoom: (dz: number) => void
}

function MapControls({ pan, zoom }: MapControlsProps) {
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0 })
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'absolute' }}
      onWheel={(e) => zoom(e.deltaY)}
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
