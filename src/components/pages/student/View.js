import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../Pagination'

function View() {
    return (
        <div className='student-view'>
            <div className="filter-area">
                <div className="filter-are__major col-6">
                    <div className="major-dropdown dropdown d-flex">
                        <label htmlFor="major">Major</label>
                        <button className="btn btn-info dropdown-toggle" type="button" id="major_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Major
                        </button>
                        <div className="dropdown-menu" aria-labelledby="major_dropdown">
                            <Link className="dropdown-item" to="/">IT</Link>
                            <Link className="dropdown-item" to="/">BM</Link>
                            <Link className="dropdown-item" to="/">GD</Link>
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
                            <th>Gender</th>
                            <th>Major</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Nguyen Van A</td>
                            <td>student@greenwich.edu.vn</td>
                            <td>Male</td>
                            <td>Business Management</td>
                            <td>
                                <Link to={'/'}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link to={'/student/update'}><i className="fa-solid fa-pen-to-square"></i></Link>
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