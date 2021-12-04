import { useEffect, useRef } from 'react'

interface DragProps {
  onDrag: (dx: number, dy: number) => void
}

export default function HorizontalDrag({ onDrag }: DragProps) {
  const dragState = useRef({ dragging: false, lastX: 0, lastY: 0 })

  useEffect(() => {
    const onMouseMove = ({ pageX, pageY }: MouseEvent) => {
      const { dragging, lastX, lastY } = dragState.current
      if (dragging) {
        onDrag(pageX - lastX, pageY - lastY)
        dragState.current = {
          dragging: true,
          lastX: pageX,
          lastY: pageY,
        }
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onDrag])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: 'ew-resize',
      }}
      onMouseDown={({ pageX, pageY }) => {
        dragState.current = {
          dragging: true,
          lastX: pageX,
          lastY: pageY,
        }
      }}
      onMouseUp={() => (dragState.current.dragging = false)}
    />
  )
}
