import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import usePollLayerURLs from './usePollLayerURLs'
import useMapState from './useMapState'

interface LayoutContext {
  createLayout: () => Promise<void>
  error: string
  layout?: Layout
  scale: string
  setScale: Dispatch<SetStateAction<string>>
}

const layoutContext = createContext<LayoutContext>({
  createLayout: async () => {},
  error: 'No layout context provider',
  scale: '1.0',
  setScale: () => {},
})

interface LayoutContextProviderProps {
  children: ReactNode
}

export function LayoutContextProvider({
  children,
}: LayoutContextProviderProps) {
  const { mapState } = useMapState()
  const [layout, setLayout] = useState<Layout>()
  const isTooHighScale = mapState.scale < 7
  const [error, setError] = useState('')
  usePollLayerURLs(layout, setLayout)

  const [scale, setScale] = useState<string>('1')
  const [scaleAsNumber, setScaleAsNumber] = useState(1)
  useEffect(() => {
    if (scale.match(/^-?[0-9]*(\.[0-9]*)?$/)) {
      setScaleAsNumber(parseFloat(scale))
    } else {
      setScaleAsNumber(NaN)
    }
  }, [scale])

  return (
    <layoutContext.Provider
      children={children}
      value={{
        createLayout: async () => {
          setError('')
          const [layout, error] = await createLayout(
            mapState,
            scaleAsNumber,
          )
          setLayout(layout)
          setError(error)
        },
        error: isTooHighScale
          ? errIsTooHighScale
          : isNaN(scaleAsNumber)
          ? errScaleIsNotNumber
          : error,
        layout,
        scale,
        setScale,
      }}
    />
  )
}

export const errIsTooHighScale =
  'Zoom in further to enable layer rendering'

export const errScaleIsNotNumber =
  'Set scale to a number to enable layer rendering'

async function createLayout(mapState: MapState, scale: number) {
  const { width, height, left, top } = mapState
  const { x: right, y: bottom } = new MapPixel(
    width,
    height,
  ).toEpsg3857Coordinate(mapState)
  const response = await fetch(
    'https://layouts.painkillergis.com/v1/layouts',
    {
      method: 'POST',
      body: JSON.stringify({
        scale,
        size: { width, height },
        bounds: { left, top, right, bottom },
      }),
    },
  )
  if (response.status < 200 || response.status >= 300) {
    return [
      undefined,
      `There was an error generating layers. Try again later.\nError: got status code ${
        response.statusText
      }: ${await response.text()}`,
    ]
  } else {
    return [await response.json(), '']
  }
}

export default function useLayout() {
  return useContext<LayoutContext>(layoutContext)
}
