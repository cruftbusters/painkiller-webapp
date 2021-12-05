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
import useExtentSelection from './useExtentSelection'
import Selection from '../types/Selection'

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

  const { selection } = useExtentSelection()

  return (
    <layoutContext.Provider
      children={children}
      value={{
        createLayout: async () => {
          setError('')
          const [layout, error] = await fetchCreateLayout(
            createLayout(mapState, scaleAsNumber, selection),
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

async function fetchCreateLayout(layoutRequest: any) {
  const response = await fetch(
    'https://layouts.painkillergis.com/v1/layouts',
    {
      method: 'POST',
      body: JSON.stringify(layoutRequest),
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

function createLayout(
  mapState: MapState,
  scale: number,
  selection: Selection | undefined,
) {
  if (selection) {
    const { x: left, y: top } = new MapPixel(
      selection.left,
      selection.top,
    ).toEpsg3857Coordinate(mapState)
    const { x: right, y: bottom } = new MapPixel(
      selection.right,
      selection.bottom,
    ).toEpsg3857Coordinate(mapState)

    const width = selection.right - selection.left
    const height = selection.bottom - selection.top

    return {
      scale,
      size: { width, height },
      bounds: { left, top, right, bottom },
    }
  } else {
    const { left, top, width, height } = mapState
    const { x: right, y: bottom } = new MapPixel(
      width,
      height,
    ).toEpsg3857Coordinate(mapState)

    return {
      scale,
      size: { width, height },
      bounds: { left, top, right, bottom },
    }
  }
}

export default function useLayout() {
  return useContext<LayoutContext>(layoutContext)
}
