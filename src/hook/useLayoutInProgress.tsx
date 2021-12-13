import { LayoutInProgress } from '../types/Layout'
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import useExtentSelection from './useExtentSelection'

interface LayoutInProgressContext {
  layoutInProgress: LayoutInProgress
  scale: number
  scaleAsString: string
  setScaleAsString: React.Dispatch<SetStateAction<string>>
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
  scaleAsString: '1.0',
  setScaleAsString: () => {
    throw errMissingLayoutInProgressContextProvider
  },
})

interface LayoutInProgressContextProviderProps {
  children: React.ReactNode
}

export function LayoutInProgressContextProvider({
  children,
}: LayoutInProgressContextProviderProps) {
  const [scaleAsString, setScaleAsString] = useState<string>('1')
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (scaleAsString.match(/^-?[0-9]*(\.[0-9]*)?$/)) {
      setScale(parseFloat(scaleAsString))
    } else {
      setScale(NaN)
    }
  }, [scaleAsString])

  const { selection, worldSelection } = useExtentSelection()
  const [layoutInProgress, setLayoutInProgress] =
    useState<LayoutInProgress>(initialLayoutInProgress)

  useEffect(() => {
    const width = Math.round(selection.right - selection.left)
    const height = Math.round(selection.bottom - selection.top)

    setLayoutInProgress({
      scale,
      size: { width, height },
      bounds: worldSelection,
    })
  }, [scale, selection, worldSelection])

  return (
    <layoutInProgressContext.Provider
      value={{ layoutInProgress, scale, scaleAsString, setScaleAsString }}
      children={children}
    />
  )
}

export default function useLayoutInProgress() {
  return useContext<LayoutInProgressContext>(layoutInProgressContext)
}
