import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from '../../Navbar'
import Create from './Create'
import View from './View'
import Update from './Update'

function Program() {
    return (
        <div className='program'>
            <Navbar />
            <div className="container">
                <ul>
                    <li className='text-success'>
                        <h1>Program</h1>
                    </li>
                    <Link to={'/program/view'}>
                        <li className='text-success'>View</li>
                    </Link>
                    <Link to={'/program/create'}>
                        <li className='text-success'>Create</li>
                    </Link>
                </ul>
                <Routes>
                    <Route path='/create' element={<Create />} />
                    <Route path='/view' element={<View />} />
                    <Route path='/update' element={<Update />} />
                </Routes>
            </div>
        </div>
    )
}

export default Program