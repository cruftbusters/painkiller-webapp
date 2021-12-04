import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import HorizontalDrag from './HorizontalDrag'

interface VerticalSplitProps {
  left: ReactNode
  right: ReactNode
  onResize: () => void
}

export default function VerticalSplit({
  left,
  right,
  onResize,
}: VerticalSplitProps) {
  const leftRef = useRef() as MutableRefObject<HTMLDivElement>
  const [dividerOffset, setDividerOffset] = useState(0)

  useEffect(() => {
    const { left, right } =
      leftRef.current.getBoundingClientRect()
    setDividerOffset(right - left)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <div
        ref={leftRef}
        style={{
          flex: `0 0 ${dividerOffset ? `${dividerOffset}px` : '20%'}`,
        }}
      >
        {left}
      </div>
      <div
        style={{
          flex: '0 0 2px',
          backgroundColor: 'steelblue',
        }}
      >
        <HorizontalDrag
          onDrag={(dx, _) => {
            setDividerOffset((v) => v + dx)
            onResize()
          }}
        />
      </div>
      <div style={{ width: '100%', height: '100%' }}>{right}</div>
    </div>
  )
}
