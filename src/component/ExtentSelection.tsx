import useExtentSelection from '../hook/useExtentSelection'

export default function ExtentSelection() {
  const { selection } = useExtentSelection()
  const backgroundColor = 'black'
  return selection ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: `${selection.top}px ${
          selection.bottom - selection.top
        }px 1fr`,
        gridTemplateColumns: `${selection.left}px ${
          selection.right - selection.left
        }px 1fr`,
        gridTemplateAreas: `
        'top top top'
        'left selection right'
        'bottom bottom bottom'
        `,
      }}
    >
      <div style={{ gridArea: 'left', backgroundColor }} />
      <div style={{ gridArea: 'top', backgroundColor }} />
      <div style={{ gridArea: 'right', backgroundColor }} />
      <div style={{ gridArea: 'bottom', backgroundColor }} />
    </div>
  ) : null
}
