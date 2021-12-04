import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import HorizontalDrag from './HorizontalDrag'

export enum SplitMode {
  horizontal,
  vertical,
}

interface VerticalSplitProps {
  left: ReactNode
  right: ReactNode
  onResize: () => void
  splitMode: SplitMode
}

export default function VerticalSplit({
  left,
  right,
  onResize,
  splitMode,
}: VerticalSplitProps) {
  const leftRef = useRef() as MutableRefObject<HTMLDivElement>
  const [dividerOffset, setDividerOffset] = useState(0)

  useEffect(() => {
    if (dividerOffset !== 0) return
    if (splitMode === SplitMode.vertical) {
      const { left, right } = leftRef.current.getBoundingClientRect()
      setDividerOffset(right - left)
    } else {
      const { top, bottom } = leftRef.current.getBoundingClientRect()
      setDividerOffset(bottom - top)
    }
  }, [splitMode, dividerOffset])

  useEffect(() => {
    onResize()
    setDividerOffset(0)
  }, [onResize, splitMode])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: splitMode === SplitMode.vertical ? 'row' : 'column',
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
          onDrag={(dx, dy) => {
            if (splitMode === SplitMode.vertical) {
              const { left, right } =
                leftRef.current.getBoundingClientRect()
              if (right - left > dividerOffset && dx < 0) return
              setDividerOffset((v) => v + dx)
            } else {
              const { top, bottom } =
                leftRef.current.getBoundingClientRect()
              if (bottom - top > dividerOffset && dy < 0) return
              setDividerOffset((v) => v + dy)
            }
            onResize()
          }}
          splitMode={splitMode}
        />
      </div>
      <div style={{ width: '100%', height: '100%' }}>{right}</div>
    </div>
  )
}
