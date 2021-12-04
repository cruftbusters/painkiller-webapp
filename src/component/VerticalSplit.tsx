import { ReactNode, useState } from 'react'
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
  const [dividerOffset, setDividerOffset] = useState(0)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <div style={{ flex: `0 0 calc(20% + ${dividerOffset}px)` }}>
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
