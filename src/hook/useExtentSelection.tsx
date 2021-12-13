import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import MapState from '../types/MapState'
import Selection from '../types/Selection'
import useMapState from './useMapState'

interface ExtentSelectionContext {
  isSelecting: boolean
  resetSelection: () => void
  setSelecting: Dispatch<SetStateAction<boolean>>
  selection: Selection
  setSelection: Dispatch<SetStateAction<Selection>>
}

const errMissingProvider = Error(
  'Missing ancestral extent selection context provider',
)

const extentSelectionContext = createContext<ExtentSelectionContext>({
  isSelecting: false,
  selection: { left: 0, top: 0, right: 0, bottom: 0 },
  resetSelection: () => {
    throw errMissingProvider
  },
  setSelecting: () => {
    throw errMissingProvider
  },
  setSelection: () => {
    throw errMissingProvider
  },
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

  return (
    <extentSelectionContext.Provider
      value={{
        isSelecting,
        resetSelection: () => setSelection(undefined),
        setSelecting,
        selection: selection || getDefaultSelection(mapState),
        setSelection: setSelection as Dispatch<SetStateAction<Selection>>,
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

export default function useExtentSelection() {
  return useContext(extentSelectionContext)
}
