import Layout from '../types/Layout'
import { createContext, useContext, useState } from 'react'
import usePollLayerURLs from './usePollLayerURLs'
import useMapState from './useMapState'
import useLayoutInProgress from './useLayoutInProgress'

interface LayoutContext {
  clearLayout: () => void
  createLayout: () => Promise<void>
  createLayoutDisabledReason?: string
  createLayoutError?: Error
  layout?: Layout
}

const errMissingLayoutContextProvider = Error(
  'Missing ancestral layout context provider',
)

const layoutContext = createContext<LayoutContext>({
  clearLayout: () => {
    throw errMissingLayoutContextProvider
  },
  createLayout: async () => {
    throw errMissingLayoutContextProvider
  },
  createLayoutError: errMissingLayoutContextProvider,
})

interface LayoutContextProviderProps {
  children: React.ReactNode
}

export function LayoutContextProvider({
  children,
}: LayoutContextProviderProps) {
  const { mapState } = useMapState()
  const [layout, setLayout] = useState<Layout>()
  const [createLayoutError, setCreateLayoutError] = useState<Error>()
  usePollLayerURLs(layout, setLayout)

  const { layoutInProgress, scale } = useLayoutInProgress()

  return (
    <layoutContext.Provider
      children={children}
      value={{
        clearLayout: () => setLayout(undefined),
        createLayout: async () => {
          setCreateLayoutError(undefined)
          const [layout, error] = await createLayout(layoutInProgress)
          setLayout(layout)
          setCreateLayoutError(error)
        },
        createLayoutError: createLayoutError,
        createLayoutDisabledReason:
          mapState.scale < 7
            ? errIsTooHighScale
            : isNaN(scale)
            ? errScaleIsNotNumber
            : undefined,
        layout,
      }}
    />
  )
}

export const errIsTooHighScale = 'Zoom in to enable layer rendering'

export const errScaleIsNotNumber =
  'Set scale to a number to enable layer rendering'

async function createLayout(layout: any) {
  const response = await fetch(
    'https://layouts.painkillergis.com/v1/layouts',
    {
      method: 'POST',
      body: JSON.stringify(layout),
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
