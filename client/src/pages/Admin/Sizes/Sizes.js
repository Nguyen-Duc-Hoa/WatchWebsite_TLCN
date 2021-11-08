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

const originData = [
  {
    key: "1",
    id: 1,
    value: 38,
  },
  {
    key: "2",
    id: 2,
    value: 40,
  },
  {
    key: "3",
    id: 3,
    value: 42,
  },
  {
    key: "4",
    id: 4,
    value: 46,
  },
];

function Sizes() {
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
    fetchSizes();
  }, [currentPage, shouldUpdate]);

  const fetchSizes = () => {
    setSpinning(true);
    fetch(
      `${process.env.REACT_APP_HOST_DOMAIN}/api/Sizes?currentPage=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const sizeArray = result.Sizes.map((element) => {
          return {
            key: element.SizeId,
            id: element.SizeId,
            value: element.SizeValue,
          };
        });
        setData(sizeArray);
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

  const updateSizeReq = (type, value, id = 0, extra) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Sizes`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sizeId: id, sizeValue: value }),
    })
      .then((response) => {
        if (response.ok && type === "POST") {
          notify(
            `${type === "POST" ? "ADD" : "EDIT"} SUCCESS`,
            `You have already ${type === "POST" ? "added" : "edited"} a ${
              type === "POST" && "new"
            } size.`,
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

  const deleteSizesReq = () => {
    setSpinning(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Sizes/Delete`, {
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
            "You have already deleted sizes.",
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

  const addSizeHandler = (values) => {
    updateSizeReq("POST", values.value);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const edit = (record) => {
    form.setFieldsValue({
      value: "",
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
    updateSizeReq("PUT", row.value, key, { row, index, newData });
  };

  const deleteHandler = () => {
    if (deletiveArray.current.length === 0) return;
    deleteSizesReq();
  };

  const rowSelection = {
    onChange: (_, selectedRows) => {
      deletiveArray.current = selectedRows.map((ele) => ele.key);
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
      title: "Value (mm)",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value > b.value,
      sortDirections: ["descend"],
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
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
      <div className="heading">Sizes</div>
      <div className="buttonLayout">
        <Space>
          <Popover
            content={
              <Form onFinish={addSizeHandler}>
                <Form.Item name="value" rules={[{ required: true }]}>
                  <Input placeholder="Value (mm)" />
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
            footer={() => (
              <Pagination
                currentPage={currentPage}
                noPadding={true}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            bordered={true}
          />
        </Spin>
      </Form>
    </section>
  );
}

export default Sizes;
