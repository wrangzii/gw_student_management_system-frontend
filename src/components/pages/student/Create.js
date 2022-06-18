import React from 'react'
import { Link } from 'react-router-dom'

function Create() {
    return (
        <div className='student-create'>
            <form action="" className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>CREATING A NEW STUDENT</h2>
                <div className="form-body">
                    <div className="form-body__left">
                        <div className="fullname form-group d-flex">
                            <label htmlFor="fullname">Fullname</label>
                            <input type="text" placeholder='Nguyen Van A' className='form-control' />
                        </div>
                        <div className="gender-dropdown dropdown d-flex">
                            <label htmlFor="gender">Gender</label>
                            <button className="btn btn-success dropdown-toggle" type="button" id="gender_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Gender
                            </button>
                            <div className="dropdown-menu" aria-labelledby="gender_dropdown">
                                <Link className="dropdown-item" to="/">Male</Link>
                                <Link className="dropdown-item" to="/">Female</Link>
                            </div>
                        </div>
                        <div className="email form-group d-flex">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='manager@fe.edu.vn' className='form-control' />
                        </div>
                        <div className="academic_year form-group d-flex">
                            <label htmlFor="academic_year">Academic Year</label>
                            <input type="date" className='form-control' />
                        </div>
                        <div className="avatar form-group d-flex">
                            <label htmlFor="avatar">Profile Image</label>
                            <input type="file" className='form-control' />
                        </div>
                    </div>
                    <div className="form-body__right">
                        <div className="birthday form-group d-flex">
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" className='form-control' />
                        </div>
                        <div className="phone form-group d-flex">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" placeholder='0902345011' className='form-control' />
                        </div>
                        <div className="major-dropdown dropdown d-flex">
                            <label htmlFor="major">Major</label>
                            <button className="btn btn-success dropdown-toggle" type="button" id="major_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Major
                            </button>
                            <div className="dropdown-menu" aria-labelledby="major_dropdown">
                                <Link className="dropdown-item" to="/">IT</Link>
                                <Link className="dropdown-item" to="/">BM</Link>
                                <Link className="dropdown-item" to="/">GD</Link>
                            </div>
                        </div>
                        <div className="campus-dropdown dropdown d-flex">
                            <label htmlFor="campus">Campus</label>
                            <button className="btn btn-success dropdown-toggle" type="button" id="campus_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Campus
                            </button>
                            <div className="dropdown-menu" aria-labelledby="campus_dropdown">
                                <Link className="dropdown-item" to="/">Ha Noi</Link>
                                <Link className="dropdown-item" to="/">Ho Chi Minh</Link>
                                <Link className="dropdown-item" to="/">Da Nang</Link>
                                <Link className="dropdown-item" to="/">Can Tho</Link>
                            </div>
                        </div>
                        <div className="action-btn form-group">
                            <Link to={'/user/view'} className="btn btn-danger">Cancel</Link>
                            <Link to={'/'} className="btn btn-success">Create</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create