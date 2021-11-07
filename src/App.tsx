import BaseLayer from './component/BaseLayer'

function App() {
  return (
    <BaseLayer
      mapState={{
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 3,
        x: -140,
        y: 31,
      }}
    />
  )
}

export default App
