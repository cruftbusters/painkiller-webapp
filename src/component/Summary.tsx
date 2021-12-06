import Layout, { LayoutInProgress } from '../types/Layout'

interface SummaryProps {
  layout: Layout | LayoutInProgress
}

export function ResolutionSummary({ layout }: SummaryProps) {
  return (
    <>
      Image Size: {layout.size.width}x{layout.size.height}
      <br />
      World Size: {Math.round(layout.bounds.right - layout.bounds.left)}x
      {Math.round(layout.bounds.top - layout.bounds.bottom)}
      <br />
      World/Image Resolution:{' '}
      {Math.round(
        Math.min(
          (layout.bounds.right - layout.bounds.left) / layout.size.width,

          (layout.bounds.top - layout.bounds.bottom) / layout.size.height,
        ),
      )}
    </>
  )
}

export function ExtentSummary({ layout }: SummaryProps) {
  return (
    <>
      Bounds: {layout.bounds.left} {layout.bounds.top}{' '}
      {layout.bounds.right} {layout.bounds.bottom} (EPSG:3857)
    </>
  )
}
