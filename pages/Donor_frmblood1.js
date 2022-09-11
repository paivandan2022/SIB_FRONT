import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Typography,
} from "antd";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import ReactToPrint from "react-to-print";
import api from "../lib/api";

const { Option } = Select;
const { Text } = Typography;
const { Content, Footer } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;

function onChangeprinter(checked) {
  console.log(`switch to ${checked}`);
}

const Donor_frmblood = () => {
  const [frmlistdata] = Form.useForm();
  const [frmOpen] = Form.useForm();
  const [newStaff, setStaff] = useState([]);
  const [valuelasttime, setValuelasttime] = useState(1);
  const [valueproblem, setValueproblem] = useState(1);
  const [valuedetail, setValuedetail] = useState(1);
  const [valueheart, setValueheart] = useState(1);
  const [valueblood, setValueblood] = useState(1);
  const [valueHandL, setValueHandL] = useState(1);
  const [valueHB, setValueHB] = useState(1);
  const [newMobile, setMobile] = useState([]);
  const [newBagtype, setBagtype] = useState([]);
  const [newBloodlist, setBloodlist] = useState([]);
  const [newLastblood, setLastblood] = useState([]);
  const [newDonor_last_exception, setDonor_last_exception] = useState([]);
  const [newDonor_donation_datail, setDonor_donation_datail] = useState([]);
  const [password, setPassword] = useState();
  const [data_update_blood, setData_update_blood] = useState();
  const [donor_num, setDonor_num] = useState();
  const [queslist, setQueslist] = useState(); //TB questionnaire_list

  const [isModalVisible, setIsModalVisible] = useState(false);
  const printComponent = useRef(null);

  const printComponent2 = useRef(null);

  const [isModaPassAns, setIsModalPassAns] = useState(false);
  const [passwordAns, setPasswordAns] = useState();
  const [frmQuestion] = Form.useForm();

  const router = useRouter();

  const showModalPassAns = () => {
    setIsModalPassAns(true);
    setTimeout(() => {
      document.getElementById("passAns").focus();
    }, 500);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  useEffect(async () => {
    if (router?.query?.id) {
      fetch_Staff();
      await fetch_questionnaire_list();
      await fetch_Bagtype();
      await fetch_donation_datail();
      await fetch_last_exception();
      await Fetch_frmblood(router?.query?.id);
      await showdata();
      await fetch_Lastblood();
      await Fetch_data_blood(newBloodlist[0]?.pid_donor);
      donor_count();
      await fetch_Mobile();
    }
  }, [router?.query?.id, newBloodlist[0]?.pid_donor]);

  const handleOk = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);
    // try {
    if (resultLogin.data.id_user) {
      const formData = frmOpen.getFieldsValue();

      const Chk_unit_no = await api.post(`/Chk_unit_no`, {
        unit_no: formData.unit_no,
        dn: newBloodlist[0]?.dn,
      });
      console.log("Chk_unit_no", Chk_unit_no.data[0]);

      if (Chk_unit_no.data[0]?.unit_no) {
        Modal.error({
          title: "Unit No. !!!!",
          content: "เลขที่ถุงเลือดซ้ำ",
        });
        frmOpen.setFieldsValue({
          unit_no: "",
        });
      } else {
        console.log("formData----------**", formData);
        const result1 = await api.put(`/Add_donor_blood`, {
          ...formData,
          dn: newBloodlist[0]?.dn,
          pid: newBloodlist[0]?.pid,
          pid_donor: newBloodlist[0]?.pid_donor,
          donor_no: newBloodlist[0]?.donor_no,
        });
        setIsModalVisible(false);
        setPassword();
        // location.reload();
        window.close();
      }
    } else {
      Modal.error({
        title: "Password invalid",
        content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
      });
    }
    setIsModalVisible(false);
    // }
    // catch (error) {
    //   Modal.error({
    //     title: "Error",
    //     content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
    //   });
    // }
  };

  const showdata = async (cid) => {
    console.log("newBloodlist", newBloodlist);
    const userData = newBloodlist.find((item) => item.cid === cid);
    frmlistdata.setFieldsValue({
      ...userData,
    });
  };

  const fetch_questionnaire_list = async () => {
    const result = await api.get("/questionnaire_list");
    console.log("q", result.data);

    setQueslist(result.data);
  };

  const fetch_donation_datail = async () => {
    const result = await api.get("/Get_donor_donation_detail");
    setDonor_donation_datail(result.data);
  };
  const fetch_last_exception = async () => {
    const result = await api.get("/Get_donor_last_exception");
    setDonor_last_exception(result.data);
    console.log("fetch_last_exception", result.data);
  };
  const fetch_Lastblood = async () => {
    const result = await api.get("/Get_donor_last_blood");
    setLastblood(result.data);
    // console.log("fetch_Lastblood", result.data);
  };
  const fetch_Bagtype = async () => {
    const result = await api.get("/Get_bagtype");
    setBagtype(result.data);
    console.log("---*-*-*-*", result.data);
  };
  const fetch_Mobile = async () => {
    const result = await api.get("/Get_Mobile");
    setMobile(result.data);

    frmOpen.setFieldsValue({
      place: result.data[0].MOBCODE,
    });
  };
  const fetch_Staff = async () => {
    const result = await api.get("/Get_staff");
    setStaff(result.data);
  };
  const onChangelasttime = (e) => {
    console.log("onChangelasttime radio checked", e.target.value);
    setValuelasttime(e.target.value);
  };
  const onChangeheart = (e) => {
    console.log("onChangeheart radio checked", e.target.value);
    setValueheart(e.target.value);
  };
  const onChangeproblem = (e) => {
    console.log("onChangeproblem radio checked", e.target.value);
    setValueproblem(e.target.value);
  };
  const onChangedetail = (e) => {
    console.log("onChangedetail radio checked", e.target?.value);
    setValuedetail(e.target?.value);
  };
  const onChangeblood = (e) => {
    console.log("onChangeblood radio checked", e.target.value);
    setValueblood(e.target.value);
  };
  const onChangeHandL = (e) => {
    console.log("onChangeHandL radio checked", e.target.value);
    setValueHandL(e.target.value);
  };
  const onChangeHB = (e) => {
    console.log("onChangeHB radio checked", e.target.value);
    setValueHB(e.target.value);
  };
  const Fetch_frmblood = async (value) => {
    const result = await api.get("/Get_donor_list_open", {
      params: {
        pid: value,
      },
    });

    frmOpen.setFieldsValue({
      ...result.data[0],
      // place: newMobile[0].MOBCODE,
    });
    setBloodlist(result.data);
  };
  const Fetch_data_blood = async () => {
    // console.log(newBloodlist[0]?.pid_donor);
    console.log("test=>>", newBloodlist[0]);

    const result = await api.get("/Get_data_blood", {
      params: {
        pid_donor: newBloodlist[0]?.pid_donor,
        pid: newBloodlist[0]?.pid,
      },
    });
    console.log("result111", result);
    setValuedetail(result.data[0]?.donation_datail);
    frmOpen.setFieldsValue({
      ...result.data[0],
      blood_type: String(result.data[0]?.blood_type),
      last_blood: Number(result.data[0]?.last_blood),
      last_exception: Number(result.data[0]?.last_exception),
      donation_datail: Number(result.data[0]?.donation_datail),
      medic: Number(result.data[0]?.medic),
      under_volume: Number(result.data[0]?.under_volume),
      high_volume: Number(result.data[0]?.high_volume),
      discard: Number(result.data[0]?.discard),
      pulse: Number(result.data[0]?.pulse),
      blood_depth: Number(result.data[0]?.blood_depth),
      heart: Number(result.data[0]?.heart),
      hb_normal: Number(result.data[0]?.hb_normal),
      donation_datail_note: result.data[0]?.donation_datail_note,
      donation_datail_hn: result.data[0]?.donation_hn,
      donation_datail_fname: result.data[0]?.donation_fname,
      donation_datail_lname: result.data[0]?.donation_lname,
    });
    console.log("Fetch_data_blood", result?.data[0]);

    setData_update_blood(result?.data[0]);
  };
  console.log("valuedetail", data_update_blood?.donation_datail);
  const donor_count = () => {
    let list = [];
    for (let i = 0; i <= 100; i++) {
      list.push(i);
    }
    setDonor_num(list);
  };

  const columnQuestList = [
    {
      title: "คำถาม",
      dataIndex: "quest_Name",
      key: "quest_Name",
      render: (text, record, index) => {
        return (
          <>
            {record.quest_topic !== 1 ? (
              <h>{record.quest_Name}</h>
            ) : (
              <b>{record.quest_Name}</b>
            )}
          </>
        );
      },
    },
    {
      title: "คำตอบ",
      dataIndex: "",
      key: "",
      width: 150,
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            {record.quest_topic !== 1 ? (
              <Form.Item
                initialValue={record.quest_default_values}
                style={{
                  marginTop: "-17px",
                  marginBottom: "-14px",
                  marginLeft: "0.5px",
                }}
                name={[record.quest_id, "ans"]}
              >
                {/* <Checkbox.Group options={options} defaultValue={["ใช่"]} checked={["ใช่"]}/> */}
                <Radio.Group defaultValue={record.quest_default_values}>
                  <Radio value={1}>ใช่</Radio>
                  <Radio value={0}>ไม่ใช่</Radio>
                </Radio.Group>
              </Form.Item>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: "เพิ่มเติม",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return (
          <>
            {record.quest_topic == 2 || record.quest_topic == 3 ? (
              <Form.Item
                initialValue={""}
                style={{
                  marginTop: "-15px",
                  marginBottom: "-14px",
                  marginLeft: "0.5px",
                }}
                name={[record.quest_id, "question_more"]}
              >
                <Input
                  placeholder="ระบุข้อมูลเพิ่มเติม"
                  size="small"
                  style={{
                    height: "22px",
                    fontSize: "12px",
                    border: "2px solid #DF7861",
                  }}
                />
              </Form.Item>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const save = async () => {
    const frmData = frmQuestion.getFieldValue();
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordAns,
    });
    const staff = resultLogin.data.user_name;
    console.log("resultLogin==>", resultLogin.data.user_name);
    setIsModalPassAns(false);
    setPasswordAns();

    const keyList = Object.keys(frmData);
    const ansList = Object.values(frmData);

    const resultKey = [];
    const resultAns = [];
    let data = [];

    keyList.forEach((key) => {
      resultKey.push(key);
    });

    ansList.forEach((key) => {
      resultAns.push(key);
    });

    for (let i = 0; i < resultKey.length; i++) {
      const item = resultKey[i];
      const itemAns = resultAns[i];

      data.push({
        id: item,
        ans: itemAns.ans,
        more: itemAns.question_more,
        dn: newBloodlist[0]?.dn,
        staff: staff,
      });
    }

    const result = await api.put(`/Add_questionnaire`, {
      ...data,
    });
    console.log("result", result);
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const idOK = document.getElementById("ok");
        if (idOK) {
          idOK.click();
          window.removeEventListener("keydown", handleKeyDown);
        }
      }
    };
    const closeModal = () => {
      Modal.success({
        title: "Successful",
        content: "บันทึกข้อมูลแบบสอบถามสำหรับผู้บริจาคโลหิตสำเร็จ",
        onCancel: (close) => {
          close();
        },
        onOk: (close) => {
          close();
        },
        okButtonProps: { id: "ok" },
      });
    };

    if (result.data.message === "success") {
      closeModal();
      window.addEventListener("keydown", handleKeyDown);
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : ลงทะเบียนเลือด</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>

      <Content style={{ padding: "0 100px", margin: "50px 0" }}>
        <div className="site-card-wrapper">
          <Tabs type="card" style={{ marginTop: "-34px" }}>
            <TabPane tab="ข้อมูลผู้บริจาค" key="1">
              <Col span={24}>
                <Card bordered={false} style={{ marginTop: "-14px" }}>
                  <Row justify="center" align="middle">
                    <Col span={24}>
                      <Space direction="horizontal">
                        <h3>
                          <Text underline>รหัสผู้บริจาค </Text>
                          <Text strong className="font-color">
                            &nbsp;{newBloodlist[0]?.donor_no} &nbsp;
                          </Text>
                          <Text underline>เลขประจำตัว </Text>
                          <Text strong className="font-color">
                            &nbsp; {newBloodlist[0]?.cid}&nbsp;
                          </Text>
                          <Text underline>ชื่อ-นามสกุล </Text>
                          <Text strong className="font-color">
                            &nbsp;{newBloodlist[0]?.fullname} &nbsp;
                          </Text>
                        </h3>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Form form={frmOpen}>
                <Row justify="center">
                  <Col span={12}>
                    <Card
                      title="หน่วยบริจาค"
                      bordered={false}
                      style={{ marginTop: "-30px" }}
                    >
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            name="pid"
                            style={{
                              display: "none",
                            }}
                            rules={[{ required: true }]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                                display: "none",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label="ครั้งที่แล้ว"
                            rules={[{ required: true }]}
                            style={{
                              marginTop: "-25px",
                            }}
                          >
                            {data_update_blood?.donor_count == undefined
                              ? "ยังไม่เคยบริจาค"
                              : data_update_blood?.donor_count}
                            &nbsp; สถานที่ : &nbsp;
                            {data_update_blood?.MOBNAME == undefined
                              ? "ไม่ระบุ"
                              : data_update_blood?.MOBNAME}
                          </Form.Item>
                          <Form.Item
                            label="สถานที่"
                            name="place"
                            rules={[{ required: true }]}
                            style={{
                              marginTop: "-25px",
                            }}
                          >
                            <Select
                              placeholder="สถานที่"
                              style={{
                                width: "50%",
                                height: "25px",
                                fontSize: "14px",
                                textAlign: "center",
                              }}
                            >
                              {newMobile.map((item) => (
                                <Option key={item.MOBCODE} value={item.MOBCODE}>
                                  {item.MOBNAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item
                            label="บริจาคครั้งที่"
                            name="donor_count"
                            rules={[{ required: true }]}
                            style={{
                              marginTop: "-15px",
                            }}
                          >
                            <Select
                              placeholder="บริจาคครั้งที่"
                              style={{
                                width: "30%",
                                height: "25px",
                                fontSize: "14px",
                                textAlign: "center",
                              }}
                            >
                              {donor_num?.map((value) => (
                                <Option key={value} value={value}>
                                  {value}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                    <Card
                      title="ครั้งที่แล้วบริจาค"
                      bordered={false}
                      style={{ marginTop: "-45px" }}
                    >
                      <Form.Item
                        name="last_blood"
                        rules={[{ required: true }]}
                        initialValue={1}
                        style={{
                          width: "calc(100% - 8px)",
                          marginTop: "-15px",
                        }}
                      >
                        <Radio.Group
                          onChange={onChangelasttime}
                          value={valuelasttime}
                        >
                          {newLastblood.map((item) => (
                            <Radio key={item.id} value={item.id}>
                              {item.type_blood}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Card>

                    <Card
                      title="การบริจาคครั้งที่ผ่านมา"
                      bordered={false}
                      style={{ marginTop: "-50px" }}
                    >
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            name="last_exception"
                            rules={[{ required: true }]}
                            initialValue={1}
                            style={{
                              display: "",
                              width: "calc(100% - 8px)",
                              marginTop: "-15px",
                            }}
                          >
                            <Radio.Group
                              onChange={onChangeproblem}
                              value={valueproblem}
                            >
                              {newDonor_last_exception?.map((item) => (
                                <Radio key={item.id} value={item.id}>
                                  {item.last_exception}
                                </Radio>
                              ))}
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item
                            name="last_exception_note"
                            rules={[{ required: false }]}
                            style={{
                              display: "",
                              width: "calc(100% - 8px)",
                              marginTop: "-15px",
                              textAlign: "center",
                            }}
                          >
                            {valueproblem === 2 ? (
                              <Input
                                style={{ width: 400, marginLeft: 40 }}
                                maxLength="50"
                                placeholder="เหตุผล"
                              />
                            ) : null}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    <Card
                      title="รายละเอียดการบริจาค"
                      bordered={false}
                      style={{ marginTop: "-95px" }}
                    >
                      <Form.Item
                        name="donation_datail"
                        rules={[{ required: true }]}
                        style={{
                          width: "calc(100% - 8px)",
                          marginTop: "-15px",
                        }}
                        initialValue={1}
                      >
                        <Radio.Group
                          onChange={onChangedetail}
                          value={valuedetail}
                        >
                          {newDonor_donation_datail.map((item) => (
                            <Radio key={item.id} value={item.id}>
                              {item.donate}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                      <Row style={{ marginTop: "-29px" }}>
                        <Form.Item
                          label="HN"
                          name="donation_datail_hn"
                          rules={[{ required: false }]}
                        >
                          {valuedetail == "3" ? (
                            <Input
                              size="small"
                              style={{ width: 150 }}
                              maxLength="50"
                              placeholder="hn"
                            />
                          ) : null}
                        </Form.Item>
                      </Row>
                      <Row style={{ marginTop: "-27px" }}>
                        <Col span={10}>
                          <Form.Item
                            label="ชื่อ"
                            name="donation_datail_fname"
                            rules={[{ required: false }]}
                          >
                            {valuedetail == "3" ? (
                              <Input
                                size="small"
                                style={{ width: 150 }}
                                maxLength="50"
                                placeholder="ชื่อ"
                              />
                            ) : null}
                          </Form.Item>
                        </Col>

                        <Col span={10}>
                          <Form.Item
                            label="นามสกุล"
                            name="donation_datail_lname"
                            rules={[{ required: false }]}
                          >
                            {valuedetail == "3" ? (
                              <Input
                                size="small"
                                style={{ width: 150 }}
                                maxLength="50"
                                placeholder="นามสกุล"
                              />
                            ) : null}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-27px" }}>
                        <Form.Item
                          label="รายละเอียด"
                          name="donation_datail_note"
                          rules={[{ required: false }]}
                        >
                          {valuedetail == "3" ? (
                            <Input
                              size="small"
                              style={{ width: 300 }}
                              maxLength="50"
                              placeholder="รายละเอียด"
                            />
                          ) : null}
                        </Form.Item>
                      </Row>
                    </Card>

                    <Card
                      title="หมายเหตุอื่นๆ"
                      bordered={false}
                      style={{
                        marginTop: valuedetail == "3" ? "-50px" : "-127px",
                      }}
                    >
                      <Row>
                        <Form.Item
                          label="Deferred due to"
                          name="defer"
                          rules={[{ required: false }]}
                          style={{
                            width: "calc(100%)",
                            margin: "0% 0px",
                            marginTop: "-15px",
                          }}
                        >
                          <Input style={{ width: 300, marginLeft: 0 }} />
                        </Form.Item>
                      </Row>
                      <Form.Item
                        label="กินยาที่มีผลต่อเกล็ดเลือด"
                        name="medic"
                        rules={[{ required: false }]}
                        style={{
                          display: "",
                          width: "calc(100% - 200px)",
                          margin: "2% 0px",
                          marginTop: "-1px",
                          textAlign: "center",
                        }}
                        initialValue={0}
                      >
                        <Radio.Group
                          defaultValue={0}
                          style={{ marginLeft: "-1px" }}
                        >
                          <Radio value={0}>ไม่ใช่</Radio>
                          <Radio value={1}>ใช่</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="Under volume"
                        name="under_volume"
                        rules={[{ required: false }]}
                        style={{
                          display: "",
                          width: "calc(100% - 140px)",
                          margin: "2% 0px",
                          marginTop: "-20px",
                          textAlign: "center",
                        }}
                        initialValue={0}
                      >
                        <Radio.Group defaultValue={0}>
                          <Radio value={0}>ไม่ใช่</Radio>
                          <Radio value={1}>ใช่</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item
                        label="Hight volume"
                        name="high_volume"
                        rules={[{ required: false }]}
                        style={{
                          display: "",
                          width: "calc(100% - 136px)",
                          margin: "0% 0px",
                          marginTop: "-20px",
                          textAlign: "center",
                        }}
                        initialValue={0}
                      >
                        <Radio.Group defaultValue={0}>
                          <Radio value={0}>ไม่ใช่</Radio>
                          <Radio value={1}>ใช่</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item
                        label="Discarded"
                        name="discard"
                        rules={[{ required: false }]}
                        style={{
                          display: "",
                          width: "calc(100% - 116px)",
                          margin: "0% 0px",
                          marginTop: "-12px",
                          textAlign: "center",
                        }}
                        initialValue={0}
                      >
                        <Radio.Group
                          defaultValue={0}
                          style={{ marginLeft: "6px" }}
                        >
                          <Radio value={0}>ไม่ใช่</Radio>
                          <Radio value={1}>ใช่</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Row>
                        <Form.Item
                          label="หมายเหตุเพิ่มเติม"
                          name="donor_note"
                          rules={[{ required: false }]}
                          style={{
                            display: "",
                            width: "calc(100% - 0px)",
                            margin: "0% 0px",
                            textAlign: "center",
                          }}
                        >
                          <TextArea
                            showCount
                            maxLength={150}
                            style={{ height: 100, width: 300 }}
                          />
                        </Form.Item>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="ข้อมูลถุงเลือด"
                      bordered={false}
                      style={{ marginTop: "-30px" }}
                    >
                      <Row>
                        <Space direction="vertical">
                          <Form.Item
                            label="เลขที่ถุงเลือด"
                            name="unit_no"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกเลขที่ถุงเลือด !!",
                              },
                              //{pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/ , message: "เลขที่ถุงเลือดถุงเลือดไม่ถูกต้อง"}
                            ]}
                            style={{
                              width: "calc(100% - 8px)",
                              margin: "0 20px",
                              marginTop: "-20px",
                            }}
                          >
                            <Input
                              size="large"
                              style={{
                                width: 220,
                                textAlign: "center",
                                height: "35px",
                              }}
                              maxlength="11"
                            />
                          </Form.Item>
                          <Form.Item
                            label="ประเภทถุง"
                            name="donor_type"
                            rules={[{ required: true }]}
                            style={{
                              display: "",
                              width: "calc(100% - 8px)",
                              margin: "0 20px",
                            }}
                          >
                            <Select
                              placeholder="Type"
                              style={{ width: 270, textAlign: "center" }}
                            >
                              {newBagtype.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.type}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Space>
                      </Row>
                    </Card>
                    {/* <Space direction="vertical"> */}
                    <Card
                      title="ข้อมูลทั่วไป"
                      bordered={false}
                      style={{ marginTop: "-20px" }}
                    >
                      <Row style={{ marginTop: "-17px" }}>
                        <Space direction="horizontal">
                          <Form.Item
                            label="น้ำหนักตัว"
                            name="donor_weight"
                            rules={[{ required: true }]}
                            style={{
                              display: "",
                              width: "calc(100% - 8px)",
                              margin: "0 0px",
                              textAlign: "center",
                            }}
                          >
                            <Input
                              maxLength="3"
                              suffix="กก."
                              style={{ marginLeft: "20px", width: "130px" }}
                            ></Input>
                          </Form.Item>
                          <Form.Item
                            label="ส่วนสูง"
                            name="donor_hight"
                            rules={[{ required: true }]}
                            style={{
                              display: "",
                              width: "calc(100% - 8px)",
                              margin: "0 0px",
                              textAlign: "center",
                              marginLeft: "12px",
                            }}
                          >
                            <Input
                              maxlength="3"
                              suffix="ซม."
                              style={{ marginLeft: "-5px", width: "130px" }}
                            ></Input>
                          </Form.Item>
                        </Space>
                      </Row>
                      <br />
                      <Row style={{ marginTop: "-17px" }}>
                        <Space direction="horizontal">
                          <Row>
                            <Form.Item
                              label="ความดันโลหิต"
                              name="blood_pressure_h"
                              rules={[{ required: true }]}
                              style={{
                                display: "",
                                width: "calc(100% - 8px)",
                                margin: "0 0px",
                                textAlign: "center",
                              }}
                            >
                              <Input maxlength="3"></Input>
                            </Form.Item>
                          </Row>
                          <Col> / </Col>
                          <Col>
                            <Form.Item
                              name="blood_pressure_l"
                              rules={[{ required: true }]}
                              style={{
                                display: "",
                                width: "calc(100% - 8px)",
                                margin: "0 0px",
                                textAlign: "center",
                              }}
                            >
                              <Input maxlength="3"></Input>
                            </Form.Item>
                          </Col>
                          <Col>
                            <span>&nbsp;มม.ปรอท</span>
                          </Col>
                        </Space>
                      </Row>
                      <br />
                      <Row style={{ marginTop: "-17px" }}>
                        <Space direction="horizontal">
                          <Row>
                            <Col span={20}>
                              <Form.Item
                                label="ชีพจร"
                                name="pulse_value"
                                rules={[{ required: true }]}
                                style={{
                                  display: "",
                                  width: "calc(122% - 8px)",
                                  margin: "0 0px",
                                  textAlign: "center",
                                }}
                              >
                                <Input
                                  maxlength="5"
                                  style={{ marginLeft: "43px", width: "130px" }}
                                ></Input>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item
                            name="pulse"
                            rules={[{ required: true }]}
                            style={{
                              display: "",
                              width: "calc(106% - 8px)",
                              margin: "0 0px",
                              textAlign: "center",
                            }}
                            initialValue={0}
                          >
                            <Radio.Group
                              onChange={onChangeheart}
                              value={valueheart}
                            >
                              <Radio value={0}>ปกติ</Radio>
                              <Radio value={1}>ไม่ปกติ</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Space>
                      </Row>
                      <br />
                      <Row style={{ marginTop: "-17px" }}>
                        <Form.Item
                          label="หัวใจ/ปอด"
                          name="heart"
                          rules={[{ required: true }]}
                          style={{
                            display: "",
                            width: "calc(200% - 200px)",
                            margin: "0 0px",
                          }}
                          initialValue={0}
                        >
                          <Radio.Group
                            onChange={onChangeHandL}
                            value={valueHandL}
                            style={{ marginLeft: "19px" }}
                          >
                            <Radio value={0}>ปกติ</Radio>
                            <Radio value={1}>ไม่ปกติ</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-6px" }}>
                        <Form.Item
                          label="ความเข้มโลหิต"
                          name="blood_depth"
                          rules={[{ required: true }]}
                          style={{
                            display: "",
                            width: "calc(200% - 200px)",
                            margin: "0 0px",
                          }}
                          initialValue={0}
                        >
                          <Radio.Group
                            onChange={onChangeblood}
                            value={valueblood}
                          >
                            <Radio value={0}>ปกติ</Radio>
                            <Radio value={1}>ไม่ปกติ</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Row>
                      <br />
                      <Row style={{ marginTop: "-20px" }}>
                        <Space direction="horizontal">
                          <Row>
                            <Col span={24}>
                              <Form.Item
                                label="HB"
                                name="hb"
                                rules={[{ required: true }]}
                                style={{
                                  display: "",
                                  width: "calc(100% - 8px)",
                                  margin: "0 0px",
                                  textAlign: "center",
                                }}
                              >
                                <Input
                                  maxlength="5"
                                  suffix="g/dl"
                                  style={{ width: "130px" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item
                            name="hb_normal"
                            rules={[{ required: true }]}
                            style={{
                              display: "",
                              width: "calc(200% - 147px)",
                              margin: "0 0px",
                              textAlign: "center",
                            }}
                            initialValue={0}
                          >
                            <Radio.Group
                              onChange={onChangeHB}
                              value={valueHB}
                              style={{ marginLeft: "19px" }}
                            >
                              <Radio value={0}>ปกติ</Radio>
                              <Radio value={1}>ไม่ปกติ</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Space>
                      </Row>
                    </Card>
                    {/* </Space> */}
                    <Card
                      title="เจ้าหน้าที่"
                      bordered={false}
                      style={{ marginTop: "-22px", height: "363px" }}
                    >
                      <Row style={{ marginTop: "-20px" }}>
                        <Col span={8} offset={1}>
                          <Form.Item>เจ้าหน้าที่ทะเบียน</Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="staff_register"
                            rules={[{ required: false }]}
                            style={{
                              display: "",
                              width: "calc(100% - 0px)",
                              textAlign: "center",
                            }}
                          >
                            <Select
                              showArrow={false}
                              disabled
                              placeholder="เจ้าหน้าที่"
                              size="small"
                              style={{ width: 200, fontSize: "14px" }}
                            >
                              {newStaff.map((item) => (
                                <Option
                                  key={item.fullname}
                                  value={item.fullname}
                                >
                                  {item.fullname}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col span={8} offset={1}>
                          <Form.Item>เจ้าหน้าที่เตรียมถุง</Form.Item>
                        </Col>
                        <Form.Item
                          name="staff_make"
                          rules={[{ required: true }]}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <Select
                            placeholder="เจ้าหน้าที่"
                            size="small"
                            style={{ width: 200, fontSize: "14px" }}
                          >
                            {newStaff.map((item) => (
                              <Option key={item.fullname} value={item.fullname}>
                                {item.fullname}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col span={8} offset={1}>
                          <Form.Item>เจ้าหน้าที่ผู้เจาะเก็บ</Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="staff_drill"
                            rules={[{ required: true }]}
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <Select
                              size="small"
                              placeholder="เจ้าหน้าที่"
                              style={{ width: 200, fontSize: "14px" }}
                            >
                              {newStaff.map((item) => (
                                <Option
                                  key={item.fullname}
                                  value={item.fullname}
                                >
                                  {item.fullname}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col span={8} offset={1}>
                          <Form.Item>เจ้าหน้าที่เก็บตัวอย่างโลหิต</Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="staff_keep"
                            rules={[{ required: true }]}
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <Select
                              size="small"
                              placeholder="เจ้าหน้าที่"
                              style={{ width: 200, fontSize: "14px" }}
                            >
                              {newStaff.map((item) => (
                                <Option
                                  key={item.fullname}
                                  value={item.fullname}
                                >
                                  {item.fullname}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <br />
                <Footer>
                  <Row justify="end">
                    <div ref={(el) => (printComponent = el)}>
                      <Print_Sticker
                        cid={data_update_blood?.cid}
                        donor_no={newBloodlist[0]?.donor_no}
                        fullname={newBloodlist[0]?.fullname}
                        age_year={newBloodlist[0]?.age_year}
                        birthday={moment(newBloodlist[0]?.birthday)
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                        bloodgroup={newBloodlist[0]?.bloodgroup}
                        blood_rh={newBloodlist[0]?.blood_rh}
                        donor_phone={newBloodlist[0]?.donor_phone}
                        donor_email={newBloodlist[0]?.donor_email}
                        sex={newBloodlist[0]?.sex}
                        job={newBloodlist[0]?.job}
                        addrpart_new={newBloodlist[0]?.addrpart_new}
                        moopart_new={newBloodlist[0]?.moopart_new}
                        roadpart_new={newBloodlist[0]?.roadpart_new}
                        soipart_new={newBloodlist[0]?.soipart_new}
                        DISTRICT_NAME={newBloodlist[0]?.DISTRICT_NAME}
                        AMPHUR_NAME={newBloodlist[0]?.AMPHUR_NAME}
                        PROVINCE_NAME={newBloodlist[0]?.PROVINCE_NAME}
                        postcode={newBloodlist[0]?.postcode}
                        staff_register={newBloodlist[0]?.staff_register}
                        staff_make={data_update_blood?.staff_make}
                        staff_drill={data_update_blood?.staff_drill}
                        staff_keep={data_update_blood?.staff_keep}
                        pulse={data_update_blood?.pulse}
                        pulse_value={data_update_blood?.pulse_value}
                        blood_pressure_h={data_update_blood?.blood_pressure_h}
                        blood_pressure_l={data_update_blood?.blood_pressure_l}
                        hb={data_update_blood?.hb}
                        donor_weight={data_update_blood?.donor_weight}
                        unit_number={data_update_blood?.unit_no}
                        donor_note={data_update_blood?.donor_note}
                        heart={data_update_blood?.heart}
                        hb_normal={data_update_blood?.hb_normal}
                        defer={data_update_blood?.defer}
                        medic={data_update_blood?.medic}
                        under_volume={data_update_blood?.under_volume}
                        high_volume={data_update_blood?.high_volume}
                        discard={data_update_blood?.discard}
                        donor_count={data_update_blood?.donor_count}
                        last_exception={data_update_blood?.last_exception}
                        staff_check={data_update_blood?.staff_check}
                        last_blood={data_update_blood?.last_blood}
                        date_now={moment().format("DD/MM/YYYY")}
                      />
                    </div>
                    <ReactToPrint
                      trigger={() => (
                        <Button type="primary">พิมพ์สติกเกอร์</Button>
                      )}
                      content={() => printComponent}
                    />

                    <div ref={(el) => (printComponent2 = el)}>
                      <Print_Data
                        date_now={moment().format("DD/MM/YYYY")}
                        cid={data_update_blood?.cid}
                        donor_no={newBloodlist[0]?.donor_no}
                        age_year={newBloodlist[0]?.age_year}
                        birthday={moment(newBloodlist[0]?.birthday)
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                        donor_phone={newBloodlist[0]?.donor_phone}
                        donor_email={newBloodlist[0]?.donor_email}
                        sex={newBloodlist[0]?.sex}
                        job={newBloodlist[0]?.job}
                        addrpart_new={newBloodlist[0]?.addrpart_new}
                        moopart_new={newBloodlist[0]?.moopart_new}
                        roadpart_new={newBloodlist[0]?.roadpart_new}
                        soipart_new={newBloodlist[0]?.soipart_new}
                        DISTRICT_NAME={newBloodlist[0]?.DISTRICT_NAME}
                        AMPHUR_NAME={newBloodlist[0]?.AMPHUR_NAME}
                        PROVINCE_NAME={newBloodlist[0]?.PROVINCE_NAME}
                        postcode={newBloodlist[0]?.postcode}
                      />
                    </div>
                    <ReactToPrint
                      trigger={() => <Button type="primary">พิมพ์</Button>}
                      content={() => printComponent2}
                    />

                    <div className="frmedit">
                      <Space>
                        <Text type="secondary" underline>
                          พิมพ์อัตโนมัต
                        </Text>
                        <Switch defaultChecked onChange={onChangeprinter} />
                        <Text type="danger"></Text>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={showModal}
                          icon={
                            <VscSaveAs
                              style={{
                                fontSize: "14px",
                                marginRight: "3px",
                                marginBottom: "-2px",
                              }}
                            />
                          }
                          style={{ fontSize: "12px", height: "28px" }}
                        >
                          บันทึกข้อมูล
                        </Button>
                      </Space>
                    </div>
                  </Row>
                </Footer>
              </Form>
            </TabPane>
            <TabPane tab="แบบสอบถามสำหรับผู้บริจาคโลหิต" key="2">
              <Row>
                <Col span={23}>
                  <Form form={frmQuestion}>
                    <Row>
                      <Table
                        pagination={false}
                        className="xm"
                        bordered
                        columns={columnQuestList}
                        dataSource={queslist}
                      ></Table>
                    </Row>

                    <Row justify="end" style={{ marginTop: "8px" }}>
                      <Button
                        style={{
                          fontSize: "12px",
                          height: "28px",
                          backgroundColor: "#3AB0FF",
                          color: "white",
                        }}
                        icon={
                          <VscSaveAs
                            style={{
                              fontSize: "14px",
                              marginRight: "3px",
                              marginBottom: "-2px",
                            }}
                          />
                        }
                        size="samll"
                        onClick={showModalPassAns}
                      >
                        บันทึกข้อมูล
                      </Button>{" "}
                    </Row>
                  </Form>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>

        <Modal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false), setPassword();
          }}
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>
          <Input.Password
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="pass"
            onPressEnter={handleOk}
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
        </Modal>

        {/* PassAns */}
        <Modal
          visible={isModaPassAns}
          onCancel={() => {
            setIsModalPassAns(false), setPasswordAns();
          }}
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>
          <Input.Password
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={passwordAns}
            onChange={(e) => setPasswordAns(e.target.value)}
            id="passAns"
            onPressEnter={save}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalPassAns(false), setPasswordAns();
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
              onClick={save}
              disabled={!passwordAns}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
      </Content>
    </>
  );
};
export default Donor_frmblood;
/////// print_sticker
const Print_Sticker = ({
  donor_no,
  date_now,
  fullname,
  staff_register,
  staff_make,
  staff_drill,
  staff_keep,
  pulse_value,
  pulse,
  blood_pressure_h,
  blood_pressure_l,
  hb,
  donor_weight,
  cid,
  job,
  unit_number,
  moopart_new,
  addrpart_new,
  roadpart_new,
  soipart_new,
  DISTRICT_NAME,
  AMPHUR_NAME,
  PROVINCE_NAME,
  donor_note,
  heart,
  hb_normal,
  defer,
  medic,
  birthday,
  under_volume,
  high_volume,
  discard,
  donor_count,
  last_exception,
  staff_check,
  last_blood,
  bloodgroup,
  blood_rh,
  sex,
  postcode,
  donor_phone,
  donor_email,
  age_year,
}) => {
  return (
    <div
      className="print"
      style={{
        backgroundColor: "white",
        border: "1px solid",
        // margin: "35px",
        width: "870px",
        height: "1237px",
        // paddingRight:"20px",
        // position: "fixed",
      }}
    >
      <Row justify="center" style={{ marginBottom: "-20px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            paddingBottom: "1px",
          }}
        >
          ใบสมัครผู้บริจาคโลหิต <br /> ศูนย์บริการโลหิตแห่งชาติ สภากาชาดไทย
        </p>
      </Row>

      <Row>
        <Col
          span={8}
          style={{
            borderTop: "1px solid",
            borderRight: "1px solid",
            borderBottom: "1px solid",
            height: "	45px",
          }}
        >
          <p style={{ fontSize: "18px", padding: "10px" }}>
            <Radio></Radio> ผู้บริจาคโลหิตครั้งเเรก
          </p>
        </Col>
        <Col
          span={7}
          style={{
            borderTop: "1px solid",
            borderRight: "1px solid",
            borderBottom: "1px solid",
            height: "	45px",
          }}
        >
          <p style={{ fontSize: "18px", padding: "10px" }}>
            <Radio></Radio> ผู้บริจาคโลหิตประจำ
          </p>
        </Col>
        <Col
          span={9}
          style={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
            height: "	45px",
          }}
        >
          <p style={{ fontSize: "18px", padding: "10px" }}>
            วันที่(วัน/เดือน/ปี) : <b>{date_now}</b>
          </p>
        </Col>
      </Row>

      <Row style={{ marginBottom: "-20px", padding: "6px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            paddingBottom: "1px",
          }}
        >
          <b>ช่วงอายุบริจาคได้ :</b>
        </p>
      </Row>

      <Row style={{ paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <b>โลหิตรวม 17-70 ปี</b>
          </p>
        </Col>
        <Col offset={2} style={{ paddingLeft: "15px" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            #ถ้าอายู 17 ปี ต้องมีหนังสือยินยอมจากผู้ปกครอง
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            #บริจากครั้งเเรกอายุไม่เกิน 60 ปี
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-15px" }}>
        <Col offset={6}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              marginLeft: "-20px",
            }}
          >
            #ผู้บริจาคประจำ อายุ 65-70 ปี ต้องผ่านการประเมินเพิ่มเติม
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "-15px",
          paddingLeft: "6px",
          borderBottom: "1px solid",
        }}
      >
        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <b>โลหิตเฉพาะส่วน 17 - 60 ปี</b>
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "-12px",
              marginLeft: "4px",
            }}
          >
            #บริจาคครั้งเเรกอายุไม่เกิน 50 ปี เเละเคยบริจาคโลหิตรวมมาก่อน
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "3px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <b>เฉพาะผู้บริจาคโลหิตประจำ</b>
          </p>
        </Col>
        <Col offset={1} style={{ paddingLeft: "15px" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            ครั้งที่เเล้วท่านได้บริจาค :
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={last_blood == 1 ? true : false}></Radio> โลหิตรวม
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio
              checked={
                last_blood == 2 || last_blood == 3 || last_blood == 4
                  ? true
                  : false
              }
            ></Radio>{" "}
            โลหิตเฉพาะส่วน
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-15px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <b>โลหิตเฉพาะส่วน กรุณาระบุ :</b>
          </p>
        </Col>
        <Col offset={2}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              marginLeft: "-26px",
            }}
          >
            <Radio checked={last_blood == 2 ? true : false}></Radio>{" "}
            เม็ดโลหิตแดง
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "1px",
            }}
          >
            <Radio checked={last_blood == 3 ? true : false}></Radio> เกล็ดเลือด
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              marginLeft: "-4px",
            }}
          >
            <Radio checked={last_blood == 4 ? true : false}></Radio> พลาสมา
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio></Radio>
            อื่นๆ.................................
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-15px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <b>การบริจาคครั้งที่ผ่านมา :</b>
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              marginLeft: "29px",
            }}
          >
            <Radio checked={last_exception == "1" ? true : false}></Radio>{" "}
            ไม่มีปัญหา
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "-16px",
          paddingLeft: "6px",
          borderBottom: "1px solid",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "14px",
              paddingBottom: "1px",
              marginBottom: "-99px",
            }}
          >
            <Radio checked={last_exception == "2" ? true : false}></Radio>{" "}
            มีปัญหา :
          </p>
        </Col>

        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "8px",
            }}
          >
            <Checkbox></Checkbox> เป็นลม
          </p>
        </Col>

        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "8px",
            }}
          >
            <Checkbox></Checkbox> เขียวช้ำ
          </p>
        </Col>

        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "8px",
            }}
          >
            <Checkbox></Checkbox> หาเส้นโลหิตยาก
          </p>
        </Col>

        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "8px",
            }}
          >
            <Checkbox></Checkbox>{" "}
            ได้รับเเจ้งให้งดบริจาคชั่วคราวเนื่องจาก................
          </p>
        </Col>

        <Col>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "8px",
            }}
          >
            <Checkbox></Checkbox> อื่นๆ................
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "5px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "16px",
              paddingBottom: "1px",
            }}
          >
            เลขที่บัตรประจำตัวประชาชน :
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {cid === undefined ? "" : `${cid?.slice(0, 1)}-`}
            {cid === undefined ? "" : cid?.slice(1, 2)}
            {cid === undefined ? "" : cid?.slice(2, 3)}
            {cid === undefined ? "" : cid?.slice(3, 4)}
            {cid === undefined ? "" : `${cid?.slice(4, 5)}-`}
            {cid === undefined ? "" : cid?.slice(5, 6)}
            {cid === undefined ? "" : cid?.slice(6, 7)}
            {cid === undefined ? "" : cid?.slice(7, 8)}
            {cid === undefined ? "" : cid?.slice(8, 9)}
            {cid === undefined ? "" : `${cid?.slice(9, 10)}-`}
            {cid === undefined ? "" : cid?.slice(10, 11)}
            {cid === undefined ? "" : `${cid?.slice(11, 12)}-`}
            {cid === undefined ? "" : cid?.slice(12, 13)}
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "-16px",
          paddingLeft: "6px",
          borderBottom: "1px solid",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "5px",
            }}
          >
            {/* เลขประจำตัวผู้บริจาคโลหิต........................................................................................... */}
            เลขประจำตัวผู้บริจาคโลหิต : {donor_no}
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "4px", paddingLeft: "6px" }}>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            วัน/เดือน/ปีเกิด : {birthday}
          </p>
        </Col>
        <Col span={5}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            อายุ : {age_year} ปี
          </p>
        </Col>
        <Col span={5}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            เพศ : {sex == "1" ? "ชาย" : "หญิง"}
          </p>
        </Col>
        <Col span={6}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            น้ำหนัก : {donor_weight} กิโลกรัม
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-14px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            สถานที่ที่ติดต่อได้
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            <Radio></Radio>ที่อยู่เดิม
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            <Radio checked={true}></Radio>ที่อยู่ปัจจุบัน
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            ระบุ : {` บ้านเลขที่ ${addrpart_new} `} &nbsp;{" "}
            {` หมู่ที่ ${moopart_new} `} &nbsp;{" "}
            {` ถนน ${roadpart_new === "" ? "-" : roadpart_new}  `} &nbsp;{" "}
            {`ซอย ${soipart_new === "" ? "-" : soipart_new} `} &nbsp;
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-14px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            {/* ระบุ {` บ้านเลขที่ ${addrpart_new}  หมู่ที่ ${moopart_new} ถนน ${roadpart_new ==="" ?"-":roadpart_new} ซอย ${soipart_new ==="" ?"-":soipart_new} ตำบล ${DISTRICT_NAME}  อำเภอ ${AMPHUR_NAME} จังหวัด ${PROVINCE_NAME}`} */}
            {` ตำบล ${DISTRICT_NAME}  `} &nbsp; {` อำเภอ ${AMPHUR_NAME}  `}{" "}
            &nbsp; {` จังหวัด ${PROVINCE_NAME}`}
            {/* ................................................................................................................................................................................................................................................. */}
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-5px", paddingLeft: "6px" }}>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            รหัสไปรษณีย์ : {postcode}
          </p>
        </Col>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            หมายเลขโทรศัพท์........................
          </p>
        </Col>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            โทรศัพท์เคลื่อนที่ : &nbsp;
            {donor_phone === undefined ? "" : `${donor_phone?.slice(0, 3)}-`}
            {donor_phone === undefined ? "" : `${donor_phone?.slice(3, 6)}-`}
            {donor_phone === undefined ? "" : donor_phone?.slice(6, 10)}
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-16px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            E-mail address : {donor_email}
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-5px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "5px",
            }}
          >
            อาชีพ :
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "1" ? true : false}></Radio>{" "}
            นักเรียน,นักศึกษา
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "2" ? true : false}></Radio>{" "}
            ข้าราชการ,ทหาร,ตำรวจ,พนักงานรัฐวิสาหกิจ
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "3" ? true : false}></Radio>{" "}
            พนักงานบริษัท,รับจ้าง
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-16px", paddingLeft: "20px" }}>
        <Col offset={2}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "4" ? true : false}></Radio> พระภิกษุ,สามเณร
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "5" ? true : false}></Radio> เกษตรกร
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
            }}
          >
            <Radio checked={job == "6" ? true : false}></Radio>
            ธุรกิจส่วนตัว/ค้าขาย
          </p>
        </Col>
        <Col offset={1}>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              paddingBottom: "1px",
              paddingLeft: "17px",
            }}
          >
            <Radio checked={job == "7" ? true : false}></Radio>
            อื่นๆ..................................................
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-12px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            {/* ชื่อ นาย, นาง,
            นางสาว....................................................................................................................................................................................(กรุณาเขียนตัวบรรจง) */}
            ชื่อ - สกุล : {fullname}
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "1px",
          borderBottom: "1px solid",
          paddingLeft: "6px",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            ชื่อ-นามสกุลเดิม
            (ถ้ามี).....................................................................................................................................................................................
          </p>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "5px",
              textDecoration: "underline",
            }}
          >
            สำหรับเจ้าหน้าที่กรอกข้อมูล
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col span={12}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            เลขประจำตัวผู้บริจาคโลหิต {donor_no}
          </p>
        </Col>
        <Col span={6}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            บริจาคครั้งที่ {donor_count == null ? "" : donor_count}
          </p>
        </Col>
        <Col span={4} style={{ paddingLeft: "25px" }}>
          <p
            style={{
              fontSize: "12px",
              // marginBottom: "5px",
              borderLeft: "1px solid",
              borderRight: "1px solid",
              borderBottom: "1px solid",
              padding: "12px",
              //paddingBottom: "-40px",
              paddingLeft: "20px",
              marginTop: "-30px",
            }}
          >
            หมู่โลหิต <br />{" "}
            <b style={{ paddingLeft: "14px", fontSize: "28px" }}>
              {bloodgroup}
            </b>
          </p>
        </Col>
        <Col span={2}>
          <p
            style={{
              fontSize: "12px",
              marginBottom: "5px",
              borderBottom: "1px solid",
              padding: "12px",
              // paddingBottom: "40px",
              paddingLeft: "20px",
              marginTop: "-30px",
            }}
          >
            Rh <br />
            <b style={{ fontSize: "28px" }}>{blood_rh}</b>
          </p>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
              textDecoration: "underline",
            }}
          >
            กรณีผู้บริจาคโลหิตประจำไม่มีบัตรประจำตัวผู้บริจาคโลหิต
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col span={15}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            บริจาคโลหิตครั้งแรกเมื่อ
            (วันที่/เดือน/ปี)......................................................................................
          </p>
        </Col>
        <Col span={9}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            สถานที่บริจาค...................................................................
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col span={15}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            บริจาคโลหิตครั้งสุดท้ายเมื่อ
            (วันที่/เดือน/ปี)...............................................................................
          </p>
        </Col>
        <Col span={9}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            สถานที่บริจาค...................................................................
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-2px" }}>
        <Col
          span={6}
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              fontSize: "19px",
              marginBottom: "5px",
              border: "1px solid",
              // padding: "35px",
              paddingLeft: "15px",
              // paddingRight: "25px",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <b>{unit_number == "" ? "Unit Number" : unit_number}</b>
          </p>
        </Col>

        <Col span={9}>
          <p style={{ fontSize: "15px" }}>
            ความดันโลหิต {blood_pressure_h} / {blood_pressure_l} มม. ปรอท
          </p>
          <Row style={{ marginTop: "-16px" }}>
            <Col span={12}>
              <p>ชีพจร {pulse_value} ครั้ง/นาที</p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px" }}>
                <Radio checked={pulse == "1" ? true : false}></Radio>
                ปกติ
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px", paddingLeft: "5px" }}>
                <Radio checked={pulse == "0" ? true : false}></Radio>
                ไม่ปกติ
              </p>
            </Col>
          </Row>

          <Row style={{ marginTop: "-16px" }}>
            <Col span={12}>
              <p>หัวใจ/ปอด</p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px" }}>
                <Radio checked={heart == "0" ? true : false}></Radio>
                ปกติ
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px", paddingLeft: "5px" }}>
                <Radio checked={heart == "1" ? true : false}></Radio>
                ไม่ปกติ
              </p>
            </Col>
          </Row>

          <Row style={{ marginTop: "-16px" }}>
            <Col span={12}>
              <p>อูหภูมิร่างกาย.............°C</p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px" }}>
                <Radio></Radio>ผ่าน
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px", paddingLeft: "7px" }}>
                <Radio></Radio>ไม่ผ่าน
              </p>
            </Col>
          </Row>

          <Row style={{ marginTop: "-16px" }}>
            <Col span={12}>
              <p>Hb {hb} ก/ดล.</p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px" }}>
                <Radio checked={hb_normal == "0" ? true : false}></Radio>
                ผ่าน
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "14px", paddingLeft: "5px" }}>
                <Radio checked={hb_normal == "1" ? true : false}></Radio>
                ไม่ผ่าน
              </p>
            </Col>
          </Row>
        </Col>

        <Col span={9} style={{ paddingLeft: "1x" }}>
          <p
            style={{
              marginLeft: "28px",
              fontSize: "14px",
              borderTop: "1px  solid",
              borderLeft: "1px  solid",
              borderBottom: "1px  solid",
              // padding: "35px",
              paddingLeft: "20px",
              // paddingRight: "50px",
              paddingTop: "25px",
            }}
          >
            <Row style={{ marginTop: "-20px" }}>
              <p style={{ fontSize: "14px", paddingLeft: "-15px" }}>
                <Radio checked={defer == null ? false : true}></Radio>Deferred
                due to {defer == null ? "" : defer}
              </p>
            </Row>
            <Row style={{ marginTop: "-16px" }}>
              <p style={{ fontSize: "14px", paddingLeft: "-15px" }}>
                <Radio checked={medic == 1 ? true : false}></Radio>
                กินยาที่มีผลต่อเกล็ดเลือด
              </p>
            </Row>
            <Row style={{ marginTop: "-16px" }}>
              <p style={{ fontSize: "14px", paddingLeft: "-15px" }}>
                <Radio checked={under_volume == 1 ? true : false}></Radio>Under
                volume
              </p>
            </Row>
            <Row style={{ marginTop: "-16px" }}>
              <p style={{ fontSize: "14px", paddingLeft: "-15px" }}>
                <Radio checked={high_volume == 1 ? true : false}></Radio>High
                volume
              </p>
            </Row>
            <Row style={{ marginTop: "-16px" }}>
              <p style={{ fontSize: "14px", paddingLeft: "-15px" }}>
                <Radio checked={discard == 1 ? true : false}></Radio>Discarded
              </p>
            </Row>
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "3px",
          borderBottom: "1px solid",
          paddingLeft: "6px",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            หมายเหตุ {donor_note}
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "5px", paddingLeft: "6px" }}>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            {/* เจ้าหน้าที่ทะเบียน.................................................... */}
            เจ้าหน้าที่ทะเบียน : <b>{staff_register}</b>
          </p>
        </Col>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            เจ้าหน้าที่เตรียมถุง : <b>{staff_make}</b>
          </p>
        </Col>
        <Col span={8}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            เจ้าหน้าที่ผู้เจาะเก็บ : <b>{staff_drill}</b>
          </p>
        </Col>
      </Row>

      <Row style={{ marginTop: "-2px", paddingLeft: "6px" }}>
        <Col offset={2} span={10}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            เจ้าหน้าที่เก็บตัวอย่างโลหิต : <b>{staff_keep}</b>
          </p>
        </Col>
        <Col offset={1} span={10}>
          <p
            style={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            เจ้าหน้าที่ผู้ตรวจสอบ : <b>{staff_check}</b>
          </p>
        </Col>
      </Row>
    </div>
  );
};

const Print_Data = ({
  donor_no,
  date_now,
  cid,
  moopart_new,
  addrpart_new,
  roadpart_new,
  soipart_new,
  DISTRICT_NAME,
  AMPHUR_NAME,
  PROVINCE_NAME,
  birthday,
  sex,
  postcode,
  donor_phone,
  donor_email,
  age_year,
}) => {
  return (
    <div
      className="print"
      style={{
        backgroundColor: "white",
        //  border: "1px solid",
        // margin: "35px",
        width: "870px",
        height: "1237px",
        // paddingRight:"20px",
        // position: "fixed",
      }}
    >
      <Row
        justify="center"
        style={{
          height: "95px",
        }}
      ></Row>

      <Row
        style={{
          height: "45px",
        }}
      >
        <Col span={6} offset={18}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>
            <b>{date_now}</b>
          </p>
        </Col>
      </Row>

      <Row style={{ height: "255px" }}></Row>

      <Row
        style={{
          marginLeft: "12px",
        }}
      >
        <Col offset={6}>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {cid === undefined ? "" : cid?.slice(0, 1)} &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(1, 2)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(2, 3)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(3, 4)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(4, 5)} &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(5, 6)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(7, 8)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(6, 7)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(8, 9)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(9, 10)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(10, 11)} &nbsp;
            &nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(11, 12)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(12, 13)}
          </p>
        </Col>
      </Row>

      <Row>
        <Col span={6} offset={5}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>{donor_no}</p>
        </Col>
      </Row>

      <Row
        style={{
          height: "33px",
          marginLeft: "15px",
        }}
      >
        <Col span={4} offset={1}>
          <p style={{ fontSize: "16px", marginLeft: "72px" }}>
            {birthday}

          </p>
        </Col>
        <Col span={4} offset={4}>
          <p style={{ fontSize: "16px", marginLeft: "72px" }}>{age_year}</p>
        </Col>
        <Col span={4} offset={1}>
          <p style={{ fontSize: "16px" }}>{sex == "1" ? "ชาย" : "หญิง"}</p>
        </Col>
      </Row>

      <Row
        style={{
          marginLeft: "5px",
          marginTop: "-5px",
        }}
      >
        <Col offset={12}>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {` บ้านเลขที่ ${addrpart_new} `} &nbsp; {` หมู่ที่ ${moopart_new} `}{" "}
            &nbsp; {` ถนน ${roadpart_new === "" ? "-" : roadpart_new}  `} &nbsp;{" "}
            {`ซอย ${soipart_new === "" ? "-" : soipart_new} `} &nbsp;
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginLeft: "20px",
          marginTop: "-13px",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {` ตำบล ${DISTRICT_NAME}  `} &nbsp; {` อำเภอ ${AMPHUR_NAME}  `}{" "}
            &nbsp; {` จังหวัด ${PROVINCE_NAME}`}
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "-15px",
        }}
      >
        <Col span={4} offset={2}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>{postcode}</p>
        </Col>

        <Col span={5} offset={10}>
          <p style={{ fontSize: "16px", marginLeft: "10px" }}>
            {donor_phone === undefined ? "" : `${donor_phone?.slice(0, 3)}-`}
            {donor_phone === undefined ? "" : `${donor_phone?.slice(3, 6)}-`}
            {donor_phone === undefined ? "" : donor_phone?.slice(6, 10)}
          </p>
        </Col>
      </Row>
    </div>
  );
};
