import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import MapState from '../types/MapState'
import useMapState from '../hook/useMapState'
import useWindowSize from '../hook/useWindowSize'

interface MapContainerProps {
  children: ReactNode
  resizeCount: number
}

export default function MapContainer({
  children,
  resizeCount,
}: MapContainerProps) {
  const mapContainerRef = useRef() as MutableRefObject<HTMLDivElement>
  const windowSize = useWindowSize()
  const { setMapState } = useMapState()
  useEffect(() => {
    const { clientWidth, clientHeight } = mapContainerRef.current
    setMapState(
      (mapState) =>
        new MapState({
          ...mapState,
          width: clientWidth,
          height: clientHeight,
        }),
    )
  }, [setMapState, mapContainerRef, resizeCount, windowSize])
  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100%' }}
      children={children}
    />
  )
}
