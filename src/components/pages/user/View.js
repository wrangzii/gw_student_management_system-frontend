import React from 'react'
import { Link } from 'react-router-dom'

function View() {
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