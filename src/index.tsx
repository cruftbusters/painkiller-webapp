import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MapStateContextProvider } from './hook/useMapState'
import { LayoutContextProvider } from './hook/useLayout'
import { ExtentSelectionContextProvider } from './hook/useExtentSelection'
import { LayoutInProgressContextProvider } from './hook/useLayoutInProgress'

ReactDOM.render(
  <React.StrictMode>
    <MapStateContextProvider>
      <ExtentSelectionContextProvider>
        <LayoutInProgressContextProvider>
          <LayoutContextProvider>
            <App />
          </LayoutContextProvider>
        </LayoutInProgressContextProvider>
      </ExtentSelectionContextProvider>
    </MapStateContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
