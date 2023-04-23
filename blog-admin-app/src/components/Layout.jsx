import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Headers from './Headers'

function Layout() {
  return (
    <div>
        <Sidebar />
        <div className='wrapper-container'>
            <Headers />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout