import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout, { LayoutInProgress } from '../types/Layout'
import { createContext, useContext, useEffect, useState } from 'react'
import usePollLayerURLs from './usePollLayerURLs'
import useMapState from './useMapState'
import useExtentSelection from './useExtentSelection'
import Selection from '../types/Selection'

interface LayoutContext {
  createLayout: () => Promise<void>
  error?: Error
  isDisabledReason?: string
  layout?: Layout
  layoutInProgress: LayoutInProgress
  scale: string
  setScale: React.Dispatch<React.SetStateAction<string>>
  setLayout: React.Dispatch<React.SetStateAction<Layout | undefined>>
}

const errMissingLayoutContextProvider = Error(
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

const layoutContext = createContext<LayoutContext>({
  createLayout: async () => {
    throw errMissingLayoutContextProvider
  },
  error: errMissingLayoutContextProvider,
  layoutInProgress: initialLayoutInProgress,
  scale: '1.0',
  setScale: () => {
    throw errMissingLayoutContextProvider
  },
  setLayout: () => {
    throw errMissingLayoutContextProvider
  },
})

interface LayoutContextProviderProps {
  children: React.ReactNode
}

export function LayoutContextProvider({
  children,
}: LayoutContextProviderProps) {
  const { mapState } = useMapState()
  const [layout, setLayout] = useState<Layout>()
  const isTooHighScale = mapState.scale < 7
  const [error, setError] = useState<Error>()
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

  const [layoutInProgress, setLayoutInProgress] =
    useState<LayoutInProgress>(initialLayoutInProgress)

  useEffect(() => {
    setLayoutInProgress(
      createLayout(mapState, scaleAsNumber, selection) as Layout,
    )
  }, [mapState, scaleAsNumber, selection])

  return (
    <layoutContext.Provider
      children={children}
      value={{
        createLayout: async () => {
          setError(undefined)
          const [layout, error] = await fetchCreateLayout(layoutInProgress)
          setLayout(layout)
          setError(error)
        },
        error,
        isDisabledReason: isTooHighScale
          ? errIsTooHighScale
          : isNaN(scaleAsNumber)
          ? errScaleIsNotNumber
          : undefined,
        layout,
        layoutInProgress,
        scale,
        setScale,
        setLayout,
      }}
    />
  )
}

export const errIsTooHighScale = 'Zoom in to enable layer rendering'

export const errScaleIsNotNumber =
  'Set scale to a number to enable layer rendering'

function createLayout(
  mapState: MapState,
  scale: number,
  selection: Selection,
) {
  const { x: left, y: top } = new MapPixel(
    selection.left,
    selection.top,
  ).toEpsg3857Coordinate(mapState)
  const { x: right, y: bottom } = new MapPixel(
    selection.right,
    selection.bottom,
  ).toEpsg3857Coordinate(mapState)

  const width = Math.round(selection.right - selection.left)
  const height = Math.round(selection.bottom - selection.top)

  return {
    scale,
    size: { width, height },
    bounds: { left, top, right, bottom },
  }
}

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

export default function useLayout() {
  return useContext<LayoutContext>(layoutContext)
}
