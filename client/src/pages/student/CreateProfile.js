import { DatePicker, Form, Input, message, Radio, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, Card } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const CreateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [details, setDetails] = useState({});

  const getFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onFinish = async (values) => {
    const base64 = await convertToBase64(values.photourl[0].originFileObj);
    const resumebSE64 = await convertToBase64(values.resume[0].originFileObj);
    setDetails({ ...values, photourl: base64, resume: resumebSE64 });
    await axios
      .post("http://localhost:8080/api/v1/user/create-profile", {
        ...details,
        userId: user?._id,
      })
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((error) => {
        message.error(error);
      });
  };
  return (
    <Card className="col-md-10 col-sm-11 col-12 mx-auto py-3 px-2 my-5">
      <h4>Create Profile</h4>
      <Form
        onFinish={onFinish}
        layout={"vertical"}
        className="d-flex justify-content-between flex-wrap"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your name!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name={"dob"}
          label="Date of Birth"
          rules={[{ required: true, message: "Please input your DOB!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone No"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="upload profile photo"
          // valuePropName="fileList"
          className="col-md-3 col-sm-5 col-10 mx-2"
          name={"photourl"}
          getValueFromEvent={getFile}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/png ,image/jpeg"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="sscschoolname"
          label="10th School Name"
          rules={[
            { required: true, message: "Please input your school name!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="class10th"
          label="10th %"
          rules={[{ required: true, message: "Please input your 10th %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="hsccollege"
          label="12th college"
          rules={[
            { required: true, message: "Please input your 12th college!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="class12th"
          label="12th %"
          rules={[{ required: true, message: "Please input your 12th %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="engcollege"
          label="Engineering College"
          rules={[{ required: true, message: "Please input your college!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="branch"
          label="Engineering Branch"
          rules={[{ required: true, message: "Please input your branch!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="Computer Engineering">
              Computer Engineering
            </Select.Option>
            <Select.Option value="IT Engineering">IT Engineering</Select.Option>
            <Select.Option value="Electronics Engineering">
              Electronics Engineering
            </Select.Option>
            <Select.Option value="Electronics & Telecommunication Engineering">
              Electronics & Telecommunication Engineering
            </Select.Option>
            <Select.Option value="Bio-Medical Engineering">
              Bio-Medical Engineering
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="engineering_division"
          label="Engineering Division"
          rules={[{ required: true, message: "Please input your division!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="engineeringpercent"
          label="Engineering %"
          rules={[{ required: true, message: "Please input your %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="engineeringAggrpercent"
          label="Engineering Aggregate CGPA"
          rules={[{ required: true, message: "Please input your cgpa!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="liveKt"
          label="Live KT"
          rules={[{ required: true, message: "Please input your kt!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="upload resume"
          // valuePropName="fileList"
          className="col-md-3 col-sm-5 col-10 mx-2"
          name={"resume"}
          getValueFromEvent={getFile}
        >
          <Upload listType="picture-card" maxCount={1} accept="application/pdf">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <div className="col-12 text-center">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreateProfile;
