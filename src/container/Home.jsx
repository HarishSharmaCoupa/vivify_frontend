import React from 'react'
import api from '../services/api'
import { useState,useRef, useEffect } from 'react';
import {HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';
import {Link,Route, Routes} from 'react-router-dom'
import { SideBar,UserProfile, Login } from '../components';
import logo from '../assets/logo.png'
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const userInfo = fetchUser()
  const scrollRef = useRef(null)
  let imgCss;
  if(userInfo){
    imgCss = 'w-15 rounded-full h-15'
  }

  // useEffect(() =>{
  //   const query = userQuery(userInfo?.googleId)

    
  // },[])

  // useEffect(() =>{
  //   scrollRef.current.scrollTo(0,0)

    
  // },[])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user && user}/>
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true) }/>
          <Link to="/">
            <img src={logo} alt="logo" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?.id}`}>
            <img src={userInfo ? userInfo.picture : logo} alt="logo" className={imgCss} />
          </Link>
        </div>
        {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absoulute w-full flex justify-end p-2'>
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=> setToggleSidebar(false)} />
          </div>
          <SideBar user={userInfo && userInfo} closeToggle={setToggleSidebar}/>
        </div>
      )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll'>
        <Routes>
          {/* <Route path='/user-profile/:userId' element={<UserProfile />} /> */}
          <Route path='/*' element={<Pins user={userInfo && userInfo} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
