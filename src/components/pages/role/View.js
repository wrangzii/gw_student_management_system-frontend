import React from 'react'
import { Link } from 'react-router-dom'

function View() {
    return (
        <div className='role-view'>
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
                <div className="filter-area__department col-6">
                    <div className="department-dropdown dropdown d-flex">
                        <label htmlFor="department">Department</label>
                        <button className="btn btn-info dropdown-toggle" type="button" id="department_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Department
                        </button>
                        <div className="dropdown-menu" aria-labelledby="department_dropdown">
                            <Link className="dropdown-item" to="/">Media</Link>
                            <Link className="dropdown-item" to="/">Marketing</Link>
                            <Link className="dropdown-item" to="/">IT</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Quantity</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Staff</td>
                            <td>Marketing</td>
                            <td>15</td>
                            <td>13</td>
                            <td>
                                <Link to={'/'}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link to={'/role/update'}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Link to={'/'}><i className="fa-solid fa-trash-can"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <Link className="page-link" to={'/'} tabIndex="-1">Previous</Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to={'/'}>1</Link></li>
                    <li className="page-item active">
                        <Link className="page-link" to={'/'}>2 <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to={'/'}>3</Link></li>
                    <li className="page-item">
                        <Link className="page-link" to={'/'}>Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default View