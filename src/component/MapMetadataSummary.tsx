import Metadata from '../types/Metadata'

interface MapMetadataSummaryProps {
  mapMetadata?: Metadata
}

export default function MapMetadataSummary({
  mapMetadata,
}: MapMetadataSummaryProps) {
  if (!mapMetadata) return null
  const {
    size: { width, height },
    bounds: { left, top, right, bottom },
    heightmapURL,
  } = mapMetadata
  return (
    <>
      <p>
        Size: {width}x{height}
      </p>
      <p>
        Bounds: {left} {top} {right} {bottom} (EPSG:3857)
      </p>
      {heightmapURL ? (
        <a href={heightmapURL}>Download heightmap</a>
      ) : (
        'Generating heightmap...'
      )}
    </>
  )
}
