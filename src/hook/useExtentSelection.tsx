import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Selection from '../types/Selection'
import useMapState from './useMapState'

interface ExtentSelectionContext {
  height: number
  isSelecting: boolean
  resetSelection: () => void
  selection: Selection
  setSelecting: Dispatch<SetStateAction<boolean>>
  setSelection: Dispatch<SetStateAction<Selection>>
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
  setSelecting: () => {
    throw errMissingProvider
  },
  setSelection: () => {
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
  const [selection, setSelection] = useState<Selection>()
  const { mapState } = useMapState()

  const selectionWithDefault = selection || getDefaultSelection(mapState)

  return (
    <extentSelectionContext.Provider
      value={{
        height: Math.round(
          selectionWithDefault.bottom - selectionWithDefault.top,
        ),
        isSelecting,
        resetSelection: () => setSelection(undefined),
        selection: selectionWithDefault,
        setSelecting,
        setSelection: setSelection as Dispatch<SetStateAction<Selection>>,
        width: Math.round(
          selectionWithDefault.right - selectionWithDefault.left,
        ),
        worldSelection: getWorldSelection(mapState, selectionWithDefault),
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
