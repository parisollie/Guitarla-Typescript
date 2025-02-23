import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

//Vid 92,Paso 3.0 le ponemos (!) para que no venga de null
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)