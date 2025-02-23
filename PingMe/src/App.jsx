import React, { useEffect } from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { login, logOut } from './store/authSlice'
import authService from './appwrite/auth'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/header/Header'
function App() {
const[loading,setLoading]=useState(true) 
const dispatch=useDispatch();
useEffect(()=>{
     authService.getCurrentUser()
     .then(
      (userData)=>{
        if(userData)  dispatch(login({userData}))
          else{
                dispatch(logOut());
          }
      }
     )
     .catch((error)=>{
      throw error
     })
     .finally(()=> setLoading(false))
   

},[dispatch]) 
  return !loading? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'><div className='w-full block'>
    <Header/>
    <main>
      <Outlet/>
    </main>

    <Footer/>
    </div></div>):null;
}

export default App
