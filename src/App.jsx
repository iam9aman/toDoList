import { useState } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'

function App() {


  let router=createBrowserRouter(
    (createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
      
      </Route>
    ))
  )


  return (
    <>
       <RouterProvider router={router}/>
       {/* <div>hi</div> */}
    </>
  )
}

export default App
