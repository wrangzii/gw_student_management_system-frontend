import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from '../../Navbar'
import Create from './Create'
import View from './View'
import Update from './Update'

function Student() {
    return (
        <div className='student'>
            <Navbar />
            <div className="container">
                <ul>
                    <li className='text-success'>
                        <h1>Student</h1>
                    </li>
                    <Link to={'/student/view'}>
                        <li className='text-success'>View</li>
                    </Link>
                    <Link to={'/student/create'}>
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

export default Student