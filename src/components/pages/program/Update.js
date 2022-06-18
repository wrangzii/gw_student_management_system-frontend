import React from 'react'
import { Link } from 'react-router-dom'

function Update() {
    return (
        <div className='program-update'>
            <form action="" className="form-group">
                <h2 className='form-heading bg-warning text-white text-center'>UPDATING program</h2>
                <div className="form-body">
                    <div className="program_name-dropdown dropdown d-flex">
                        <label htmlFor="program_name">Program Name</label>
                        <input type="text" className='form-control' placeholder='BTEC' />
                    </div>
                    <div className="program_code-dropdown dropdown d-flex">
                        <label htmlFor="program_code">Program Code</label>
                        <input type="text" className="form-control" placeholder='TCS' />
                    </div>
                    <div className="program_code-dropdown dropdown d-flex">
                        <label htmlFor="program_code">Description</label>
                        <textarea className="form-control" placeholder='About this program' />
                    </div>
                    <div className="action-btn form-group">
                        <Link to={'/program/view'} className="btn btn-danger">Cancel</Link>
                        <Link to={'/'} className="btn btn-warning">Update</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Update