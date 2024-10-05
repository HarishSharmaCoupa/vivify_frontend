import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'
import { TbLogout } from "react-icons/tb";

const SideBar = ({user,closeToggle}) => {

  const categories = [
    {name: 'Animals'},
    {name: 'Wallpaper'},
    {name: 'Gaming'},
    {name: 'Photography'}
  
  ]

  const handleCloseSidebar =()=>{
      if(closeToggle) closeToggle(false)

  }

  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out captalize'
  const isActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 font-extrabold border-r-2 border-black transition-all ease-in-out captalize'
  
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>  
      <div className='flex flex-col'>
        <Link to="/" 
        className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' 
        onClick={handleCloseSidebar}>
          <img src={logo} alt="logo" className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
       <div className='flex'>
          <NavLink to="/" className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle } >
            <RiHomeFill/> Home
          </NavLink>
       
       </div>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            {categories.slice(0,categories.length-1).map((category) => (
              <NavLink to={`/category/${category.name}`} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
              onClick={handleCloseSidebar} key={category.name}>
                {category.name}
              </NavLink>
            ))}
          </h3>
        </div>
      </div>
      {user && (
      <div>
          <Link to={`user-profile/${user.id}`} 
        className='flex my-5 mb-3 gap-2 pd-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}>
          <img src={user.picture} className='w-10 h-10 rouded-full' alt='user-profile'/>
          <p>{user.name}</p>
        </Link>
        <NavLink to="/" className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle } >
        <TbLogout />
        </NavLink>
      </div>
      )}
    </div>
  )
}

export default SideBar
