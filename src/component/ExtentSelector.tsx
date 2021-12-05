import { MutableRefObject, useRef, useState } from 'react'
import useExtentSelection from '../hook/useExtentSelection'

export default function ExtentSelector() {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const { isSelecting, setSelecting, setSelection } = useExtentSelection()
  const [isPointerDown, setPointerDown] = useState(false)
  const [[firstLeft, firstTop], setFirst] = useState([0, 0])
  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: isSelecting ? 'all' : 'none',
        cursor: isSelecting ? 'crosshair' : 'inherit',
      }}
      onPointerDown={(e) => {
        if (isSelecting) {
          const { left, top } =
            containerRef.current.getBoundingClientRect()
          setFirst([e.pageX - left, e.pageY - top])
          setPointerDown(true)
        }
      }}
      onPointerMove={(e) => {
        if (isPointerDown) {
          const { left, top } =
            containerRef.current.getBoundingClientRect()
          const [lastLeft, lastTop] = [e.pageX - left, e.pageY - top]
          setSelection({
            left: Math.min(firstLeft, lastLeft),
            top: Math.min(firstTop, lastTop),
            right: Math.max(firstLeft, lastLeft),
            bottom: Math.max(firstTop, lastTop),
          })
        }
      }}
      onPointerUp={() => {
        if (isSelecting) {
          setSelecting(false)
          setPointerDown(false)
        }
      }}
    />
  )
}
