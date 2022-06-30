import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Navbar'

function ViewDetail() {
    const cookies = new Cookies()
    const { id } = useParams()
    const [viewDetail, setViewDetail] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/users/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => setViewDetail(result.data.data))
    }, [])

    return (
        <div className='department-detail'>
            <Navbar />
            <div className="overflow-auto">
                <table className='table table-striped table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Username</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Created By</th>
                            <th className='text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{viewDetail.userId}</td>
                            <td>{viewDetail.username}</td>
                            <td>{viewDetail.description}</td>
                            <td>{viewDetail.createby}</td>
                            <td><Link to={`/department/update/${viewDetail.userId}`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDetail