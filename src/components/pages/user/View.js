import axios from 'axios'
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import Pagination from '../../Pagination'
import { useState } from 'react'

function View() {
    const cookies = new Cookies()
    const [pageNumber, setPageNumber] = useState(0)
    let formData = new FormData();
    formData.append(pageNumber, pageNumber)
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/users/all',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        })
            .then(result => console.log(result))
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
                        <tr>
                            <td>1</td>
                            <td>Nguyen Van A</td>
                            <td>manager@fe.edu.vn</td>
                            <td>0902345011</td>
                            <td>Edu Department</td>
                            <td>
                                <Link to={'/'}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link to={'/user/update'}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-trash-can"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Nguyen Van B</td>
                            <td>staff@fe.edu.vn</td>
                            <td>0902345011</td>
                            <td>Edu Department</td>
                            <td>
                                <Link to={'/'}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-trash-can"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Nguyen Thi C</td>
                            <td>staff@fe.edu.vn</td>
                            <td>0902345011</td>
                            <td>HR Department</td>
                            <td>
                                <Link to={'/'}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-trash-can"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    )
}

export default View