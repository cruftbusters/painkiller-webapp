import { MutableRefObject, useRef } from 'react'
import useMapState from '../hook/useMapState'

function MapControls() {
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0 })
  const mapControlsRef = useRef() as MutableRefObject<HTMLDivElement>

  const { setMapState } = useMapState()

  return (
    <div
      ref={mapControlsRef}
      style={{ width: '100%', height: '100%' }}
      onWheel={(e) => {
        const { left, top } =
          mapControlsRef.current.getBoundingClientRect()
        setMapState((mapState) =>
          mapState.zoom(e.deltaY, e.pageX - left, e.pageY - top),
        )
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

        setMapState((mapState) => mapState.pan(dx, dy))

        dragStateRef.current.lastX = e.pageX
        dragStateRef.current.lastY = e.pageY
      }}
    />
  )
}

export default MapControls
