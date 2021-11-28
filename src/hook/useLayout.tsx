import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import { createContext, ReactNode, useContext, useState } from 'react'

const layoutContext = createContext<LayoutContextValue>({
  createLayout: async () => {},
  error: 'No layout context provider',
})

interface LayoutContextProviderProps {
  children: ReactNode
  mapState: MapState
}

interface LayoutContextValue {
  createLayout: () => Promise<void>
  error: string
  layout?: Layout
}

export function LayoutContextProvider({
  children,
  mapState,
}: LayoutContextProviderProps) {
  const [layout, setLayout] = useState<Layout>()
  const isTooHighScale = mapState.scale < 7
  const [error, setError] = useState('')

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
  return useContext<LayoutContextValue>(layoutContext)
}
