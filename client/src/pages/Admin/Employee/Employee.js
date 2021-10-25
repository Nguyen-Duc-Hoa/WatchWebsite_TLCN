import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { FaLock, FaUnlockAlt } from 'react-icons/fa'
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Employee() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,
            sortDirections: ['descend'],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address > b.address,
            sortDirections: ['descend'],
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            render: (state, record) => {
                return (
                    <>
                        {state ?
                            <FaLock
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer'
                                }}
                                onClick={() => changeStateHandler(record)}
                            /> :
                            <FaUnlockAlt
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer'
                                }}
                                onClick={() => changeStateHandler(record)}
                            />}
                    </>
                )
            }
        }
    ]

    const updateEmployeeList = res => {
        const employeeList = []
        res.Users.map(ele => employeeList.push({
            key: ele.Id,
            name: ele.Name,
            phone: ele.Phone,
            address: ele.Address,
            state: ele.State
        }))
        setData(employeeList)
        setCurrentPage(res.CurrentPage)
        setTotalPage(res.TotalPage)
    }

    const changeStateHandler = record => {
        fetch(`https://localhost:44336/api/User/UpdateState?currentPage=${currentPage}`, {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: record.key
        })
            .then(response => response.json())
            .then(res => updateEmployeeList(res))
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetch(`https://localhost:44336/api/User/GetEmployeeList?currentPage=${currentPage}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => updateEmployeeList(res))
            .catch(error => {
                console.log(error)
            })
    }, [currentPage])

    return (
        <section className='admin'>
            <div className="heading">Employee</div>
            <div className="buttonLayout">
                <Link to='/admin/CreateAccount'>
                <Button size='large' type='primary'><AiOutlineAppstoreAdd className='icon' /> Create new account</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none', 'none'] }}
                footer={() => (
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        noPadding={true}
                        totalPage={totalPage} />
                )}
                bordered={true} />
        </section>
    )
}

export default Employee
