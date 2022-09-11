import { PlusCircleTwoTone } from "@ant-design/icons";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import Link from "next/link";
import os from "os";
import { useEffect, useState } from "react";
import env from "/env.json";

import api from "../lib/api";

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const Guest_regis_donor = () => {
  const [newDonorlist, setnewDonorlist] = useState([]);
  const [newBloodgroup, setBloodgroup] = useState([]); //fecth กรุ๊ปเลือด
  const [newPname, setNewPname] = useState([]); //fecth คำนำหน้า
  const [newSex, setNewSex] = useState([]); //fecth เพศ
  const [newOccu, setOccu] = useState([]); //fecth อาชีพ
  const [newMary, setMary] = useState([]); //fecth สถานะ
  const [strAge, setstrAge] = useState(); //fecth อายุ
  const [rhName, setRhName] = useState(); //fecth RH
  const [Spinloading, setSpinLoading] = useState(false);

  //facth ที่อยู่ตามบัตรประชาชน
  const [Province, setProvince] = useState([]);
  const [Ampure, setAmpure] = useState([]);
  const [Tumbon, setTumbon] = useState([]);

  const [newStrBirthday, setStrBirthday] = useState();
  const [loadingUploadPic, setLoadingUploadPic] = useState(false);

  //------------------------------------//
  const [frmOpen] = Form.useForm();
  const [checkpname, setCheckpname] = useState();

  const contentStyle = {
    height: "160px",
  };

  useEffect(async () => {
    await fetch_pname();
    await Fetch_Sex();
    await Fetch_mary();
    await Fetch_occu();
    await Fetch_bloodgroup();
    await Fetch_Province();
    await fetch_RhName();
  }, []);

  const Ok = async () => {
    try {
      const formData = frmOpen.getFieldsValue();
      console.log("AddformData", formData);
      const result1 = await api.post(`/Add_guest_donor`, {
        ...formData,

        birthday: moment(formData.dob).format("YYYY-MM-DD"),
        image: `${formData.cid}.jpg`,
        dn: formData.donor_no,
      });
      await api.post("/image-upload-donor", image, {
        params: { id: `${formData.cid}.jpg` },
      });
      console.log("result1", result1.data);
      Modal.success({
        title: "แจ้งเตือน",
        content: "ลงทะเบียนสำเร็จ!!",
      });
      frmOpen.resetFields();
      setstrAge();
      setImageUrl();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };

  //----------------------------------//

  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    setNewPname(result.data);
    console.log("fetch_pname", result.data);
  };
  const Fetch_Sex = async () => {
    const result = await api.get("/Get_sex");
    setNewSex(result.data);
    console.log("Fetch_Sex", result.data);
  };
  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setBloodgroup(result.data);
    console.log("Fetch_bloodgroup", result.data);
  };
  const fetch_RhName = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhName(result.data[0]);
  };
  const Fetch_occu = async () => {
    const result = await api.get("/Get_occu");
    setOccu(result.data);
    console.log("Fetch_occu", result.data);
  };
  const Fetch_mary = async () => {
    const result = await api.get("/Get_mary");
    setMary(result.data);
    console.log("Fetch_mary", result.data);
  };

  //facth ที่อยู่ตามบัตรประชาชน
  const Fetch_Province = async () => {
    const result = await api.get("/Get_Province");
    setProvince(result.data);
  };
  const Fetch_Aumpure = async (value) => {
    const result = await api.get("/Get_Aumpure", {
      params: {
        PROVINCE_ID: value,
      },
    });
    console.log("Fetch_Aumpure", result.data);
    setAmpure(result.data);

    frmOpen.setFieldsValue({
      amppart: "",
      tmbpart: "",
      postcode: "",
    });
  };
  const Fetch_Tumbon = async (value) => {
    const result = await api.get("/Get_Tumbon", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon(result.data);
  };
  const Fetch_Zip = async (value) => {
    const result = await api.get("/Get_Zip", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    frmOpen.setFieldsValue({
      postcode: result.data[0]?.zipcode,
    });
  };
  // end fecth addrees //
  // --------------------------------------------//

  const setDOB = (dateValue) => {
    console.log("dateValue------------------>", dateValue);
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");

    setStrBirthday(b.toString());
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setstrAge(Age);
  };

  //-------------Upload FILE---------------//
  const [fileType, setFileType] = useState("png");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      // setLoading(true);
      setLoadingUploadPic(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info", info);
      const type = info.file.type?.split("/")[1];
      if (type === "jpeg") {
        setFileType("jpg");
      } else {
        setFileType(type);
      }
      const formData = new FormData();
      formData.append(
        "my-image-file",
        info.file.originFileObj,
        info.file.originFileObj.name
      );
      setImage(formData);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoadingUploadPic(false);
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  //----------------------------------------------------//

  return (
    <>
      <Spin tip="Loading..." spinning={Spinloading} size="large">
        <Row style={{ marginBottom: "-15px" }}>
          <Col span={24}>
            <Carousel autoplay dotPosition={"top"}>
              <div>
                <h3 className="contentStyle_imageCarousel">
                  <img
                    width={"100%"}
                    src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                  />
                </h3>
              </div>
              <div>
                <h3 className="contentStyle_imageCarousel">
                  {" "}
                  <img
                    width={"100%"}
                    src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                  />
                </h3>
              </div>
              <div>
                <h3 className="contentStyle_imageCarousel">
                  {" "}
                  <img
                    width={"100%"}
                    src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                  />
                </h3>
              </div>
              <div>
                <h3 className="contentStyle_imageCarousel">
                  {" "}
                  <img
                    width={"100%"}
                    src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                  />
                </h3>
              </div>
            </Carousel>
          </Col>
        </Row>
        <Form form={frmOpen} onFinish={Ok} Layout="horizontal">
          <div>
            <Head>
              <title>SIBSOFT : ลงทะเบียนผู้บริจาคเลือด</title>
              <meta property="og:title" content="My page title" key="title" />
            </Head>
          </div>
          <Row>
            <Col span={22} offset={1}>
              <Card span={24} style={{ marginTop: "17px" }}>
                <Row style={{ marginTop: "-17px" }}>
                  <Col>
                    <h style={{ fontSize: "14px" }}>ลงทะเบียนผู้บริจาคเลือด</h>
                  </Col>
                </Row>
                <Row justify="start" style={{ marginTop: "18px" }}>
                  <Col span={5} style={{ marginTop: "5px" }}>
                    <Row justify="center">
                      <Col>
                        <Form.Item
                          name="image"
                          // style={{
                          //   marginLeft: "-20px",
                          //   marginTop: "15px",
                          // }}
                        >
                          <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            customRequest={dummyRequest}
                          >
                            <Spin spinning={loadingUploadPic}>
                              {imageUrl ? (
                                <Avatar
                                  src={imageUrl}
                                  alt="avatar"
                                  size={100}
                                />
                              ) : (
                                <div>
                                  <Tooltip
                                    placement="right"
                                    title="คลิกเพิ่มรูปภาพ"
                                  >
                                    <Avatar
                                      size={100}
                                      icon={
                                        <MdOutlineAddPhotoAlternate
                                          style={{
                                            marginBottom: "-4px",
                                          }}
                                        />
                                      }
                                      src={`${env.PATH_IMG}/image/${
                                        newDonorlist?.image
                                      }?pathType=2&date=${moment().format(
                                        "HHmmss"
                                      )}`}
                                    />
                                  </Tooltip>
                                  {loading}
                                </div>
                              )}
                            </Spin>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row justify="center">
                      <Col style={{ marginTop: "-22px" }}>
                        <Form.Item
                          name="cid"
                          label="เลขประจำตัวประชาชน"
                          
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                          style={{
                            display: "inline-block",
                            // width: "100%",
                          }}
                        >
                          <Input
                          maxLength="13"
                            onKeyDown={({ target: { value }, keyCode }) => {
                              if (keyCode === 32) {
                                Search();
                              }
                            }}
                            style={{
                              width: "100%",
                              // height: "40px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                        {/* {console.log("newDonorlist",newDonorlist)} */}
                      </Col>
                    </Row>

                    <Row justify="center">
                      <Col style={{ marginTop: "-2px" }}>
                        <Row>
                          <Form.Item
                            label="หมู่ของกรุ๊ปเลือด"
                            name="bloodgroup"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Select
                              // onChange={(e) => setCheckgroup(e)}
                              placeholder="กรุ๊ปเลือด"
                              style={{ width: "80px%" }}
                            >
                              {newBloodgroup?.map((item) => (
                                <Option
                                  key={item.blood_id}
                                  value={item.blood_name}
                                >
                                  {item.blood_name}
                                </Option>
                              ))}
                              <Option key="no" value="ไม่ทราบ">
                                ไม่ทราบ
                              </Option>
                            </Select>
                          </Form.Item>
                          &nbsp;
                          <Form.Item
                            label="RH"
                            name="blood_rh"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Select
                              // onChange={(e) => setCheckrh(e)}
                              placeholder="RH"
                              style={{ width: "100%" }}
                            >
                              {rhName?.map((item) => (
                                <Option
                                  key={item.rh_id}
                                  value={item.rh_shot_name}
                                >
                                  {item.rh_shot_name}
                                </Option>
                              ))}
                              <Option key="no" value="ไม่ทราบ">
                                ไม่ทราบ
                              </Option>
                            </Select>
                          </Form.Item>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={19}>
                    <Row style={{ marginTop: "-30px" }}>
                      <Col>
                        <Form.Item
                          name="pname"
                          label="คำนำหน้า"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                          style={{
                            marginRight: "5px",
                            width: "150px",
                          }}
                        >
                          <Select
                            // // // onChange={(e) => setCheckpname(e)}
                            placeholder="เลือกคำนำหน้า"
                            style={{
                              width: "120px",
                              fontSize: "14px",
                            }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                          >
                            {newPname.map((item) => (
                              <Option
                                key={item.prefix_id_th}
                                value={item.pname_th}
                              >
                                {item.pname_th}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        &nbsp;{" "}
                      </Col>

                      <Col
                        style={{
                          marginLeft: "87px",
                          marginRight: "5px",
                        }}
                      >
                        <Form.Item
                          name="fname"
                          label="ชื่อ"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Input
                            // onChange={(e) => setCheckfname(e.target.value)}
                            placeholder="ชื่อจริง"
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                        &nbsp;{" "}
                      </Col>

                      <Col
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        <Form.Item
                          name="lname"
                          label="นามสกุล"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Input
                            // onChange={(e) => setChecklname(e.target.value)}
                            placeholder="นามสกุล"
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                        &nbsp;
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-40px" }}>
                      <Col
                        style={{
                          marginLeft: "40px",
                          marginRight: "5px",
                        }}
                      >
                        <Form.Item
                          name="pname_en"
                          label="Title"
                          rules={[{ required: false }]}
                        >
                          <Select
                            placeholder="Title"
                            // size="large"
                            style={{ width: "120px" }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                          >
                            {newPname.map((item) => (
                              <Option
                                key={item.prefix_id_en}
                                value={item.pname_en}
                              >
                                {item.pname_en}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        &nbsp;{" "}
                      </Col>

                      <Col>
                        <Form.Item
                          name="fname_en"
                          label="Name"
                          rules={[{ required: false }]}
                        >
                          <Input
                            placeholder="Name"
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                        &nbsp;
                      </Col>

                      <Col
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        <Form.Item
                          name="lname_en"
                          label="Sername"
                          rules={[{ required: false }]}
                        >
                          <Input
                            placeholder="Sername"
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                        &nbsp;
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-48px", marginLeft: "81px" }}>
                      <Col>
                        <Form.Item
                          name="dob"
                          label="วัน-เดือน-ปีเกิด"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                          style={{
                            display: "inline-block",
                            marginRight: "5px",
                            width: "120px",
                          }}
                        >
                          <DatePicker
                            onChange={setDOB}
                            format="DD-MM-YYYY"
                            // size="large"
                            locale={th_TH}
                          />
                        </Form.Item>
                      </Col>

                      <Col style={{ marginLeft: "25px" }}>
                        <Form.Item
                          label="อายุ"
                          style={{
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        >
                          <Input
                            placeholder="อายุ"
                            style={{
                              width: "143px",
                              // height: "40px",
                              fontSize: "14px",
                            }}
                            value={strAge}
                            disabled
                          />
                        </Form.Item>
                      </Col>

                      <Col style={{ marginLeft: "25px" }}>
                        <Form.Item
                          label="เพศ"
                          name="sex"
                          style={{
                            display: "inline-block",
                            width: "80px",
                            // margin: "0 8px",
                            marginRight: "5px",
                          }}
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Select
                            // onChange={(e) => setChecksex(e)}
                            placeholder="เลือกเพศ"
                            // size="large"
                            style={{ fontSize: "14px", width: "100%" }}
                          >
                            {newSex.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col style={{ marginLeft: "29px" }}>
                        <Form.Item
                          label="สถานะ"
                          name="marrystatus"
                          rules={[{ required: false }]}
                          style={{
                            display: "inline-block",
                            // width: "calc(35% - 8px)",
                          }}
                        >
                          <Select
                            placeholder="เลือกสถานะ"
                            // size="large"
                            style={{ fontSize: "14px", width: "210px" }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                          >
                            {newMary.map((item) => (
                              <Option
                                key={item.status_id}
                                value={item.status_id}
                              >
                                {item.status_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-18px", marginLeft: "33px" }}>
                      <Col>
                        <Form.Item
                          label="อาชีพ"
                          name="job"
                          rules={[{ required: false }]}
                        >
                          <Select
                            placeholder="เลือกอาชีพ"
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                            style={{ width: "170px" }}
                          >
                            {newOccu.map((item) => (
                              <Option key={item.occu_id} value={item.occu_id}>
                                {item.occu_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col style={{ marginLeft: "7px" }}>
                        <Form.Item
                          name="donor_phone"
                          label="เบอร์ติดต่อ"
                          rules={[{ required: false }]}
                        >
                          <Input
                          maxLength="10"
                            placeholder="โทรศัพท์"
                            style={{
                              width: "120px",
                              // height: "40px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col style={{ marginLeft: "12px" }}>
                        <Form.Item
                         
                          name="donor_email"
                          label="อีเมลล์"
                          rules={[{ required: false }]}
                        >
                          <Input
                          type="email"
                            placeholder="Email"
                            style={{
                              width: "210px",
                              // height: "40px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-15px" }}>
                      <Col flex={2}>
                        <hr />
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-3px" }}>
                      <Col>
                        <b style={{ fontSize: "14px" }}>
                          ที่อยู่ตามบัตรประชาชน
                        </b>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "5px" }}>
                      <Col>
                        <Form.Item
                          name="addrpart"
                          label="บ้านเลขที่"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Input
                            // onChange={(e) => setCheckaddrpart(e.target.value)}
                            placeholder="บ้านเลขที่"
                            style={{
                              width: "50%",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        style={{
                          marginLeft: "-80px",
                        }}
                      >
                        <Form.Item
                          name="soipart"
                          label="ซอย"
                          rules={[{ required: false }]}
                        >
                          <Input
                            placeholder="ซอย"
                            style={{
                              width: "100px",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        <Form.Item
                          name="moopart"
                          label="หมู่"
                          rules={[{ required: false }]}
                        >
                          <Input
                            placeholder="หมู่"
                            style={{
                              width: "50%",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        style={{
                          marginLeft: "-80px",
                        }}
                      >
                        <Form.Item
                          name="roadpart"
                          label="ถนน"
                          rules={[{ required: false }]}
                        >
                          <Input
                            placeholder="ถนน"
                            style={{
                              width: "100%",
                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-20px" }}>
                      <Col
                        style={{
                          marginLeft: "16px",
                        }}
                      >
                        <Form.Item
                          label="จังหวัด"
                          name="chwpart"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Select
                            onChange={Fetch_Aumpure}
                            style={{
                              width: "150px",
                              fontSize: "14px",
                            }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                            // size="large"
                            placeholder="จังหวัด"
                          >
                            {Province.map((item) => (
                              <Option
                                key={item.PROVINCE_ID}
                                value={item.PROVINCE_ID}
                              >
                                {item.PROVINCE_NAME}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col>
                        <Form.Item
                          label="อำเภอ"
                          name="amppart"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Select
                            onChange={Fetch_Tumbon}
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                            placeholder="อำเภอ"
                          >
                            {Ampure?.map((item) => (
                              <Option
                                key={item.AMPHUR_ID}
                                value={item.AMPHUR_ID}
                              >
                                {item.AMPHUR_NAME}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label="ตำบล"
                          name="tmbpart"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Select
                            onChange={Fetch_Zip}
                            style={{
                              width: "175px",
                              fontSize: "14px",
                            }}
                            dropdownMatchSelectWidth={false}
                            placement={"bottomLeft"}
                            placeholder="ตำบล"
                          >
                            {Tumbon.map((item) => (
                              <Option
                                key={item.DISTRICT_CODE}
                                value={item.DISTRICT_CODE}
                              >
                                {item.DISTRICT_NAME}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label="ไปรษณีย์"
                          name="postcode"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกข้อมูล !",
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => setCheckpostcode(e.target.value)}
                            style={{
                              width: "80px",
                              fontSize: "14px",
                            }}
                            placeholder="ไปรษณีย์"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row justify="end">
                  <Col>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        icon={<PlusCircleTwoTone />}
                        //onClick={() => Modal.confirm(Ok)}
                      >
                        ลงทะเบียน
                      </Button>
                    </Space>
                  </Col>
                  <Col style={{ paddingLeft: "10px" }}>
                    <Space>
                      <Link href="/">
                        <Button
                          // type="danger"
                          htmlType="submit"
                          shape="round"
                          // icon={<PlusCircleTwoTone />}

                          //onClick={() => Modal.confirm(Ok)}
                        >
                          กลับสู่หน้าหลัก
                        </Button>
                      </Link>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export default Guest_regis_donor;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
