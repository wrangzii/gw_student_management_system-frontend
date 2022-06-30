import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Navbar'

function ViewDetail() {
    const cookies = new Cookies()
    const { id } = useParams()
    const [viewDetail, setViewDetail] = useState([])

    // Get role's detail info
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/role/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result) {
                    setViewDetail(result.data.data)
                }
            })
    }, [])

    return (
        <div className='role-detail'>
            <Navbar />
            <div className="overflow-auto">
                <table className='table table-striped table-hover table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Role</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Created By</th>
                            <th className='text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{viewDetail.roleId}</td>
                            <td>{viewDetail.roleName}</td>
                            <td>{viewDetail.description}</td>
                            <td>{viewDetail.createBy}</td>
                            <td><Link to={`/role/update/${viewDetail.roleId}`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDetail