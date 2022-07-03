import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Navbar'

function ViewDetail() {
    const cookies = new Cookies()
    const { id } = useParams()
    const [viewDetail, setViewDetail] = useState([])
    const [departmentId, setDepartmentId] = useState({})

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/users/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setViewDetail(result.data.data)
                setDepartmentId(result.data.data.departmentId)
            })
    }, [])

    return (
        <div className='user-detail'>
            <Navbar />
            <div className="overflow-auto">
                <table className='table table-striped table-bordered table-dark'>
                    <thead>
                        <tr>
                            {/* <th className='text-center'>ID</th> */}
                            <th className='text-center'>Username</th>
                            <th className='text-center'>Fullname</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Phone Number</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Department</th>
                            <th className='text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td>{viewDetail.userId}</td> */}
                            <td>{viewDetail.username}</td>
                            <td>{viewDetail.fullName}</td>
                            <td>{viewDetail.email}</td>
                            <td>{viewDetail.phoneNumber}</td>
                            <td>{viewDetail.address}</td>
                            <td>{departmentId.departmentName}</td>
                            <td><Link to={`/user/update/${viewDetail.userId}`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDetail