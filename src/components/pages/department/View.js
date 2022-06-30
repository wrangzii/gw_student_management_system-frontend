import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import Pagination from '../../Pagination'
import PopupConfirm from '../../PopupConfirm'

function View() {
    const cookies = new Cookies()
    const [departments, setDepartments] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [popup, setPopup] = useState({
        message: "",
        isLoading: false,
    })
    const handlePopup = (message, isLoading) => {
        setPopup({
            message,
            isLoading
        })
    }
    const departmentIdRef = useRef()

    // Call list of department
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/department/all?pageNumber=${pageNumber}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setDepartments(result.data);
            })
            .catch(error => console.log(error))
    }, [pageNumber])

    // Handle delete department
    const handleDelete = departmentId => {
        handlePopup("Are you sure to delete?", true)
        departmentIdRef.current = departmentId
    }

    // Confirm to delete role
    const confirmDelete = (choose, departmentId) => {
        if (choose) {
            axios({
                method: 'delete',
                url: `http://localhost:8080/department/delete/${departmentIdRef.current}`,
                headers: {
                    'Authorization': 'Bearer ' + cookies.get('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    const newDepartmentList = [...departments]
                    const index = departments.findIndex(department => department.departmentId === departmentId)
                    newDepartmentList.splice(index, 1)
                    setDepartments(newDepartmentList)
                })
            handlePopup("", false)
        } else {
            handlePopup("", false)
        }
    }

    return (
        <div className='department-view'>
            <div className="overflow-auto">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Department</th>
                            <th>Description</th>
                            <th>Created Date</th>
                            <th>Created By</th>
                            <th>Modified Date</th>
                            <th>Modified By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map((department) => (
                                <tr key={department.departmentId}>
                                    <td>{department.departmentId}</td>
                                    <td>{department.departmentName}</td>
                                    <td>{department.description}</td>
                                    <td>{new Date(department.createDate).toLocaleDateString()}</td>
                                    <td>{department.createBy}</td>
                                    <td>{new Date(department.modifyDate).toLocaleDateString()}</td>
                                    <td>{department.modifyBy}</td>
                                    <td>
                                        <Link to={`detail/${department.departmentId}`}><i className="fa-solid fa-circle-info"></i></Link>
                                        <Link to={`/department/update/${department.departmentId}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={() => handleDelete(department.departmentId)}><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination />
                {popup.isLoading && <PopupConfirm message={popup.message} onPopup={confirmDelete} />}
            </div>
        </div>
    )
}

export default View