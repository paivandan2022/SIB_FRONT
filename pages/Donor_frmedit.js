import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import os from "os";
import { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import api from "../lib/api";
import env from "/env.json";

const { TextArea } = Input;
const { Option } = Select;
const { Text, Link } = Typography;

const Donor_frmedit = () => {
  const [newDonorlist, setnewDonorlist] = useState([]);
  const [newDonor_Blood, setnewDonor_Blood] = useState();
  const [newProvince, setProvince] = useState([]);
  const [newAmpure, setAmpure] = useState([]);
  const [newTumbon, setTumbon] = useState([]);
  const [newZip, setZip] = useState([]);
  const [newProvince_new, setProvince_new] = useState([]);
  const [newAmpure_new, setAmpure_new] = useState([]);
  const [newTumbon_new, setTumbon_new] = useState([]);
  const [newZip_new, setZip_new] = useState([]);
  const [newBloodgroup, setBloodgroup] = useState([]);
  const [newPname, setNewPname] = useState([]);
  const [newSex, setNewSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [strAge, setstrAge] = useState();
  const [newStrBirthday, setStrBirthday] = useState();
  const [checkyear, setCheckyear] = useState();
  const [fullname, setFullname] = useState();
  const [rhName, setRhName] = useState(); //fecth RH

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEject, setIsModalVisibleEject] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [Loading_spin, setLoading_spin] = useState(false);
  const [password, setPassword] = useState();
  const router = useRouter();
  //------------------------------------//

  const [frmOpen] = Form.useForm();
  const [frmEject] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const handleOk = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formData = frmOpen.getFieldsValue();
        console.log("formData----------**", formData);
        const result1 = await api.put(`/Add_donor_frmedit`, {
          ...formData,
          birthday: moment(formData.dob).format("YYYY-MM-DD"),
          postcode: newZip,
          postcode_new: newZip_new,
          image: `${formData.cid}.jpg`,
          dn: formData.donor_no,
          pid: router?.query?.id,
          staff:
            resultLogin.data.pname +
            " " +
            resultLogin.data.fname +
            " " +
            resultLogin.data.lname,
        });
        setIsModalVisible(false);
        setPassword();
        await location.reload();
        window.close();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };
  //----------------------------------//
  const showModalEject = () => {
    setIsModalVisibleEject(true);
  };
  const handleOkEject = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });

    console.log("resultLogin===>", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formDataEject = frmEject.getFieldsValue();
        const formData = frmOpen.getFieldsValue();
        const result1 = await api.post(`/Eject_register`, {
          eject_note: formDataEject.eject_note,
          staff: resultLogin.data.fname + " " + resultLogin.data.lname,
          cid: formData.cid,
          pid: router?.query?.id,
        });
        setIsModalVisibleEject(false);
        setPassword();
        window.close();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisibleEject(false);
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
    setIsModalVisibleEject(false);
  };

  //----------------------------------//
  const showModalAlert = () => {
    console.log("checkyear", checkyear);
    if (checkyear < 17 || checkyear > 70) {
      setIsModalAlert(true);
    } else {
      setIsModalAlert(false);
    }
  };
  //----------------------------------//
  const onCheckaddress = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      const formData = frmOpen.getFieldsValue();
      frmOpen.setFieldsValue({
        addrpart_new: formData.addrpart,
        soipart_new: formData.soipart,
        moopart_new: formData.moopart,
        roadpart_new: formData.roadpart,
        chwpart_new: formData.chwpart,
        amppart_new: formData.amppart,
        tmbpart_new: formData.tmbpart,
        postcode_new: formData.postcode,
      });
      await Fetch_Aumpure_new(formData.chwpart);
      await Fetch_Tumbon_new(formData.amppart);
      await Fetch_Zip_new(formData.tmbpart);
    } else {
      frmOpen.setFieldsValue({
        addrpart_new: "",
        soipart_new: "",
        moopart_new: "",
        roadpart_new: "",
        chwpart_new: "",
        amppart_new: "",
        tmbpart_new: "",
        postcode_new: "",
      });
    }
  };
  const Fetch_frmedit = async (value) => {
    setLoading_spin(true);
    const result = await api.get("/Get_donor_list_open", {
      params: {
        pid: value,
      },
    });
    setnewDonorlist(result.data);
    await Fetch_Aumpure(result.data[0]?.chwpart);
    await Fetch_Tumbon(result.data[0]?.amppart);
    await Fetch_Zip(result.data[0]?.tmbpart);

    await Fetch_Aumpure_new(result.data[0]?.chwpart_new);
    await Fetch_Tumbon_new(result.data[0]?.amppart_new);
    await Fetch_Zip_new(result.data[0]?.tmbpart_new);

    setstrAge(result.data[0]?.age);

    frmOpen.setFieldsValue({
      ...result.data[0],
      donor_phone: result.data[0]?.phone,
      donor_email: result.data[0]?.email,
      job: Number(result.data[0]?.job),
      chwpart: Number(result.data[0]?.chwpart),
      amppart: Number(result.data[0]?.amppart),
      tmbpart: result.data[0]?.tmbpart,
      dob: moment(result.data[0]?.dob),
      age: frmOpen.strAge,
      marrystatus: Number(result.data[0]?.marrystatus),

      chwpart_new:
        newDonorlist[0]?.chwpart_new === null
          ? result.data[0]?.chwpart_new
          : Number(result.data[0]?.chwpart_new),
      amppart_new:
        newDonorlist[0]?.amppart_new === null
          ? result.data[0]?.amppart_new
          : Number(result.data[0]?.amppart_new),
      tmbpart_new: result.data[0]?.tmbpart_new,
    });

    console.log("------------------result", result.data);
    // //Call Get Donor_blood
    Get_Donor_blood(result.data[0]?.donor_no);
    setCheckyear(result.data[0]?.age_year);
    setFullname(result.data[0]?.fullname);
    setLoading_spin(false);
  };

  useEffect(async () => {
    if (router?.query?.id) {
      await fetch_pname();
      await Fetch_Province();
      await Fetch_Province_new();
      await Fetch_Aumpure_new();
      await Fetch_Tumbon_new();
      await Fetch_Zip_new();
      await Fetch_Sex();
      await Fetch_mary();
      await Fetch_occu();
      await Fetch_bloodgroup();
      await fetch_RhName();
      await Fetch_frmedit(router?.query?.id);
    }
    showModalAlert(checkyear);
  }, [router?.query?.id, checkyear]);

  const Get_Donor_blood = async (value) => {
    const result = await api.get("/Get_Donor_Blood", {
      params: {
        donor_no: value,
      },
    });
    // console.log("result?.data", result?.data);
    setnewDonor_Blood(result?.data);
  };
  const fetch_RhName = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhName(result.data[0]);
  };
  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    const txt = result.data;
    setNewPname(txt);
  };
  const Fetch_Sex = async () => {
    const result = await api.get("/Get_sex");
    setNewSex(result.data);
  };
  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setBloodgroup(result.data);
  };
  const Fetch_occu = async () => {
    const result = await api.get("/Get_occu");
    setOccu(result.data);
  };
  const Fetch_mary = async () => {
    const result = await api.get("/Get_mary");
    setMary(result.data);
  };
  // fecth addrees //
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
    setAmpure(result.data);
    setZip("");
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
    setZip(result.data[0]?.zipcode);
    frmOpen.setFieldsValue({
      postcode: result.data[0]?.zipcode,
    });
  };
  // end fecth addrees //
  // --------------------------------------------//
  // new fecth addrees //
  const Fetch_Province_new = async () => {
    const result = await api.get("/Get_Province_new");
    setProvince_new(result.data);
  };
  const Fetch_Aumpure_new = async (value) => {
    const result = await api.get("/Get_Aumpure_new", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setAmpure_new(result.data);
    setZip_new("");
  };
  const Fetch_Tumbon_new = async (value) => {
    const result = await api.get("/Get_Tumbon_new", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon_new(result.data);
  };
  const Fetch_Zip_new = async (value) => {
    const result = await api.get("/Get_Zip_new", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip_new(result.data[0]?.zipcode);
    frmOpen.setFieldsValue({
      postcode_new: result.data[0]?.zipcode,
    });
  };
  //end new fecth addrees //

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
  const columns = [
    {
      title: "ครั้งที่",
      dataIndex: "donor_count",
      key: "donor_count",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "Unitnumber_dot",
      key: "Unitnumber_dot",
    },
    {
      title: "วันที่บริจาคเลือด",
      dataIndex: "donor_date",
      key: "donor_date",
    },
    {
      title: "สถานที่",
      dataIndex: "mobname",
      key: "mobname",
    },
    {
      title: "ถุง",
      dataIndex: "donor_type",
      key: "donor_type",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bag_gr",
      key: "bag_gr",
    },
    {
      title: "ผลการตรวจ",
      dataIndex: "blood_result",
      key: "blood_result",
    },
  ];

  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : ยืนยันผู้บริจาคเลือด</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      
      <Spin tip="Loading..." spinning={Loading_spin} size="large">
        <Form form={frmOpen} Layout="vertical">
          <Layout keyTab="Donor_donation_list">
            <Row justify="start">
              <Col span={22} flex="auto" offset={1}>
                <Card
                  xs={24}
                  lg={24}
                  xl={24}
                  title="ยืนยันผู้บริจาคเลือด"
                  bordered={false}
                >
                  <Row>
                    <Row justify="center" style={{ marginTop: "18px" }}>
                      <Col span={4} >
                        <Card title="" xs={24} lg={24} xl={14} bordered={false}>
                          <Col flex={1}>
                            <Row justify="center" style={{ marginTop: "-40px" }}>
                              <Form.Item>
                                <Avatar
                                  width="75%"
                                  src={`${env.PATH_IMG}/image/${
                                    newDonorlist[0]?.image
                                  }?pathType=2&date=${moment().format(
                                    "HHmmss"
                                  )}`}
                                  size={100}
                                  icon={<UserOutlined />}
                                />
                              </Form.Item>
                            </Row>
                          </Col>
                          <Col flex={2} style={{ marginTop: "-20px" }}>
                            <Row justify="center">
                              {" "}
                              <Form.Item
                                name="donor_no"
                                label="เลขประจำตัวผู้บริจาค"
                                style={{
                                  display: "inline-block",
                                  // width: "100%",
                                }}
                                rules={[{ required: false }]}
                              >
                                <Input
                                  style={{
                                    width: "100%",
                                    // height: "40px",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
                            </Row>
                          </Col>
                          <Col flex={2} style={{ marginTop: "-22px" }}>
                            <Row >
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
                                  style={{
                                    width: "100%",
                                    // height: "40px",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
                              {/* {console.log("newDonorlist",newDonorlist)} */}
                            </Row>
                          </Col>

                          <Col flex={5} style={{ marginTop: "-25px" }}>
                            <Row>
                              <Form.Item
                                label="หมู่เลือด"
                                name="bloodgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกข้อมูล !",
                                  },
                                ]}
                                style={{
                                  display: "inline-block",
                                  marginRight:"2px"
                                }}
                              >
                                <Select
                                  placeholder="กรุ๊ปเลือด"
                                  style={{ width: "100%" }}
                                >
                                  {newBloodgroup?.map((item) => (
                                    <Option
                                      key={item.blood_id}
                                      value={item.blood_name}
                                    >
                                      {item.blood_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              </Row>
                              <Row style={{ marginTop: "-22px" }}>
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
                                </Select>
                              </Form.Item>
                            </Row>
                          </Col>
                        </Card>
                      </Col>

                      <Col span={20}>
                        <Card title="" xs={24} lg={24} xl={14} bordered={false}>
                          <Row style={{ marginTop: "-40px" }}>
                            <Col >
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
                                  // display: "inline-block",
                                  marginRight: "5px",
                                  width: "150px",
                                }}
                              >
                                <Select
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
                                marginLeft: "69px",
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
                                  placeholder="ชื่อจริง"
                                  style={{
                                    width: "175px",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col>
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
                                  placeholder="นามสกุล"
                                  style={{
                                    width: "175px",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
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
                                  placeholder="PREFIX"
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
                                marginLeft: "20px",
                                marginRight: "5px",
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
                              &nbsp;{" "}
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "-48px" }}>
                            <Col flex={2}>
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
                                  // locale={th_TH}
                                />
                              </Form.Item>
                            </Col>
                            <Col flex={2}>
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
                            <Col flex={2}>
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
                            <Col flex={2}>
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
                                  style={{ fontSize: "14px", width: "230px" }}
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
                          <Row style={{ marginTop: "-18px" }}>
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
                                    <Option
                                      key={item.occu_id}
                                      value={item.occu_id}
                                    >
                                      {item.occu_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col style={{ marginLeft: "7px" }}>
                              <Form.Item
                                name="donor_phone"
                                label="โทร"
                                rules={[{ required: false }]}
                              >
                                <Input
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
                                type="email"
                                name="donor_email"
                                label="อีเมลล์"
                                rules={[{ required: false }]}
                              >
                                <Input
                                  placeholder="Email"
                                  style={{
                                    width: "220px",
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
                        </Card>

                        <Card
                          title=""
                          xs={24}
                          lg={24}
                          xl={14}
                          bordered={false}
                          // style={{ marginTop: "-40px" }}
                        >
                          <Row style={{ marginTop: "-45px" }}>
                            <Col flex={2}>
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
                                  {newProvince.map((item) => (
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
                                  {newAmpure?.map((item) => (
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
                                  {newTumbon.map((item) => (
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
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                  }}
                                  placeholder="ไปรษณีย์"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                        <Card
                          title=""
                          xs={24}
                          lg={24}
                          xl={14}
                          bordered={false}
                          style={{ marginTop: "-40px" }}
                        >
                          <Row style={{ marginTop: "-30px" }}>
                            <Col flex={2}>
                              <b style={{ fontSize: "14px" }}>
                                ที่อยู่ปัจจุบัน
                              </b> 
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "5px" }}>
                            <Checkbox onChange={onCheckaddress}>
                              <Text style={{ fontSize: "12px" }} underline>ใช้ที่อยู่ตามบัตรประชาชน</Text>
                            </Checkbox>
                          </Row>

                          <Row style={{ marginTop: "5px" }}>
                            <Col>
                              <Form.Item
                                name="addrpart_new"
                                label="บ้านเลขที่"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกข้อมูล !",
                                  },
                                ]}
                               >
                                <Input
                                  placeholder="บ้านเลขที่"
                                  style={{
                                    width: "50%",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col   style={{
                                marginLeft: "-80px",
                              }}>
                              <Form.Item
                                name="soipart_new"
                                label="ซอย"
                                rules={[{ required: false }]}
                                
                              >
                                <Input
                                  placeholder="ซอย"
                                  style={{
                                    width: "50%",
                                    fontSize: "14px",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col style={{
                                marginLeft: "-80px",
                              }}>
                              <Form.Item
                                name="moopart_new"
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
                            <Col  style={{
                                marginLeft: "-80px",
                              }}>
                              <Form.Item
                                name="roadpart_new"
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
                          <Col style={{
                                marginLeft: "16px",
                              }}>
                              <Form.Item
                                label="จังหวัด"
                                name="chwpart_new"
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
                                  {newProvince.map((item) => (
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

                            <Col >
                              <Form.Item
                                label="อำเภอ"
                                name="amppart_new"
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
                                  {newAmpure?.map((item) => (
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
                            <Col  >
                              <Form.Item
                                label="ตำบล"
                                name="tmbpart_new"
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
                                  {newTumbon.map((item) => (
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
                            <Col >
                              <Form.Item
                                label="ไปรษณีย์"
                                name="postcode_new"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกข้อมูล !",
                                  },
                                ]}
                                
                              >
                                <Input
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                  }}
                                  placeholder="ไปรษณีย์"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <Col span={24} style={{ marginLeft: "20px" }}>
                              <Form.Item
                                name="address_more"
                                label="เพิ่มเติม"
                                // name=""
                                //   rules={[{ required: true,message:'กรุณากรอกข้อมูล !' }]}
                                
                              >
                                <TextArea showCount maxLength={100} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row justify="end">
                            <Col flex={2}>
                              <Row justify="end">
                                <Col>
                                  <Space>
                                    {newDonorlist?.[0]?.status === "1" && (
                                      <Button
                                        type="danger"
                                        shape="round"
                                        title="ยกเลิก"
                                        icon={<UserDeleteOutlined />}
                                        onClick={showModalEject}
                                      >
                                        ยกเลิกการบริจาค
                                      </Button>
                                    )}

                                    <Button
                                      htmlType="submit"
                                      onClick={showModal}
                                      type="primary"
                                      icon={
                                        <VscSaveAs
                                          style={{
                                            fontSize: "14px",
                                            marginRight: "3px",
                                            marginBottom: "-2px",
                                          }}
                                        />
                                      }
                                      style={{
                                        fontSize: "12px",
                                        height: "28px",
                                      }}
                                    >
                                      บันทึกข้อมูล
                                    </Button>
                                  </Space>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </Row>
                </Card>

                <Card
                  title=""
                  xs={24}
                  lg={24}
                  xl={14}
                  bordered={false}
                  style={{ marginTop: "-40px" }}
                >
                  <Row style={{ marginTop: "-40px",marginLeft:"95px" }}>
                    <Col flex={2}>
                      <b style={{ fontSize: "14px" }}>ประวัติการบริจาค</b>{" "}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "20px" }} justify="center">
                    <Col flex={5} span={20}>
                      <Table dataSource={newDonor_Blood} columns={columns} className="xm" bordered size="small"/>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-15px" }} >
                    <Col >
                        <b style={{ fontSize: "12px" ,marginLeft:"405px"}}>
                           <Text underline>หมายเหตุ</Text>
                        </b>
                        &nbsp;
                        <Text type="danger" style={{ fontSize: "12px" }}>
                          ผลตรวจคือ Salne, Papian, Coombs, Anti-A, Anti-B และ
                          HBsAg, TPHA, HIV,HBA-NAT, ALT, HCV, HIVAg ตามลำดับ
                        </Text>
                    
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Layout>
        </Form>

        {/* --------------------------------- */}

        <Modal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false), setPassword();
          }}
          footer={false}
          width={250}
        >
          <Row>
                <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
              </Row>
          <Input.Password
          id="pass"
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={({ target: { value }, keyCode }) => {
              if (keyCode === 13) {
                // 13 คือ enter
                handleOk();
              }
            }}
          />
                        <Row justify="end" style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    setIsModalVisible(false), setPassword();
                  }}
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                >
                  ยกเลิก
                </Button>
                &nbsp;
                <Button
                  type="primary"
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                  onClick={handleOk}
                  disabled={!password}
                >
                  ยืนยัน
                </Button>
              </Row>

          {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Modal>
        {/* ------------------------ */}

        <Modal
          title="ยืนยันรหัสผ่าน"
          visible={isModalVisibleEject}
          onOk={handleOkEject}
          onCancel={() => {
            setIsModalVisibleEject(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          width={250}
        >
          <Input.Password
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={({ target: { value }, keyCode }) => {
              if (keyCode === 13) {
                // 13 คือ enter
                handleOkEject();
              }
            }}
          />
          {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Modal>
        {/* ------------------------ */}
      </Spin>
     
    </>
  );
};

export default Donor_frmedit;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
