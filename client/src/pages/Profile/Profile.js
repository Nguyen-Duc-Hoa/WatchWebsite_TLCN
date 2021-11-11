import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Breadcrumbing from "../../components/Breadcrumb/Breadcrumb";
import FormProfile from "../../components/FormProfile/FormProfile";
import UploadImage from "../../components/UploadImage/UploadImage";
import { convertToByteArray } from "../../helper/convertToByteArray";
import { Form } from "antd";
import moment from "moment";
import "./Profile.scss";
import { notify } from "../../helper/notify";
import * as actions from "../../store/actions/index";

const breadCrumbRoute = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/" },
];

function Profile({
  name,
  address,
  email,
  phone,
  birthday,
  avatar,
  idUser,
  onUpdateInfo,
}) {
  const [imageBase64, setImageBase64] = useState("");
  const [imageByteArray, setImageByteArray] = useState([]);
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageBase64(`data:image/png;base64,${avatar}`);
    setImageByteArray(convertToByteArray(avatar));
    form.setFieldsValue({
      name: (name !== "null" && name) || "",
      address: (address !== "null" && address) || "",
      email: (email !== "null" && email) || "",
      phone: (phone !== "null" && phone) || "",
      birthday: birthday !== "null" && moment(birthday, dateFormat),
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
          return fetch(
            `${process.env.REACT_APP_HOST_DOMAIN}/api/User?id=${idUser}`,
            {
              method: "GET",
            }
          );
        } else {
          throw Error;
        }
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
        setLoading(false);
      });
  };

  return (
    <section className="userProfile">
      <Breadcrumbing route={breadCrumbRoute} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={{ span: 16, order: 2 }} sm={{ span: 24, order: 2 }}>
          <FormProfile
            form={form}
            style={{ maxWidth: 600 }}
            onSubmit={updateAccount}
            loading={loading}
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
  return {
    name: state.auth.name,
    address: state.auth.address,
    email: state.auth.email,
    phone: state.auth.phone,
    birthday: state.auth.birthday,
    avatar: state.auth.avatar,
    idUser: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateInfo: (userInfo) => dispatch(actions.authUpdateInfo(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
