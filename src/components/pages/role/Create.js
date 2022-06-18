    import React from 'react'
    import { Link } from 'react-router-dom'

    function Create() {
        return (
            <div className='role-create'>
                <form action="" className="form-group">
                    <h2 className='form-heading bg-success text-white text-center'>CREATING A NEW ROLE</h2>
                    <div className="form-body">
                        <div className="role-dropdown dropdown d-flex">
                            <label htmlFor="role">Role</label>
                            <input type="text" className='form-control' placeholder='Accountant Leader' />
                        </div>
                        <div className="department-dropdown dropdown d-flex">
                            <label htmlFor="department">Department</label>
                            <button className="btn btn-success dropdown-toggle" type="button" id="department_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Department
                            </button>
                            <div className="dropdown-menu" aria-labelledby="department_dropdown">
                                <Link className="dropdown-item" to="/">Education</Link>
                                <Link className="dropdown-item" to="/">Marketing</Link>
                                <Link className="dropdown-item" to="/">HR</Link>
                            </div>
                        </div>
                        <div className="action-btn form-group">
                            <Link to={'/role/view'} className="btn btn-danger">Cancel</Link>
                            <Link to={'/'} className="btn btn-success">Create</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    export default Create