import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Popover,
  Popconfirm,
  Form,
  Typography,
  Space,
  Button,
  Input,
  Spin,
} from "antd";
import Pagination from "../../../components/Pagination/Pagination";
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from "react-icons/ai";
import EditTableCell from "../../../components/EditTableCell/EditTableCell";
import { useMergedColumns } from "../../../hook/useMergedColums";
import { notify } from "../../../helper/notify";
import { useForceUpdate } from "../../../hook/useForceUpdate";

function Materials() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [shouldUpdate, forceUpdate] = useForceUpdate();
  const deletiveArray = useRef([]);

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    fetchMaterial();
  }, [currentPage, shouldUpdate]);

  const fetchMaterial = () => {
    setSpinning(true);
    fetch(
      `${process.env.REACT_APP_HOST_DOMAIN}/api/Materials?currentPage=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const materialArray = result.Materials.map((element) => {
          return {
            key: element.MaterialId,
            id: element.MaterialId,
            name: element.MaterialValue,
          };
        });
        setData(materialArray);
        setTotalPage(result.TotalPage);
        setSpinning(false);
      })
      .catch(() => {
        setSpinning(false);
        notify(
          "LOAD FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const updateMaterialReq = (type, name, id = 0, extra) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Materials`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ materialId: id, materialValue: name }),
    })
      .then((response) => {
        if (response.ok && type === "POST") {
          notify(
            `${type === "POST" ? "ADD" : "EDIT"} SUCCESS`,
            `You have already ${type === "POST" ? "added" : "edited"} a ${
              type === "POST" && "new"
            } material.`,
            "success"
          );
          setLoading(false);
          forceUpdate();
        } else if (response.ok && type === "PUT") {
          extra.newData.splice(extra.index, 1, {
            ...extra.newData[extra.index],
            ...extra.row,
          });
          setData(extra.newData);
          setEditingKey("");
          setLoading(false);
        } else {
          return new Promise.reject();
        }
      })
      .catch(() => {
        setLoading(false);
        notify(
          `${type === "POST" ? "ADD" : "EDIT"} FAILED`,
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const deleteMaterialReq = () => {
    setSpinning(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Materials/Delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletiveArray.current),
    })
      .then((response) => {
        if (response.ok) {
          notify(
            "DELETE SUCCESS",
            "You have already deleted materials.",
            "success"
          );
          setSpinning(false);
          setCurrentPage(1);
          forceUpdate();
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        setSpinning(false);
        notify(
          "DELETE FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const addMaterialHandler = (values) => {
    updateMaterialReq("POST", values.name);
  };

  const handleVisibleChange = (visible) => {
    console.log(visible);
    setVisible(visible);
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === key);
    updateMaterialReq("PUT", row.name, key, { row, index, newData });
  };

  const deleteHandler = () => {
    if (deletiveArray.current.length === 0) return;
    deleteMaterialReq();
  };

  const rowSelection = {
    onChange: (_, selectedRows) => {
      deletiveArray.current = selectedRows.map((ele) => ele.key);
      console.log(deletiveArray.current);
    },
  };

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
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              // href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = useMergedColumns(columns, isEditing);

  return (
    <section className="admin">
      <div className="heading">Materials</div>
      <div className="buttonLayout">
        <Space>
          <Popover
            content={
              <Form onFinish={addMaterialHandler}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="Material name" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            }
            placement="leftBottom"
            title="Add here"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Button size="large" type="primary">
              <AiOutlineAppstoreAdd className="icon" /> Add
            </Button>
          </Popover>
          <Button size="large" type="danger" onClick={deleteHandler}>
            <AiTwotoneDelete className="icon" /> Delete
          </Button>
        </Space>
      </div>
      <Form form={form} component={false}>
        <Spin spinning={spinning}>
          <Table
            columns={mergedColumns}
            dataSource={data}
            components={{
              body: {
                cell: EditTableCell,
              },
            }}
            rowClassName="editable-row"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={{ position: ["none", "none"] }}
            bordered={true}
            footer={() => (
              <Pagination
                currentPage={currentPage}
                noPadding={true}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          />
        </Spin>
      </Form>
    </section>
  );
}

export default Materials;
