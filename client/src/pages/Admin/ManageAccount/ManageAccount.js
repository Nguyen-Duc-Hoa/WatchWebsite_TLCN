import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBox from "../../../components/SearchBox/SearchBox";

function ManageAccount() {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name > b.name,
      sortDirections: ["descend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address > b.address,
      sortDirections: ["descend"],
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state, record) => {
        return (
          <>
            {state ? (
              <FaLock
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => changeStateHandler(record)}
              />
            ) : (
              <FaUnlockAlt
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => changeStateHandler(record)}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchCustomerList();
    console.log(data);
  }, [currentPage, searchKey]);

  const updateState = (res) => {
    const customerList = [];
    res.Users.map((ele) =>
      customerList.push({
        key: ele.Id,
        name: ele.Name,
        phone: ele.Phone,
        address: ele.Address,
        state: ele.State,
      })
    );
    setData(customerList);
    setCurrentPage(res.CurrentPage);
    setTotalPage(res.TotalPage);
  };

  const fetchCustomerList = () => {
    fetch(
      `https://localhost:44336/api/User/SearchCustomer?currentPage=${currentPage}&searchKey=${searchKey}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => updateState(res))
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStateHandler = (record) => {
    console.log('change state')
    fetch(
      `https://localhost:44336/api/User/UpdateStateCustomer?currentPage=${currentPage}&searchKey=${searchKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: record.key,
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => updateState(res))
      .catch((error) => {
        console.log(error);
      });
  };

  const searchHandler = (values) => {
    setSearchKey(values.search);
  };

  return (
    <section className="admin">
      <div className="heading">Customer Account</div>
      <div className="buttonLayout">
        <SearchBox onSubmit={searchHandler} />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["none", "none"] }}
        footer={() => (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            noPadding={true}
            totalPage={totalPage}
          />
        )}
        bordered={true}
      />
    </section>
  );
}

export default ManageAccount;
