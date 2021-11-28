import useLayout, { errIsTooHighScale } from '../hook/useLayout'

export default function GenerateButton() {
  const { createLayout, error } = useLayout()
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
