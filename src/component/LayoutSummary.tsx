import Layout from '../types/Layout'

interface LayoutSummaryProps {
  layout?: Layout
}

export default function LayoutSummary({ layout }: LayoutSummaryProps) {
  if (!layout) return null
  const {
    size: { width, height },
    bounds: { left, top, right, bottom },
  } = layout
  return (
    <>
      <p>
        Size: {width}x{height}
      </p>
      <p>
        Bounds: {left} {top} {right} {bottom} (EPSG:3857)
      </p>
    </>
  )
}
