import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import { createContext, ReactNode, useContext, useState } from 'react'
import usePollLayerURLs from './usePollLayerURLs'
import useMapState from './useMapState'

interface LayoutContext {
  createLayout: () => Promise<void>
  error: string
  layout?: Layout
}

const layoutContext = createContext<LayoutContext>({
  createLayout: async () => {},
  error: 'No layout context provider',
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

  return (
    <layoutContext.Provider
      children={children}
      value={{
        createLayout: async () => {
          setError('')
          const [layout, error] = await createLayout(mapState)
          setLayout(layout)
          setError(error)
        },
        error: isTooHighScale ? errIsTooHighScale : error,
        layout,
      }}
    />
  )
}

export const errIsTooHighScale =
  'Zoom in further to enable layer rendering'

async function createLayout(mapState: MapState) {
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
        scale: 1,
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
