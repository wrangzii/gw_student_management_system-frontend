import React from 'react'
import { Link } from 'react-router-dom'

function View() {
    return (
        <div className='program-view'>
            <div className="filter-area">
                <div className="filter-are__program_code col-6">
                    <div className="program_code-dropdown dropdown d-flex">
                        <label htmlFor="program_code">Program Code</label>
                        <input type="text" className="form-control mb-0" placeholder='Input here' style={{ width: 'fit-content' }}/>
                    </div>
                </div>
                <div className="filter-area__program_name col-6">
                    <div className="program_name-dropdown dropdown d-flex">
                        <label htmlFor="program_name">Program Name</label>
                        <input type="text" className="form-control mb-0" placeholder='Input here' style={{ width: 'fit-content' }}/>
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>program</th>
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
                                <Link to={'/program/update'}><i className="fa-solid fa-pen-to-square"></i></Link>
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