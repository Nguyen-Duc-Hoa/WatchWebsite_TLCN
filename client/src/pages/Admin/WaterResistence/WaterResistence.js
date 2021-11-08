import React, { useState, useRef, useEffect } from "react";
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

function WaterResistence() {
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
    fetchWaterRes();
  }, [currentPage, shouldUpdate]);

  const fetchWaterRes = () => {
    setSpinning(true);
    fetch(
      `${process.env.REACT_APP_HOST_DOMAIN}/api/WaterResistances?currentPage=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const waterResArray = result.WaterRes.map((element) => {
          return {
            key: element.WaterId,
            id: element.WaterId,
            value: element.WaterValue,
          };
        });
        setData(waterResArray);
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

  const updateWaterResReq = (type, value, id = 0, extra) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/WaterResistances`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ waterId: id, waterValue: value }),
    })
      .then((response) => {
        if (response.ok && type === "POST") {
          notify(
            `${type === "POST" ? "ADD" : "EDIT"} SUCCESS`,
            `You have already ${type === "POST" ? "added" : "edited"} a ${
              type === "POST" && "new"
            } water resistance.`,
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

  const deleteWaterResReq = () => {
    setSpinning(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/WaterResistances/Delete`, {
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
            "You have already deleted water resistances.",
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

  const addWaterResHandler = (values) => {
    updateWaterResReq("POST", values.value);
  };

  const handleVisibleChange = (visible) => {
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
    updateWaterResReq("PUT", row.value, key, { row, index, newData });
  };

  const deleteHandler = () => {
    if (deletiveArray.current.length === 0) return;
    deleteWaterResReq();
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
      title: "Value (BAR)",
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
      <div className="heading">Water Resistence</div>
      <div className="buttonLayout">
        <Space>
          <Popover
            content={
              <Form onFinish={addWaterResHandler}>
                <Form.Item name="value" rules={[{ required: true }]}>
                  <Input placeholder="Value (BAR)" />
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

export default WaterResistence;
