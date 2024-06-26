import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='relative h-screen w-full bg-gray-700 text-gray-100'>
      <App />
    </div>
  </React.StrictMode>,
)
