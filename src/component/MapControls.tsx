import {
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useRef,
} from 'react'
import useMapState from '../hook/useMapState'

function MapControls() {
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0 })
  const mapControlsRef = useRef() as MutableRefObject<HTMLDivElement>

  const { setMapState } = useMapState()

  return (
    <div
      ref={mapControlsRef}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
        position: 'relative',
        pointerEvents: 'all',
      }}
      onWheel={(e) => {
        const { left, top } =
          mapControlsRef.current.getBoundingClientRect()
        setMapState((mapState) =>
          mapState.zoom(e.deltaY, e.pageX - left, e.pageY - top),
        )
      }}
      onPointerDown={(e) => {
        dragStateRef.current = {
          dragging: true,
          lastX: e.pageX,
          lastY: e.pageY,
        }
      }}
      onPointerUp={() => {
        dragStateRef.current.dragging = false
      }}
      onPointerLeave={(e) => {
        dragStateRef.current.dragging = false
      }}
      onPointerMove={(e) => {
        if (!dragStateRef.current.dragging) return
        const dx = e.pageX - dragStateRef.current.lastX
        const dy = e.pageY - dragStateRef.current.lastY

        setMapState((mapState) => mapState.pan(dx, dy))

        dragStateRef.current.lastX = e.pageX
        dragStateRef.current.lastY = e.pageY
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '4rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          right: 0,
          top: 0,
          margin: '0.25rem',
        }}
      >
        <ZoomButton
          onClick={() =>
            setMapState((mapState) => mapState.zoomToCenter(-144 * 2))
          }
        >
          +
        </ZoomButton>
        <ZoomButton
          onClick={() =>
            setMapState((mapState) => mapState.zoomToCenter(144 * 2))
          }
        >
          -
        </ZoomButton>
      </div>
    </div>
  )
}

interface ZoomButtonProps {
  onClick: MouseEventHandler
  children: ReactNode
}

function ZoomButton({ onClick, children }: ZoomButtonProps) {
  return (
    <button
      style={{
        flex: '1',
        borderRadius: '0.25rem',
        margin: '1px',
        border: '1px solid gray',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MapControls
