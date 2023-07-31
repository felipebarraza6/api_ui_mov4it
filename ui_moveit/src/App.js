import React, { useReducer, createContext, useEffect } from 'react'
import './assets/css/App.css'
import { appReducer } from './reducers/app'
import Login from './pages/Login'
import Home from './pages/Home'
import api from './api/endpoints'


export const AppContext = createContext()


function App() {

  const initialState = {
    isAuth: false,
    token: null,
    user: null,
    profile: null,
    update_count: 0
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const updateApp = async() => {
    const token = JSON.parse(localStorage.getItem('token'))
    const user = JSON.parse(localStorage.getItem('user'))

    if(user && token){
      const rq = await api.authentication.retrieve(user.username).then((x)=>{        
        dispatch({
          type:'UPDATE',
          payload: x
        })
      })    
      return rq 
    }
  }

  useEffect(() =>{
    updateApp()
  },[state.update_count])
  
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
    {state.isAuth ? <Home />:<Login />}
    </AppContext.Provider>
  )
}

export default App
