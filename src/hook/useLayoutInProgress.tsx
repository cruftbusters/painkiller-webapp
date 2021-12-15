import { LayoutInProgress } from '../types/Layout'
import { createContext, SetStateAction, useContext, useState } from 'react'
import useExtentSelection from './useExtentSelection'

interface LayoutInProgressContext {
  layoutInProgress: LayoutInProgress
  scale: number
  setScale: React.Dispatch<SetStateAction<number>>
}

const errMissingLayoutInProgressContextProvider = Error(
  'Missing ancestral layout context provider',
)

const initialLayoutInProgress = {
  bounds: { left: 0, top: 0, right: 0, bottom: 0 },
  scale: 0,
  size: {
    width: 0,
    height: 0,
  },
}

const layoutInProgressContext = createContext<LayoutInProgressContext>({
  layoutInProgress: initialLayoutInProgress,
  scale: 1,
  setScale: () => {
    throw errMissingLayoutInProgressContextProvider
  },
})

interface LayoutInProgressContextProviderProps {
  children: React.ReactNode
}

export function LayoutInProgressContextProvider({
  children,
}: LayoutInProgressContextProviderProps) {
  const [scale, setScale] = useState(1)
  const { height, width, worldSelection } = useExtentSelection()

  return (
    <layoutInProgressContext.Provider
      value={{
        layoutInProgress: {
          scale,
          size: { width, height },
          bounds: worldSelection,
        },
        scale,
        setScale,
      }}
      children={children}
    />
  )
}

export default function useLayoutInProgress() {
  return useContext<LayoutInProgressContext>(layoutInProgressContext)
}
