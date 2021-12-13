import useExtentSelection from '../hook/useExtentSelection'

const borderWidth = 2

export default function ExtentSelection() {
  const { selection } = useExtentSelection()
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          border: `${borderWidth}px solid red`,
          left: selection.left - borderWidth,
          top: selection.top - borderWidth,
          width: selection.right - selection.left,
          height: selection.bottom - selection.top,
        }}
      />
    </div>
  )
}
