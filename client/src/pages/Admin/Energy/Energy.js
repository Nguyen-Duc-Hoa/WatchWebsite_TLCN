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

function Energy() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const deletiveArray = useRef([])

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    fetchEnergy();
  }, [currentPage]);

  const fetchEnergy = () => {
    setSpinning(true);
    fetch(
      `${process.env.REACT_APP_HOST_DOMAIN}/api/Energies?currentPage=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const energyArray = result.Energies.map((element) => {
          return {
            key: element.EnergyId,
            id: element.EnergyId,
            name: element.EnergyValue,
          };
        });
        setData(energyArray);
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

  const updateEnergyReq = (type, name, id = 0, extra) => {
    console.log({ energyId: id, energyValue: name });
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Energies`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ energyId: id, energyValue: name }),
    })
      .then((response) => {
        if (response.ok && type === "POST") {
          return fetch(
            `${process.env.REACT_APP_HOST_DOMAIN}/api/Energies?currentPage=${currentPage}`,
            {
              method: "GET",
            }
          );
        } else if (response.ok && type === "PUT") {
          console.log("edit success");
          extra.newData.splice(extra.index, 1, {
            ...extra.newData[extra.index],
            ...extra.row,
          });
          setData(extra.newData);
          setEditingKey("");
        } else {
          console.log("promise reject");
          return new Promise.reject();
        }
      })
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((result) => {
        if (result) {
          const energyArray = result.Energies.map((element) => {
            return {
              key: element.EnergyId,
              id: element.EnergyId,
              name: element.EnergyValue,
            };
          });
          setData(energyArray);
          setTotalPage(result.TotalPage);
        }
        setLoading(false);
        notify(
          "ADD SUCCESS",
          "You have already added a new energy.",
          "success"
        );
      })
      .catch(() => {
        notify(
          "ADD FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const deleteEnergyReq = () => {
    console.log(deletiveArray.current)
    setSpinning(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/Energies/Delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletiveArray.current),
    })
      .then((response) => {
        console.log("respones", response);
        if (response.ok) {
          return fetch(
            `${process.env.REACT_APP_HOST_DOMAIN}/api/Energies?currentPage=1`,
            {
              method: "GET",
            }
          );
        }
        return Promise.reject();
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const energyArray = result.Energies.map((element) => {
          return {
            key: element.EnergyId,
            id: element.EnergyId,
            name: element.EnergyValue,
          };
        });
        setData(energyArray);
        setTotalPage(result.TotalPage);
        setSpinning(false);
        notify("DELETE SUCCESS", "You have already deleted energy.", "success");
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

  const addEnergyHandler = (values) => {
    updateEnergyReq("POST", values.name);
  };

  const save = async (key) => {
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === key);
    console.log(row);
    updateEnergyReq("PUT", row.name, key, { row, index, newData });
  };

  const deleteHandler = () => {
    console.log(deletiveArray.current)
    if (deletiveArray.current.length === 0) return;
    deleteEnergyReq();
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

  const rowSelection = {
    onChange: (_, selectedRows) => {
      console.log(selectedRows)
      deletiveArray.current = selectedRows.map((ele) => ele.key);
      console.log(deletiveArray.current)
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
      <div className="heading">Watch Enegery</div>
      <div className="buttonLayout">
        <Space>
          <Popover
            content={
              <Form onFinish={addEnergyHandler}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="Energy name" />
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

export default Energy;
