import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import Epsg3857Coordinate from '../types/Epsg3857Coordinate'
import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Selection from '../types/Selection'
import useMapState from './useMapState'

interface ExtentSelectionContext {
  height: number
  isSelecting: boolean
  resetSelection: () => void
  selection: Selection
  setWidth: (width: number) => void
  setSelecting: Dispatch<SetStateAction<boolean>>
  setSelection: (selection: Selection) => void
  setHeight: (height: number) => void
  width: number
  worldSelection: Selection
}

const errMissingProvider = Error(
  'Missing ancestral extent selection context provider',
)

const extentSelectionContext = createContext<ExtentSelectionContext>({
  height: 0,
  isSelecting: false,
  resetSelection: () => {
    throw errMissingProvider
  },
  selection: { left: 0, top: 0, right: 0, bottom: 0 },
  setHeight: () => {
    throw errMissingProvider
  },
  setSelecting: () => {
    throw errMissingProvider
  },
  setSelection: () => {
    throw errMissingProvider
  },
  setWidth: () => {
    throw errMissingProvider
  },
  width: 0,
  worldSelection: { left: 0, top: 0, right: 0, bottom: 0 },
})

interface ExtentSelectionContextProviderProps {
  children: ReactNode
}

export function ExtentSelectionContextProvider({
  children,
}: ExtentSelectionContextProviderProps) {
  const [isSelecting, setSelecting] = useState(false)
  const [worldSelection, setWorldSelection] = useState<Selection>()
  const { mapState } = useMapState()

  const screenSelectionWithDefault = worldSelection
    ? getScreenSelection(mapState, worldSelection)
    : getDefaultSelection(mapState)

  const [size, setSize] = useState<{ width: number; height: number }>()
  const screenSelectionWidth = Math.round(
    screenSelectionWithDefault.right - screenSelectionWithDefault.left,
  )
  const widthWithDefault = size?.width || screenSelectionWidth
  const screenSelectionHeight = Math.round(
    screenSelectionWithDefault.bottom - screenSelectionWithDefault.top,
  )
  const heightWithDefault = size?.height || screenSelectionHeight

  const worldSelectionWithDefault =
    worldSelection ||
    getWorldSelection(mapState, getDefaultSelection(mapState))

  return (
    <extentSelectionContext.Provider
      value={{
        height: heightWithDefault,
        isSelecting,
        resetSelection: () => {
          setWorldSelection(undefined)
          setSize(undefined)
        },
        selection: screenSelectionWithDefault,
        setHeight: (height) =>
          setSize({
            width: Math.round(
              (height * screenSelectionWidth) / screenSelectionHeight,
            ),
            height,
          }),
        setSelecting: (isSelecting) => {
          if (isSelecting) {
            setSize(undefined)
          }
          setSelecting(isSelecting)
        },
        setSelection: (selection) => {
          setSize({
            width: selection.right - selection.left,
            height: selection.bottom - selection.top,
          })
          setWorldSelection(getWorldSelection(mapState, selection))
        },
        setWidth: (width) =>
          setSize({
            width,
            height: Math.round(
              (width * screenSelectionHeight) / screenSelectionWidth,
            ),
          }),
        width: widthWithDefault,
        worldSelection: worldSelectionWithDefault,
      }}
      children={children}
    />
  )
}

function getDefaultSelection(mapState: MapState) {
  const { width, height } = mapState
  return {
    left: 0,
    top: 0,
    right: width,
    bottom: height,
  }
}

function getScreenSelection(mapState: MapState, selection: Selection) {
  const { x: left, y: top } = new Epsg3857Coordinate(
    selection.left,
    selection.top,
  ).toMapPixel(mapState)
  const { x: right, y: bottom } = new Epsg3857Coordinate(
    selection.right,
    selection.bottom,
  ).toMapPixel(mapState)
  return { left, top, right, bottom }
}

function getWorldSelection(mapState: MapState, selection: Selection) {
  const { x: left, y: top } = new MapPixel(
    selection.left,
    selection.top,
  ).toEpsg3857Coordinate(mapState)
  const { x: right, y: bottom } = new MapPixel(
    selection.right,
    selection.bottom,
  ).toEpsg3857Coordinate(mapState)
  return { left, top, right, bottom }
}

export default function useExtentSelection() {
  return useContext(extentSelectionContext)
}
