import React from 'react'
import { Pagination } from 'antd'
import './Pagination.scss'

function Paging({ currentPage, totalPage, setCurrentPage }) {
    const onShowSizeChange = (current, pageSize) => {
        setCurrentPage(current)
    }

    return (
        <Pagination
            responsive
            style={{ padding: '40px', textAlign: 'center' }}
            current={currentPage}
            showSizeChanger={false}
            total={totalPage * 10}
            onChange={onShowSizeChange} />
    )
}

export default Paging
