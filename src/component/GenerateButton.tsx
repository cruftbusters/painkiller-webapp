import Layout from '../types/Layout'
import { useEffect } from 'react'
import useLayout, { errIsTooHighScale } from '../hook/useLayout'

interface GenerateButtonProps {
  onCreateMap: (layout: Layout) => void
}

export default function GenerateButton({
  onCreateMap,
}: GenerateButtonProps) {
  const { createLayout, error, layout } = useLayout()
  useEffect(() => {
    if (layout !== undefined) onCreateMap(layout)
  }, [onCreateMap, layout])
  return (
    <>
      <button
        style={{ fontSize: '1em' }}
        disabled={error === errIsTooHighScale}
        onClick={createLayout}
      >
        Generate layers
      </button>
      {error ? <p>{error}</p> : undefined}
    </>
  )
}
