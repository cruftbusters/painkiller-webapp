import { createContext, ReactNode, useContext, useState } from 'react'
import {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from '../types/Epsg3857Coordinate'
import MapState from '../types/MapState'

interface MapStateContext {
  mapState: MapState
  setMapState: React.Dispatch<React.SetStateAction<MapState>>
}
const mapStateContext = createContext<MapStateContext>({
  mapState: new MapState({}),
  setMapState: () => {},
})

interface MapStateContextProviderProps {
  children: ReactNode
}

export function MapStateContextProvider({
  children,
}: MapStateContextProviderProps) {
  const [mapState, setMapState] = useState(
    new MapState({
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 5,
      left: (-130 / 180) * maxMercatorLongitude,
      top: (27.5 / 90) * maxMercatorLatitude,
    }),
  )

  return (
    <mapStateContext.Provider
      value={{ mapState, setMapState }}
      children={children}
    />
  )
}

export default function useMapState() {
  return useContext(mapStateContext)
}
