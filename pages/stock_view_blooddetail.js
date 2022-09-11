import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { RiUserSearchLine } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";

import { MdManageSearch, MdRefresh } from "react-icons/md";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { Layout, Print } from "../components";
import api from "../lib/api";
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const Stock_view_blooddetail = () => {
  const [frmOpen] = Form.useForm();
  const [frmSetBloodValue] = Form.useForm();
  const [frm_seacrh] = Form.useForm();
  const [frm_data] = Form.useForm();
  const [frm_data2] = Form.useForm();

  const [newProvince, setProvince] = useState([]);
  const [newAmpure, setAmpure] = useState([]);
  const [newTumbon, setTumbon] = useState([]);
  const [newZip, setZip] = useState([]);
  const [newBloodgroup, setBloodgroup] = useState([]);
  const [newPname, setNewPname] = useState([]);
  const [newSex, setNewSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [strAge, setstrAge] = useState();
  const [rhName, setRhName] = useState();
  const printComponent = useRef(null);

  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);

  const [isModalPassSetValue, setIsModalPassSetValue] = useState(false);
  const [passVal, setPassVal] = useState();
  const [dataBlood, setDataBlood] = useState();

  const [data_blood, setData_blood] = useState();
  const [data_donor, setData_donor] = useState();
  const [data_separate, setData_separate] = useState();
  const [data_history, setData_history] = useState();
  const [donor_no, setDonor_no] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalPassValueBlood = (id) => {
    setIsModalPassSetValue(true);

    const dataBloodVal = data_separate.find((item) => item.id == id);
    setDataBlood(dataBloodVal);

    setTimeout(() => {
      document.getElementById("passVal").focus();
    }, 0);
  };

  const setBloodValue = async () => {
    // ส่ง user_name and password
    console.log(dataBlood.blood_no);
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passVal,
    });
    try {
      if (resultLogin.data.id_user) {
        const frm = frmSetBloodValue.getFieldsValue();
        const result = await api.put(`updateBloodValue`, {
          blood_value: frm[dataBlood.id].blood_value,
          id: dataBlood.id,
        });
        console.log("/sss", dataBlood.blood_no);
        if (result.data.message === "success") {
          Modal.success({
            title: "แจ้งเตือน",
            content: "ทำรายการสำเร็จ!!",
          });
          separeat(dataBlood.blood_no);
          setPassVal();
          setIsModalPassSetValue(false);
        }
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        separeat(dataBlood.blood_no);
        setPassVal();
        setIsModalPassSetValue(false);
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      setPassVal();
      setIsModalPassSetValue(false);
      separeat(dataBlood.blood_no);
    }
  };
  //------------------------------------//
  const showModal = async () => {
    setIsModalVisible(true);

    const frmData = frm_data2.getFieldsValue();
    console.log("=>>>>", frmData.donation);
    try {
      const result_2 = await api.get("/Get_Donor_Blood", {
        params: {
          donor_no: frmData.donation,
        },
      });
      setData_history(result_2.data);
      Fetch_frmedit(frmData.donation);
    } catch (error) {
      Modal.error({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
  };
  //----------------------------------//
  const Fetch_frmedit = async (value) => {
    console.log("valueee", value);

    const result = await api.get("/get_donor_modal", {
      params: {
        donor_no: value,
      },
    });
    await Fetch_Aumpure(result.data[0]?.chwpart);
    await Fetch_Tumbon(result.data[0]?.amppart);
    await Fetch_Zip(result.data[0]?.tmbpart);

    setstrAge(result.data[0]?.age);

    frmOpen.setFieldsValue({
      ...result.data[0],
      donor_phone: result.data[0]?.phone,
      donor_email: result.data[0]?.email,
      job: Number(result.data[0]?.job),
      chwpart: Number(result.data[0]?.chwpart),
      amppart: Number(result.data[0]?.amppart),
      tmbpart: result.data[0]?.tmbpart,
      dob: moment(result.data[0]?.birthday),
      age: frmOpen.strAge,
      marrystatus: Number(result.data[0]?.marrystatus),
      blood_rh: result.data[0]?.bloodgroup_rh,
    });
  };

  const showModalPass = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const handleOk = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    try {
      if (resultLogin.data.id_user) {
        const formData = frmOpen.getFieldsValue();
        console.log("formData----------**", formData);
        const result1 = await api.put(`/donor_frmedit_modal`, {
          ...formData,
          birthday: moment(formData.dob).format("YYYY-MM-DD"),
          postcode: newZip,
          dn: formData.donor_no,
          pid: data_donor?.pid,
          staff:
            resultLogin.data.pname +
            " " +
            resultLogin.data.fname +
            " " +
            resultLogin.data.lname,
        });
        setIsModalPassword(false);
        setPassword();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalPassword(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
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

  const setDOB = (dateValue) => {
    const a = moment().add(543, "year");
    const b = moment(dateValue, "YYYY-MM-DD");
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setstrAge(Age);
  };

  // -------------------------------------------------------------------------------

  const Search_unit_no = async () => {
    const frm = frm_seacrh.getFieldsValue();
    try {
      const result = await api.get("/seacrh_unit_no", {
        params: {
          keyword: frm.keyword,
        },
      });
      setData_blood(result.data[0]);
      console.log("---Search_unit_no----<>", result.data[0]);
      frm_data.setFieldsValue({
        unit_no_show: result.data[0][0].unit_no,
        bag: result.data[0][0].donor_type,
        blood_group: `${result.data[0][0].dorngro}${result.data[0][0].dornrh} `,
        date_collet: moment(result.data[0][0].donor_date)
          .add(543, "year")
          .format("DD-MM-YYYY"),
      });

      if (result.data[0][0].donor_no == undefined) {
        console.log("nooooooif", result.data[0][0].donor_no);
      } else {
        frm_data2.setFieldsValue({
          donation: result.data[0][0].donor_no,
        });
        setDonor_no(result.data[0][0].donor_no);
      }

      
      separeat(frm.keyword);
      setFields();
    } catch (error) {
      Modal.error({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
      setFields();
    }
  };
  const separeat = async (value) => {
    try {
      const result = await api.get("/separate_blood", {
        params: {
          keyword: value,
        },
      });
      console.log("-setData_separate--->result_", result.data[0]);

      const dataUpdate = {};
      result.data[0].forEach((item) => {
        dataUpdate[item.id] = {
          blood_value: item.blood_value,
        };
      });
      frmSetBloodValue.setFieldsValue({
        ...dataUpdate,
      });
      setData_separate(result.data[0]);

      setFields();
    } catch (error) {
      Modal.error({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูลถุงเลือด...",
      });
      setFields();
    }
  };
  const setFields = () => {
    frm_seacrh.setFieldsValue({
      keyword: "",
    });
    const el = document.getElementById("unit_no_search");
    el.focus();
  };

  const refresh = () => {
    frm_seacrh.resetFields();
    frm_data.resetFields();
    frm_data2.resetFields();
    frmSetBloodValue.resetFields();
    frmOpen.resetFields();
    setData_blood();
    setData_donor();
    setData_separate();
    setData_history();
    setDataBlood();
    setPassVal();
    setDonor_no();

  };

  //result
  const columns = [
    {
      title: <p style={{ fontSize: "14px" }}>Saline</p>,
      dataIndex: "Saline",
      key: "Saline",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>Papian</p>,
      dataIndex: "Papian",
      key: "Papian",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>Coomb</p>,
      dataIndex: "Coombs",
      key: "Coombs",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>Anti-A</p>,
      dataIndex: "antia",
      key: "antia",
      align: "center",

      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>Anti-B</p>,
      dataIndex: "antib",
      key: "antib",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>TPHA</p>,
      dataIndex: "TPHA",
      key: "TPHA",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HBsAg</p>,
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HIV</p>,
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HBVNAT</p>,
      dataIndex: "HBVNAT",
      key: "HBVNAT",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HCVNAT</p>,
      dataIndex: "HCVNAT",
      key: "HCVNAT",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>ALT</p>,
      dataIndex: "alt",
      key: "alt",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HCV</p>,
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>HIVAg</p>,
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: <p style={{ fontSize: "14px" }}>Result</p>,
      dataIndex: "result",
      key: "result",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
  ];
  // data blood
  const columns_ = [
    {
      dataIndex: "id",
      align: "center",
      width: 20,
      render: (text, record) => (
        <>
          <Print data={record} />
        </>
      ),
    },
    {
      title: "Unit Number",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "Component",
      dataIndex: "component_name",
      key: "component_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "ปริมาณ",
      dataIndex: "blood_value",
      key: "blood_value",
      align: "center",
      width: 60,
      render: (text, record) => (
        <>
          <Form.Item name={[record.id, "blood_value"]} noStyle>
            <Input
              id="blood_value"
              style={{ width: "100%" }}
              onKeyDown={({ target: { value }, keyCode }) => {
                if (keyCode === 13) {
                  // 13 คือ enter
                  showModalPassValueBlood(record.id);
                }
              }}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "unit_exp",
      key: "unit_exp",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "สถานะถุง",
      dataIndex: "bl_status_name",
      key: "bl_status_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "ผู้จองเลือด",
      dataIndex: "patient_name",
      key: "patient_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "วันที่จ่าย",
      dataIndex: "date_use",
      key: "date_use",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
  ];
  //his
  const columns_modal = [
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

  useEffect(async () => {
    await fetch_pname();
    await Fetch_Province();
    await Fetch_Sex();
    await Fetch_mary();
    await Fetch_occu();
    await Fetch_bloodgroup();
    await fetch_RhName();
  }, []);

  return (
    <>
      <Layout keyTab="stock_view_blooddetail">
        <div>
          <Head>
            <title>SIBSOFT : ตรวจสอบข้อมูลถุงเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Card style={{ marginTop: "10px" }}>
          <Row justify="center">
            <Col span={22}>
              <Form form={frm_seacrh}>
                <Row>
                  <Form.Item label="เลขที่ถุงเลือด" name="keyword">
                    <Input id="unit_no_search" onPressEnter={Search_unit_no} />
                  </Form.Item>
                  &nbsp;
                  <Button
                    style={{
                      fontSize: "12px",
                      height: "28px",
                      marginLeft: "5px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                    }}
                    icon={
                      <MdManageSearch
                        style={{
                          fontSize: "16px",
                          marginRight: "3px",
                          marginBottom: "-3px",
                        }}
                      />
                    }
                    onClick={() => Search_unit_no()}
                  >
                    ค้นหา
                  </Button>
                  &nbsp;
                  <Button
                    style={{
                      fontSize: "12px",
                      height: "28px",
                      marginLeft: "5px",
                      backgroundColor: "orange",
                      color: "white",
                    }}
                    icon={
                      <MdRefresh
                        style={{
                          fontSize: "16px",
                          marginRight: "3px",
                          marginBottom: "-3px",
                        }}
                      />
                    }
                    onClick={refresh}
                  >
                    เริ่มใหม่
                  </Button>
                </Row>
              </Form>
              <Row>
                <Form form={frm_data} layout="inline">
                  <Form.Item label="เลขที่ถุงเลือด" name="unit_no_show">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ถุง" name="bag" style={{ width: "10%" }}>
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="หมู่เลือด"
                    name="blood_group"
                    style={{ width: "15%" }}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item label="วันที่บริจาค" name="date_collet">
                    <Input />
                  </Form.Item>
                </Form>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Form form={frm_data2} layout="inline">
                  <Form.Item
                    label="ผู้บริจาค"
                    name="donation"
                    style={{ paddingLeft: "25px" }}
                  >
                    <Input />
                  </Form.Item>
                  <Button
                    style={{
                      fontSize: "12px",
                      height: "28px",
                      marginLeft: "5px",
                    }}
                    icon={
                      <RiUserSearchLine
                        style={{
                          fontSize: "16px",
                          marginRight: "3px",
                          marginBottom: "-3px",
                        }}
                      />
                    }
                    type="primary"
                    onClick={showModal}
                    disabled={!donor_no}
                  >
                    ประวัติผู้บริจาค
                  </Button>
                </Form>
              </Row>
              <Row justify="center" style={{ marginTop: "10px" }}>
                <Col span={22}>
                  <Form>
                    <Form.Item label="ผลตรวจ">
                      <Table
                        size="small"
                        className="xm"
                        bordered
                        // style={{ border: "1px solid" }}
                        columns={columns}
                        dataSource={data_blood}
                        pagination={false}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row style={{ marginTop: "-5px" }}>
                <Col span={24}>
                  <Form form={frmSetBloodValue}>
                    <Table
                      size="small"
                      className="xm"
                      bordered
                      columns={columns_}
                      dataSource={data_separate}
                      pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                    />
                  </Form>
                </Col>
              </Row>
              {/* </Card> */}
            </Col>
          </Row>
        </Card>
      </Layout>
      <Modal
        title=""
        visible={isModalVisible}
        footer={false}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        style={{ top: 30 }}
        width={1000}
      >
        <Form form={frmOpen} Layout="vertical">
          <Row justify="start" style={{ marginTop: "-15px" }}>
            <Col span={22} flex="auto" offset={1}>
              <Row style={{ marginTop: "25px" }}>
                <Col span={6} style={{ marginTop: "-20px" }}>
                  <Row style={{ marginLeft: "-26px" }}>
                    <Form.Item
                      name="donor_no"
                      label="donor no"
                      style={
                        {
                          // display: "inline-block",
                          // width: "100%",
                        }
                      }
                      rules={[{ required: false }]}
                    >
                      <Input
                        size="small"
                        style={{
                          width: "100%",
                          // height: "40px",
                          fontSize: "14px",
                        }}
                      />
                    </Form.Item>
                  </Row>

                  <Row style={{ marginTop: "-25px" }}>
                    <Form.Item
                      name="cid"
                      label="cid"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกข้อมูล !",
                        },
                      ]}
                      style={
                        {
                          //  display: "inline-block",
                          // width: "100%",
                        }
                      }
                    >
                      {/* <div  style={{ marginTop: "-22px" }}> */}
                      <Input
                        size="small"
                        style={{
                          width: "100%",
                          // height: "40px",
                          fontSize: "14px",
                        }}
                      />
                      {/* </div> */}
                    </Form.Item>
                    {/* {console.log("newDonorlist",newDonorlist)} */}
                  </Row>

                  <Row style={{ marginTop: "-25px" }}>
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
                        placeholder="กรุ๊ปเลือด"
                        size="small"
                        style={{ width: "100px" }}
                      >
                        {newBloodgroup?.map((item) => (
                          <Option key={item.blood_id} value={item.blood_name}>
                            {item.blood_name}
                          </Option>
                        ))}
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
                        placeholder="RH"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        {rhName?.map((item) => (
                          <Option key={item.rh_id} value={item.rh_shot_name}>
                            {item.rh_shot_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={18} style={{ marginTop: "-20px" }}>
                  <Row>
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
                      >
                        <Select
                          size="small"
                          placeholder="เลือกคำนำหน้า"
                          style={{
                            fontSize: "14px",
                            width: "85px",
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

                    <Col style={{ marginLeft: "20px" }}>
                      <Form.Item
                        name="fname"
                        label="ชื่อจริง"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกข้อมูล !",
                          },
                        ]}
                      >
                        <Input
                          size="small"
                          placeholder="ชื่อจริง"
                          style={{
                            width: "150px",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col style={{ marginLeft: "5px" }}>
                      <Form.Item
                        name="lname"
                        label="นามสกุล"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกข้อมูล !",
                          },
                        ]}
                        style={
                          {
                            //display: "inline-block",
                          }
                        }
                      >
                        <Input
                          size="small"
                          placeholder="นามสกุล"
                          style={{
                            width: "150px",

                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                      &nbsp;
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-45px" }}>
                    <Col>
                      <Form.Item
                        name="pname_en"
                        label="Prefix"
                        style={{
                          // display: "inline-block",
                          marginLeft: "30px",
                        }}
                        rules={[{ required: false }]}
                      >
                        <Select
                          size="small"
                          placeholder="PREFIX"
                          // size="large"
                          style={{ fontSize: "14px", width: "85px" }}
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

                    <Col style={{ marginLeft: "5px" }}>
                      <Form.Item
                        name="fname_en"
                        label="First name"
                        style={
                          {
                            // display: "inline-block",
                            // marginRight: "5px",
                          }
                        }
                        rules={[{ required: false }]}
                      >
                        <Input
                          size="small"
                          placeholder="First name"
                          style={{
                            width: "150px",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                      &nbsp;
                    </Col>

                    <Col style={{ marginLeft: "5px" }}>
                      <Form.Item
                        name="lname_en"
                        label="Last name"
                        style={
                          {
                            // display: "inline-block",
                          }
                        }
                        rules={[{ required: false }]}
                      >
                        <Input
                          size="small"
                          placeholder="Last name"
                          style={{
                            width: "150px",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                      &nbsp;{" "}
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-50px" }}>
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
                          size="small"
                          onChange={setDOB}
                          format="DD-MM-YYYY"
                          // size="large"
                          locale={th_TH}
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
                          size="small"
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
                          size="small"
                          placeholder="เลือกเพศ"
                          // size="large"
                          style={{ width: "100%" }}
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
                          size="small"
                          placeholder="เลือกสถานะ"
                          // size="large"
                          style={{ width: "230px" }}
                          dropdownMatchSelectWidth={false}
                          placement={"bottomLeft"}
                        >
                          {newMary.map((item) => (
                            <Option key={item.status_id} value={item.status_id}>
                              {item.status_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-25px" }}>
                    <Col>
                      <Form.Item
                        label="อาชีพ"
                        name="job"
                        rules={[{ required: false }]}
                        style={
                          {
                            // display: "inline-block",
                            // width: "100%",
                            // margin: "0 8px",
                          }
                        }
                      >
                        <Select
                          size="small"
                          placeholder="เลือกอาชีพ"
                          dropdownMatchSelectWidth={false}
                          placement={"bottomLeft"}
                          style={{ width: "150px" }}
                        >
                          {newOccu.map((item) => (
                            <Option key={item.occu_id} value={item.occu_id}>
                              {item.occu_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col style={{ marginLeft: "5px" }}>
                      <Form.Item
                        name="donor_phone"
                        label="เบอร์ติดต่อ"
                        rules={[{ required: false }]}
                        style={
                          {
                            // display: "inline-block",
                            // width: "100%",
                          }
                        }
                      >
                        <Input
                          size="small"
                          placeholder="โทรศัพท์"
                          style={{
                            width: "120px",
                            // height: "40px",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col style={{ marginLeft: "5px" }}>
                      <Form.Item
                        type="email"
                        name="donor_email"
                        label="อีเมลล์"
                        rules={[{ required: false }]}
                        style={
                          {
                            // display: "inline-block",
                            // width: "55%",
                          }
                        }
                      >
                        <Input
                          size="small"
                          placeholder="Email"
                          style={{
                            width: "180px",
                            // height: "40px",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col span={24} style={{ marginTop: "-15px" }}>
                  <Row style={{ marginTop: "-18px" }}>
                    <Col flex={2}>
                      <b style={{ fontSize: "16px" }}>ที่อยู่ปัจจุบัน</b>
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
                        style={
                          {
                            // display: "inline-block",
                            // width: "15%",
                          }
                        }
                      >
                        <Input
                          size="small"
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
                        style={{
                          //  display: "inline-block",
                          marginRight: "5px",
                        }}
                      >
                        <Input
                          size="small"
                          placeholder="ซอย"
                          style={{
                            width: "100%",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col>
                      <Form.Item
                        name="moopart"
                        label="หมู่"
                        rules={[{ required: false }]}
                        style={{
                          //    display: "inline-block",
                          marginRight: "5px",
                        }}
                      >
                        <Input
                          size="small"
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
                          size="small"
                          placeholder="ถนน"
                          style={{
                            width: "100%",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-22px", marginLeft: "15px" }}>
                    <Col>
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
                          size="small"
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
                          size="small"
                          onChange={Fetch_Tumbon}
                          style={{
                            width: "150px",

                            fontSize: "14px",
                          }}
                          dropdownMatchSelectWidth={false}
                          placement={"bottomLeft"}
                          placeholder="อำเภอ"
                        >
                          {newAmpure?.map((item) => (
                            <Option key={item.AMPHUR_ID} value={item.AMPHUR_ID}>
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
                          size="small"
                          onChange={Fetch_Zip}
                          style={{
                            width: "150px",

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
                          size="small"
                          style={{
                            width: "100px",
                            // height: "40px",
                            fontSize: "14px",
                          }}
                          placeholder="ไปรษณีย์"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-20px", marginLeft: "18px" }}>
                    <Col flex={2}>
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
                    <Col>
                      <Space>
                        <Button
                          size="small"
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
                          onClick={showModalPass}
                          style={{ fontSize: "12px", height: "28px" }}
                        >
                          บันทึกข้อมูล
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ marginTop: "-18px", marginLeft: "68px" }}>
                <Col flex={2}>
                  <b style={{ fontSize: "16px" }}>ประวัติการบริจาค</b>{" "}
                </Col>
              </Row>
              <Row style={{ marginBottom: "20px" }} justify="center">
                <Col flex={5} span={20}>
                  <Table
                    className="xm"
                    bordered
                    columns={columns_modal}
                    dataSource={data_history}
                    size="small"
                    pagination={{
                      hideOnSinglePage: true,
                      showSizeChanger: false,
                    }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "-10px", marginLeft: "68px" }}>
                <Col flex={5}>
                  <Row>
                    <b style={{ fontSize: "12px" }}>
                      <Text underline>หมายเหตุ</Text>
                    </b>
                    &nbsp;
                    <Text type="danger" style={{ fontSize: "12px" }}>
                      ผลตรวจคือ Salne, Papian, Coombs, Anti-A, Anti-B และ HBsAg,
                      TPHA, HIV,HBA-NAT, ALT, HCV, HIVAg ตามลำดับ
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>

        <Row justify="end" style={{ marginTop: "-10px" }}>
          <Button
            size="small"
            key="submit"
            type="primary"
            danger
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            ปิด
          </Button>
        </Row>
      </Modal>
      {/* /-----------------------/ */}
      <Modal
        visible={isModalPassword}
        onCancel={() => {
          setIsModalPassword(false), setPassword();
        }}
        width={250}
        footer={false}
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
              setIsModalPassword(false), setPassword();
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
      </Modal>

      {/* /-----------passvalue------------/ */}
      <Modal
        visible={isModalPassSetValue}
        onCancel={() => {
          setIsModalPassSetValue(false), setPassVal();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passVal"
          placeholder="กรุณากรอกรหัสผ่าน"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ width: "100%" }}
          value={passVal}
          onChange={(e) => setPassVal(e.target.value)}
          onKeyDown={({ target: { value }, keyCode }) => {
            if (keyCode === 13) {
              // 13 คือ enter
              setBloodValue();
            }
          }}
        />

        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPassSetValue(false), setPassVal();
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
            onClick={setBloodValue}
            disabled={!passVal}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_view_blooddetail;

// export async function getServerSideProps(context) {
//   const computerName = os.hostname();
//   return {
//     props: { computerName }, // will be passed to the page component as props
//   };
// }
