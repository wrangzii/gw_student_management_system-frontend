import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import Pagination from '../../Pagination'
import { useState } from 'react'

function View() {
    const cookies = new Cookies()
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    let formData = new FormData();

    // Get list user
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/users/all?pageNumber=${pageNumber}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        })
            .then(result => {
                if (result)
                    setUsers(result.data)
            })
    }, [pageNumber])

    return (
        <div className='user-view'>
            <div className="filter-area">
                <div className="filter-are__role col-6">
                    <div className="role-dropdown dropdown d-flex">
                        <label htmlFor="role">Role</label>
                        <button className="btn btn-info dropdown-toggle" type="button" id="role_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Role
                        </button>
                        <div className="dropdown-menu" aria-labelledby="role_dropdown">
                            <Link className="dropdown-item" to="/">Manager</Link>
                            <Link className="dropdown-item" to="/">Accoutant</Link>
                            <Link className="dropdown-item" to="/">President</Link>
                        </div>
                    </div>
                </div>
                <div className="filter-area__major col-6">
                    <div className="major-dropdown dropdown d-flex">
                        <label htmlFor="major">Major</label>
                        <button className="btn btn-info dropdown-toggle" type="button" id="major_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Major
                        </button>
                        <div className="dropdown-menu" aria-labelledby="major_dropdown">
                            <Link className="dropdown-item" to="/">Manager</Link>
                            <Link className="dropdown-item" to="/">Accoutant</Link>
                            <Link className="dropdown-item" to="/">President</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user.userId}>
                                <td>{i + 1}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.departmentId.departmentName}</td>
                                <td>
                                    <Link to={`detail/${user.userId}`}><i className="fa-solid fa-circle-info"></i></Link>
                                    <Link to={`../update/${user.userId}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <Link to={'/'}><i className="fa-solid fa-trash-can"></i></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    )
}

export default View