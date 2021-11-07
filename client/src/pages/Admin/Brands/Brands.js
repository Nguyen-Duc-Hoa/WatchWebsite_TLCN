import React, { useEffect, useState } from "react";
import { Table, Button, Space, Image, Spin } from "antd";
import Pagination from "../../../components/Pagination/Pagination";
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { notify } from "../../../helper/notify";

function Brands({ brands, loading, onFetchBrands, totalPage, onDeleteBrands }) {
  const [currentPage, setCurrentPage] = useState(1);
  let deletiveArray = [];

  useEffect(() => {
    onFetchBrands(currentPage, notify);
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id > b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name > b.name,
      sortDirections: ["descend"],
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (source) => (
        <Image width={160} src={`data:image/svg+xml;base64,${source}`} />
      ),
    },
    {
      title: "Action",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => <Link to={`/admin/Brands/${record.key}`}>Edit</Link>,
    },
  ];

  const rowSelection = {
    onChange: (_, selectedRows) => {
      deletiveArray = selectedRows.map((ele) => ele.key);
    },
    // getCheckboxProps: (record) => ({
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const deleteHandler = () => {
    if (!deletiveArray) return;
    onDeleteBrands(deletiveArray, notify);
  };

  return (
    <section className="admin">
      <div className="heading">Brands</div>
      <div className="buttonLayout">
        <Space>
          <Link to="/admin/Brands/AddBrand">
            <Button size="large" type="primary">
              <AiOutlineAppstoreAdd className="icon" />
              Add
            </Button>
          </Link>
          <Button size="large" type="danger" onClick={deleteHandler}>
            <AiTwotoneDelete className="icon" /> Delete
          </Button>
        </Space>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={brands}
          bordered={true}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{ position: ["none", "none"] }}
          footer={() => (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              noPadding={true}
              totalPage={totalPage}
            />
          )}
        />
      </Spin>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.brand.loading,
    brands: state.brand.brands,
    totalPage: state.brand.totalPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBrands: (currentPage, notify) =>
      dispatch(actions.fetchBrands(currentPage, notify)),
    onDeleteBrands: (deletiveArray, notify) =>
      dispatch(actions.deleteBrands(deletiveArray, notify)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
