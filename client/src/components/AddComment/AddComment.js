import React, { useState } from "react";
import { Form, Tooltip, Input, Button, Tag } from "antd";
import Commenting from "../Comment/Comment";
import moment from "moment";

const { TextArea } = Input;

function AddComment({
  setComments,
  replyUserName,
  replyCommentId,
  productId,
  setReplyCommentId,
  setReplyUserName,
  userId,
  token,
  username,
  avatarUser
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    if (!value) {
      return;
    }
    setLoading(true);
    const comment = {
      userId: userId,
      productId: productId,
      content: value.content,
      date: new Date(),
      replyFrom: replyCommentId ? replyCommentId : null,
    };
    fetch("https://localhost:44336/api/Comments/AddComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((result) => {
        setValue("");
        setComments(result);
        setLoading(false);
        form.resetFields();
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let srcAvatar = null
  console.log(avatarUser)
  if(avatarUser !== "null"){
    srcAvatar = `data:image/png;base64,${avatarUser}`
  }else {
    srcAvatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }

  return (
    <Commenting
      avatar={srcAvatar}
      actions={true}
      author={username}
      datetime={
        <Tooltip
          title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment().subtract(1, "days").fromNow()}</span>
        </Tooltip>
      }
      content={
        <Editor
          replyUserName={replyUserName}
          replyCommentId={replyCommentId}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setReplyCommentId={setReplyCommentId}
          setReplyUserName={setReplyUserName}
          loading={loading}
          form={form}
          value={value}
        />
      }
    />
  );
}

export default AddComment;

function Editor({
  handleSubmit,
  handleChange,
  loading,
  value,
  replyUserName,
  setReplyCommentId,
  setReplyUserName,
  form,
}) {
  const handleCancelReply = () => {
    setReplyCommentId();
    setReplyUserName();
  };

  return (
    <Form onFinish={handleSubmit} form={form}>
      {replyUserName && (
        <Form.Item>
          <div>
            Reply from:{" "}
            <Tag color="success" closable onClose={handleCancelReply}>
              {replyUserName}
            </Tag>
          </div>
        </Form.Item>
      )}
      <Form.Item name="content">
        <TextArea rows={4} onChange={handleChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ background: "#000", color: "white" }}
          htmlType="submit"
          loading={loading}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
}
