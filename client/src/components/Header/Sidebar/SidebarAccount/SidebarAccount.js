import React from "react";
import "./SidebarAccount.scss";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

function SidebarAccount({ isAuth, onLogout }) {
  return (
    <div className="sidebar__account">
      <div className="heading">My Account</div>
      <Space direction="vertical" style={{ width: "100%" }}>
        {isAuth ? (
          <Button
            style={{ height: "46px" }}
            size="large"
            block
            onClick={onLogout}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              style={{ height: "46px" }}
              size="large"
              type="primary"
              block
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button style={{ height: "46px" }} size="large" block>
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}

export default SidebarAccount;
