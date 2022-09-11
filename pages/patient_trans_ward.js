import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsDropletHalf } from "react-icons/bs";
import api from "../lib/api";

const Patient_trans_blood = ({ orderNumber, handleCancelTransBlood }) => {
  const [frmTransBlood] = Form.useForm();
  const [frmFingerTip] = Form.useForm();

  const { TabPane } = Tabs;
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;
  const [placement, SetPlacement] = useState("bottomLeft");

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledXmId, setDisabledXmId] = useState(true);
  const [disabledBloodNo, setDisabledBloodNo] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [dataFingerTip, setDataFingerTip] = useState([]);
  const [patientNote, setPatientNote] = useState();
  const [reactionBloodList, setReactionBloodList] = useState();
  const [receiveBloodList, setReceiveBloodList] = useState();
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [thaiDate, setThaiDate] = useState();
  const [dataPatientReq, setDataPatientReq] = useState();
  const [dataPatient, setDataPatient] = useState();
  const [dataFingerTipShow, setDataFingerTipShow] = useState();
  const [dataRecBloodHis, setDataRecBloodHis] = useState();
  const [dataReqBloodHis, setDataReqBloodHis] = useState();
  const [modalfingerTip, setIsModalfingerTip] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [rhname, setRhname] = useState();
  const [groupblood, setGroupblood] = useState();
  const [department, setDepartment] = useState();
  const [ward, setWard] = useState([]);
  const [recivedStaff, setRecivedStaff] = useState([]);
  const [password, setPassword] = useState(); //tranblood
  const [passwordfgt, setPasswordFgt] = useState(); //tranblood
  const [Ward_search, setWard_search] = useState(); //tranblood
  const [Modal_tranblood_ward, SetModal_tranblood_ward] = useState(false);

  const showModal_tranblood_ward = () => {
    SetModal_tranblood_ward(true);
  };
  const up_cross_tran = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    SetModal_tranblood_ward(false);
    setPassword();

    const staff_name = resultLogin.data.user_name;
    const dataUpdate = [];

    for (let i = 0; i < dataSource.length; i++) {
      console.log("dataSource[i]", dataSource[i].xm_id);
      // dataUpdate=dataSource[i].xm_id;
      dataUpdate.push(dataSource[i].xm_id);
    }
    try {
      if (resultLogin.data.id_user) {
        // console.log("dataUpdate",dataUpdate);
        const result = await api.post(`/up_tranward`, {
          xm_id: dataUpdate,
          staff: staff_name,
        });
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        window.close();

        // await ClickRow(Data_record);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      SetModal_tranblood_ward(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      SetModal_tranblood_ward(false);
    }
  };

  const Fetch_rh_name = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhname(result.data[0]);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setGroupblood(result.data);
  };

  const Fetch_department = async () => {
    const result = await api.get("/department");
    setDepartment(result.data[0]);
  };

  const Fetch_ward = async () => {
    const result = await api.get("/ward");
    setWard(result.data[0]);
  };

  const Fetch_recivedStaff = async (e) => {
    const result = await api.get("/recived_staff", {
      params: { sr_ward: e },
    });
    setRecivedStaff(result.data[0]);
  };

  const columnDataBlood = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "7%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit no",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "15%",
    },
    {
      title: "Group",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: "l_name",
      key: "l_name",
      align: "center",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "operation",
      align: "center",
      width: "7%",
      render: (_, record, index) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete(index)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const showModalFingerTip = () => {
    setIsModalfingerTip(true);
  };

  const handleOkFingerTip = () => {
    setIsModalfingerTip(false);
  };

  const handleCancelFingerTip = () => {
    setIsModalfingerTip(false);
  };

  const showModalConfirm = () => {
    setIsModalConfirm(true);
  };

  const handleOkConfirm = () => {
    setIsModalConfirm(false);
  };

  const handleCancelConfirm = () => {
    setIsModalConfirm(false);
  };

  const handleDelete = (key) => {
    const dataLast = dataSource[key];
    const newData = dataSource.filter((item) => item !== dataLast);
    setDataSource(newData);

    if (dataSource.length < 2) {
      setDisabledBtn(true);
    }
  };

  const Search = async () => {
    const frmHN = frmTransBlood.getFieldValue();
    setWard_search();
    const params = {
      hn: frmHN.hn,
    };

    try {
      const resultPatientReq = await api.get("/patient_data", { params });

      const resultPatient = await api.get("/hn_user", {
        params: { hn: frmHN.hn },
      });

      // console.log("112", show_pucntfinger.data[0]);
      const thai_date = moment(resultPatient.data[0].bd_eng)
        .add(543, "year")
        .format("LL");

      console.log("resultPatientReq.data[0])", resultPatientReq.data[0]);
      setDataPatientReq(resultPatientReq.data[0]);
      setDataPatient(resultPatient.data[0]);
      setThaiDate(thai_date);

      if (resultPatientReq.data[0]) {
        setDisabledXmId(false);
        document.getElementById("xm_id").focus();
      }
    } catch (error) {
      //เช็คเมื่อใส่ข้อมูลถุงเลือดแบบเข้าที่เมนู navbar เเล้วไม่พบข้อมูล
      Modal.warning({
        content: <div>ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง</div>,
        onOk() {
          frmTransBlood.setFieldsValue({ hn: null });
          document.getElementById("hn_id").focus();
        },
      });
    }
  };

  const SearchXmId = async () => {
    const frm = frmTransBlood.getFieldValue();
    console.log(frm);

    const params = {
      hn: frm.hn,
      xm_id: frm.xm_id,
    };
    try {
      const resultPatientCoss = await api.get("/check_xmId_wd", { params });
      const SearchOrdernumber = await api.get("/Search_ordernumber_ward", {
        params: { order_number: resultPatientCoss.data[0].order_number },
      });

      // console.log("12", resultPatientCoss.data[0].order_number);
      // console.log("SearchOrdernumber",SearchOrdernumber.data[0]);
      setWard_search(SearchOrdernumber.data[0]);
      if (resultPatientCoss.data.length > 0) {
        if (resultPatientCoss.data[0].b_exp < 1) {
          //เช็ค xmID เมื่อถุงเลือดหมดอายุ
          Modal.error({
            content: (
              <>
                <h2>เตือนการใช้เลือด</h2>
                <p style={{ textAlign: "center", marginTop: "-18px" }}>
                  ถุงเลือด &nbsp;
                  <b style={{ fontSize: "20px" }}>
                    {resultPatientCoss.data[0].unit_no_dot}
                  </b>
                  &nbsp;หมดอายุเเล้ว
                </p>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "-15px",
                    marginBottom: "-20px",
                  }}
                >
                  แนะนำให้ปลดจากคลังโลหิต
                </p>
              </>
            ),
            onOk() {
              frmTransBlood.setFieldsValue({ xm_id: null });
              document.getElementById("xm_id").focus();
            },
          });
        } else {
          setDisabledBloodNo(false);
          document.getElementById("blood_no").focus();
        }
      } else {
        // เช็คเมื่อยิง xmID เเล้วไม่พบข้อมูล
        Modal.warning({
          content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
          onOk() {
            frmTransBlood.setFieldsValue({ xm_id: null });
            document.getElementById("xm_id").focus();
          },
        });
      }
    } catch (error) {
      // เช็คเมื่อยิง xmID เเล้วไม่พบข้อมูล อาจผิดที่ หลังบ้าน

      Modal.warning({
        content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
        onOk() {
          frmTransBlood.setFieldsValue({ xm_id: null });
          document.getElementById("xm_id").focus();
        },
      });
    }
  };

  const SearchBloodNo = async () => {
    const frm = frmTransBlood.getFieldValue();
    const params = {
      xm_id: frm.xm_id,
    };

    try {
      const resultPatientCoss = await api.get("/check_xmId_wd", { params });

      if (frm.blood_no == resultPatientCoss.data[0].blood_no) {
        if (dataSource.length > 0) {
          const result = dataSource.filter((item) => item.xm_id === frm.xm_id);
          if (result.length > 0) {
            // เช็คเมื่อยิงถุงเลือดเเล้ว ถุงเลือดซ้ำใน dataSource
            Modal.warning({
              content: "ถุงเลือดซ้ำ",
              onOk() {
                frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
                setDisabledBloodNo(true);
                document.getElementById("xm_id").focus();
              },
            });
          } else {
            setDataSource([...dataSource, resultPatientCoss.data[0]]);
            frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
            setDisabledBloodNo(true);
            document.getElementById("xm_id").focus();
          }
        } else {
          setDataSource([...dataSource, resultPatientCoss.data[0]]);
          frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
          setDisabledBloodNo(true);
          document.getElementById("xm_id").focus();
          setDisabledBtn(false);
        }
      } else {
        // เช็คเมื่อยิงข้อมูลถุงเลือดเเล้วไม่พบข้อมูล
        Modal.warning({
          content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
          onOk() {
            frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
            setDisabledBloodNo(true);
            document.getElementById("xm_id").focus();
          },
        });
      }
    } catch (error) {}
  };

  const updateDataTran = async () => {
    const frm = frmTransBlood.getFieldValue();

    const resultLogin = await api.post(`/Confirm_password`, {
      password: frm.password,
    });
    const staff = resultLogin.data.user_name;
    const XmId = dataSource.map((item) => item.xm_id);
    const BloodNo = dataSource.map((item) => item.blood_no);
    const IdBlood = dataSource.map((item) => item.id);

    console.log("frm=>", frm);
    console.log("received_staff=>", frm.received_staff[0]);

    try {
      const resultUpdate = await api.post("/update_coss_trans", {
        ...frm,
        received_staff: frm.received_staff[0],
        xm_id: XmId,
        blood_no: BloodNo,
        staff: staff,
        id: IdBlood,
      });

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
          content: <div>จ่ายเลือดเรียบร้อย</div>,
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            close();
            frmTransBlood.resetFields();
            setDisabledXmId(true);
            setDataSource([]);
            setDataFingerTip([]);
            setPatientNote([]);
            setReactionBloodList([]);
            setReceiveBloodList([]);
            setPtGrouping([]);
            setPtAntibody([]);
            setPtDat([]);
            setThaiDate();
            setDataReqBloodHis();
            setDataPatientReq();
            setDataPatient();
            setDataFingerTipShow();
            setDataRecBloodHis();
            if (handleCancelTransBlood) {
              handleCancelTransBlood();
            } else {
              window.close();
            }
          },
          okButtonProps: { id: "ok" },
        });
      };
      if (resultUpdate.data.message === "success") {
        setIsModalConfirm(false);
        setPassword();
        closeModal();
        window.addEventListener("keydown", handleKeyDown);
      }
    } catch (error) {
      Modal.warning({
        content: <div>ไม่สามารถจ่ายเลือดได้ กรุณาตรวจสอบอีกครั้ง</div>,
      });
    }
  };

  useEffect(async () => {
    if (orderNumber == undefined) {
    } else {
      SetSearch(orderNumber);
    }

    await Fetch_rh_name();
    await Fetch_bloodgroup();
    await Fetch_ward();
    await Fetch_department();
    await Fetch_recivedStaff();

    document.getElementById("hn_id").focus();
  }, [orderNumber]);

  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : จ่ายเลือดใน WARD</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      <Form form={frmTransBlood}>
        <Row justify="center">
          <Col xs={23} lg={23} xl={23} flex="auto" offset={0}>
            <Row
              style={{
                marginTop: "5px",
                backgroundColor: "#ffff",
                padding: "20px",
                paddingBottom: "20px",
              }}
            >
              <Col xs={12} lg={12} xl={12}>
                <Row>
                  <Col xs={5} lg={3} xl={3}></Col>
                  <Col style={{ marginLeft: "-7px" }}>
                    <Form.Item name="hn" label="HN">
                      <Input
                        // maxLength={8}
                        id="hn_id"
                        onPressEnter={Search}
                        placeholder="HN"
                        style={{
                          width: "100%",
                          height: "30px",
                          fontSize: "16px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: "-3px" }}>
                  <Col xs={1} lg={1} xl={1}></Col>
                  <Col>
                    <Form.Item
                      name="xm_id"
                      label="ใบคล้องเลือด"
                      style={{ paddingRight: "6px" }}
                    >
                      <Input
                        maxLength={11}
                        id="xm_id"
                        onPressEnter={SearchXmId}
                        placeholder="ใบคล้องเลือด"
                        disabled={disabledXmId}
                        style={{
                          width: "100%",
                          height: "30px",
                          fontSize: "16px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} lg={1} xl={1}></Col>
                  <Col style={{ marginLeft: "-6px" }}>
                    <Form.Item
                      name="blood_no"
                      label="เลขถุงเลือด"
                      style={{ paddingRight: "6px" }}
                    >
                      <Input
                        onPressEnter={SearchBloodNo}
                        id="blood_no"
                        placeholder="เลขถุงเลือด"
                        disabled={disabledBloodNo}
                        style={{
                          width: "100%",
                          height: "30px",
                          fontSize: "16px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={12}
                lg={12}
                xl={12}
                style={{
                  width: "100%",
                  border: "1px solid",
                }}
              >
                <Row
                  style={{
                    marginLeft: "5px",
                    marginTop: "5px",
                    marginRight: "5px",
                  }}
                >
                  <Col span={24}>
                    <Row>
                      <Col xs={12} lg={12} xl={12}>
                        <Row>
                          <b>ข้อมูลผู้ขอเลือด</b>
                        </Row>
                      </Col>
                      <Col xs={12} lg={12} xl={12}>
                        <Row style={{ marginBottom: "-75px" }}>
                          <p
                            style={{
                              border: "1px solid",
                              // borderRadius: "5px",
                              fontSize: "35px",
                              // marginTop: "-7px",
                              backgroundColor:
                                dataPatient?.bloodgrp == "A"
                                  ? "#ffff00"
                                  : dataPatient?.bloodgrp == "B"
                                  ? "#ffb3ef"
                                  : dataPatient?.bloodgrp == "AB"
                                  ? "#00ccff"
                                  : dataPatient?.bloodgrp == "O"
                                  ? "#f4fff8"
                                  : " ",
                              marginLeft:
                                dataPatient?.bloodgrp == "AB" ? "1px" : "1px",
                              paddingLeft:
                                dataPatient?.bloodgrp == "AB" ? "10px" : "15px",
                              paddingRight:
                                dataPatient?.bloodgrp == "AB" ? "10px" : "15px",
                              textAlign: "center",
                            }}
                          >
                            {dataPatient?.bloodgrp.concat(dataPatient?.bloodrh)}
                          </p>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} lg={12} xl={12}>
                        <Row style={{ marginBottom: "-13px" }}>
                          <p style={{ fontSize: "12px" }}>
                            HN :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.hn}
                            </b>
                          </p>
                        </Row>
                        <Row style={{ marginBottom: "-13px" }}>
                          <p style={{ fontSize: "12px" }}>
                            ชื่อสกุล :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatient?.pname.concat(
                                dataPatient?.fname,
                                " ",
                                dataPatient?.lname
                              )}
                            </b>
                          </p>
                        </Row>
                        <Row style={{ marginBottom: "-13px" }}>
                          <p style={{ fontSize: "12px" }}>
                            วันเกิด :&nbsp;
                            <b style={{ color: "blue" }}> {thaiDate}</b>
                          </p>
                        </Row>
                        <Row style={{ marginBottom: "-13px" }}>
                          <p style={{ fontSize: "12px" }}>
                            เพศ : &nbsp;
                            <b style={{ color: "blue" }}>
                              {" "}
                              {dataPatient?.sex == 1
                                ? "ชาย"
                                : dataPatient?.sex == 2
                                ? "หญิง"
                                : ""}
                            </b>
                          </p>
                        </Row>
                        <Row>
                          <p style={{ fontSize: "12px" }}>
                            Ward :&nbsp;
                            <b style={{ color: "blue" }}>
                              {Ward_search?.wd_name}
                            </b>
                          </p>
                        </Row>
                      </Col>
                      <Col xs={12} lg={12} xl={12}>
                        <Row>
                          <p style={{ fontSize: "12px" }}></p>
                        </Row>
                        <Row>
                          <p style={{ fontSize: "12px" }}></p>
                        </Row>
                        <Row>
                          <p style={{ fontSize: "12px" }}></p>
                        </Row>
                        <Row>
                          <p style={{ fontSize: "12px" }}>
                            อายุ : &nbsp;
                            <b style={{ color: "blue" }}>{dataPatient?.age}</b>
                          </p>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Row justify="center" style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    pagination={false}
                    className="table_tranward"
                    bordered
                    columns={columnDataBlood}
                    dataSource={dataSource}
                    scroll={{ y: 100 }}
                    size="small"
                    width={"100%"}
                  ></Table>
                </Col>
                <Col span={24}>
                  <Row justify="end" style={{ marginTop: "10px" }}>
                    <Button
                      disabled={disabledBtn}
                      shape="round"
                      onClick={showModal_tranblood_ward}
                      icon={<BsDropletHalf />}
                      style={{
                        fontSize: "12px",
                        // marginLeft: "490px",

                        backgroundColor:
                          disabledBtn === false ? "#10d909" : "#EEEEEE",
                        color: disabledBtn === false ? "#ffffff" : "black",
                      }}
                    >
                      &nbsp;จ่ายเลือด
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        <Modal
          visible={isModalConfirm}
          onCancel={handleCancelConfirm}
          footer={false}
          width={420}
        >
          <Row style={{ marginLeft: "-8px", marginTop: "-15px" }}>
            <h style={{ fontSize: "14px" }}>ยืนยันการจ่ายเลือด</h>
          </Row>
          <Row style={{ paddingLeft: "26px" }}>
            <p style={{ marginLeft: "-8px" }}>
              เลขที่สั่ง :
              <b style={{ marginLeft: "8px", fontSize: "20px" }}>
                {dataPatientReq?.order_number}
              </b>
            </p>
          </Row>

          <Row style={{ marginTop: "-12px" }}>
            <Col span={24}>
              <Form.Item
                name="ward"
                label="ward"
                style={{ paddingLeft: "33px" }}
                //rules={[{ required: true }]}
              >
                <Select
                  onChange={Fetch_recivedStaff}
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เลือกward"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "90%",
                    fontSize: "14px",
                    height: "32px",
                  }}
                >
                  {ward?.map((item) => (
                    <Option key={item.ward} value={item.ward}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: "-19px" }}>
            <Col span={24}>
              <Form.Item
                name="depcode"
                label="จุดที่ขอ"
                style={{ paddingLeft: "20px" }}
              >
                <Select
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เลือกจุดที่ขอ"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "90%",
                    fontSize: "14px",
                    height: "32px",
                  }}
                >
                  {department?.map((item) => (
                    <Option key={item.depcode} value={item.depcode}>
                      {item.department}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: "-19px" }}>
            <Col span={24}>
              <Form.Item
                name="received_staff"
                label="ผู้มารับเลือด"
                style={{ marginLeft: "-6px" }}
                //rules={[{ required: true }]}
              >
                <Select
                  mode="tags"
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เลือกผู้มารับเลือด"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "90%",
                    fontSize: "14px",
                    height: "32px",
                  }}
                >
                  {recivedStaff?.map((item) => (
                    <Option key={item.sr_name} value={item.sr_name}>
                      {item.sr_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: "-19px" }}>
            <Col span={20}>
              <Form.Item
                name="password"
                label="Password"
                style={{ marginLeft: "6px" }}
                //rules={[{ required: true }]}
              >
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  style={{ width: "80%" }}
                  onPressEnter={updateDataTran}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                disabled={!password}
                shape="round"
                onClick={updateDataTran}
                style={{
                  marginLeft: "-40px",
                  backgroundColor: !password ? "" : "#47B5FF",
                  color: !password ? "" : "#ffffff",
                }}
              >
                &nbsp;ยืนยัน
              </Button>
            </Col>
          </Row>
        </Modal>
        {/* ------------------------------------------------------------ */}
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={Modal_tranblood_ward}
          onOk={up_cross_tran}
          onCancel={() => {
            SetModal_tranblood_ward(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          // okText="ยืนยัน"
          // cancelText="ยกเลิก"
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>
          <Input.Password
            id="passcon_type_id"
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
                up_cross_tran();
              }
            }}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalcoSetModal_tranblood_wardnfirm_cross(false),
                  setPassword();
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
              onClick={up_cross_tran}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
        {/* --------------------------------------------------------------- */}
      </Form>
    </>
  );
};
export default Patient_trans_blood;
