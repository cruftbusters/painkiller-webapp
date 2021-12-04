import { useEffect, useRef } from 'react'
import { SplitMode } from './VerticalSplit'

interface DragProps {
  onDrag: (dx: number, dy: number) => void
  splitMode: SplitMode
}

export default function HorizontalDrag({ onDrag, splitMode }: DragProps) {
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
    const onMouseUp = () => (dragState.current.dragging = false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onDrag])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor:
          splitMode === SplitMode.vertical ? 'ew-resize' : 'ns-resize',
      }}
      onMouseDown={({ pageX, pageY }) => {
        dragState.current = {
          dragging: true,
          lastX: pageX,
          lastY: pageY,
        }
      }}
    />
  )
}
