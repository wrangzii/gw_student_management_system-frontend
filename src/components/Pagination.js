import React from 'react'

function Pagination() {
    return (
        <div className='pagination'>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button type='button' className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    <li className="page-item"><button type='button' className="page-link">1</button></li>
                    <li className="page-item">
                        <button type='button' className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination