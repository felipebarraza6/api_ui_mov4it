import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import App from './App'
import reportWebVitals from './pwa/reportWebVitals'
import { ConfigProvider } from 'antd'
import esEs from 'antd/locale/es_ES'

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = {    
    token: {  
      colorPrimary: '#5711a5',     
      colorBgHeader: '#5711a5', 
    }
}

root.render(
  <React.StrictMode>
    <ConfigProvider locale={esEs} theme={theme}>
      <App />
    </ConfigProvider>    
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
