import React, { useState, useEffect } from "react";
import FormProfile from "../../../components/FormProfile/FormProfile";
import { Row, Col, Form } from "antd";
import UploadImage from "../../../components/UploadImage/UploadImage";
import { convertToByteArray } from "../../../helper/convertToByteArray";
import { notify } from "../../../helper/notify";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

function Profile({ idUser, onUpdateInfo }) {
  console.log(idUser);
  const [imageBase64, setImageBase64] = useState("");
  const [imageByteArray, setImageByteArray] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/User?id=${idUser}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.Avatar &&
          setImageBase64(`data:image/png;base64,${result.Avatar}`);
        result.Avatar && setImageByteArray(convertToByteArray(result.Avatar));
        form.setFieldsValue({
          name: result.Name,
          address: result.Address,
          email: result.Email,
          phone: result.Phone,
          birthday: moment(result.Birthday, dateFormat),
        });
        return fetch(
          `${process.env.REACT_APP_HOST_DOMAIN}/api/User?id=${idUser}`,
          {
            method: "GET",
          }
        );
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.Avatar &&
          setImageBase64(`data:image/png;base64,${result.Avatar}`);
        result.Avatar && setImageByteArray(convertToByteArray(result.Avatar));
        onUpdateInfo(result);
      })
      .catch(() => {
        notify(
          "LOAD FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  }, []);

  const updateAccount = (values) => {
    if (imageByteArray.length === 0) {
      notify(
        "CHOOSE AVATAR",
        "Please choose avatar before updating.",
        "warning"
      );
      return;
    }
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_DOMAIN}/api/user/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, avatar: imageByteArray, id: idUser }),
    })
      .then((response) => {
        if (response.ok) {
          notify(
            "UPDATE SUCCESS",
            "You have already update your info.",
            "success"
          );
          setLoading(false);
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        notify(
          "LOAD FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
        setLoading(false);
      });
  };

  return (
    <section className="admin">
      <div className="heading">Profile</div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={{ span: 16, order: 2 }} sm={{ span: 24, order: 2 }}>
          <FormProfile
            loading={loading}
            form={form}
            style={{ maxWidth: 600 }}
            onSubmit={updateAccount}
          />
        </Col>
        <Col lg={{ span: 6, order: 2 }} sm={{ span: 24, order: 1 }}>
          <UploadImage
            imageBase64={imageBase64}
            setImageBase64={setImageBase64}
            setImageByteArray={setImageByteArray}
          />
        </Col>
      </Row>
    </section>
  );
}

const mapStateToProps = (state) => {
  console.log(state.auth.id);
  console.log(state.auth);
  return {
    idUser: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateInfo: (userInfo) => dispatch(actions.authUpdateInfo(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
