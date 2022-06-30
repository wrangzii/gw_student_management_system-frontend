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
            url: `http://localhost:8080/department/${id}`,
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
                            <th className='text-center'>Department</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Created Date</th>
                            <th className='text-center'>Created By</th>
                            <th className='text-center'>Modified Date</th>
                            <th className='text-center'>Modified By</th>
                            <th className='text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{viewDetail.departmentId}</td>
                            <td>{viewDetail.departmentName}</td>
                            <td>{viewDetail.description}</td>
                            <td>{new Date(viewDetail.createDate).toLocaleDateString()}</td>
                            <td>{viewDetail.createBy}</td>
                            <td>{new Date(viewDetail.modifyDate).toLocaleDateString()}</td>
                            <td>{viewDetail.modifyBy}</td>
                            <td><Link to={`/department/update/${viewDetail.departmentId}`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDetail