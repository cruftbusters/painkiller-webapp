import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import Selection from '../types/Selection'

interface ExtentSelectionContext {
  isSelecting: boolean
  setSelecting: Dispatch<SetStateAction<boolean>>
  selection?: Selection
  setSelection: Dispatch<SetStateAction<Selection | undefined>>
}

const errMissingProvider = Error(
  'Missing ancestral extent selection context provider',
)

const extentSelectionContext = createContext<ExtentSelectionContext>({
  isSelecting: false,
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
  return (
    <extentSelectionContext.Provider
      value={{
        isSelecting,
        setSelecting,
        selection,
        setSelection,
      }}
      children={children}
    />
  )
}

export default function useExtentSelection() {
  return useContext(extentSelectionContext)
}
