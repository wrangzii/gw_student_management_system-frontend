import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from '../../Navbar'
import Create from './Create'
import View from './View'
import Update from './Update'
import ViewDetail from './ViewDetail'

function User() {
    return (
        <div className='user'>
            <Navbar />
            <div className="container">
                <ul>
                    <li className='text-success'>
                        <h1>USER</h1>
                    </li>
                    <Link to={'/user/view'}>
                        <li className='text-success'>View</li>
                    </Link>
                    <Link to={'/user/create'}>
                        <li className='text-success'>Create</li>
                    </Link>
                </ul>
                <Routes>
                    <Route path='/create' element={<Create />} />
                    <Route path='/view' element={<View />} />
                    <Route path='/view/detail/:id' element={<ViewDetail />} />
                    <Route path='/update/:id' element={<Update />} />
                </Routes>
            </div>
        </div>
    )
}

export default User