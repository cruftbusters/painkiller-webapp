import Layout from '../types/Layout'

interface OverlayOpacityProps {
  layout?: Layout
  setOverlayOpacity: (overlayOpacity: string) => void
  overlayOpacity: string
}

export default function OverlayOpacity({
  layout,
  setOverlayOpacity,
  overlayOpacity,
}: OverlayOpacityProps) {
  return layout ? (
    <p>
      Overlay opacity
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        value={overlayOpacity}
        onChange={(e) => setOverlayOpacity(e.target.value)}
        style={{ width: '100%' }}
      />
    </p>
  ) : null
}
