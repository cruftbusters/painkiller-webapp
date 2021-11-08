import BaseLayer from './component/BaseLayer'

function App() {
  return (
    <BaseLayer
      mapState={{
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 3,
        left: -140,
        top: 31,
      }}
    />
  )
}

export default App
