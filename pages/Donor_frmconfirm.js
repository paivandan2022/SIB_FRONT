import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import moment from "moment";
import "moment/locale/th";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../lib/api";
import env from "/env.json";

const { TabPane } = Tabs;

const Donor_frmblood = () => {
  const [frmConfirm] = Form.useForm();
  const [dataDonor_Confirm, setDataDonor_Confirm] = useState();
  const [dataDonetion, setDataDonetion] = useState();
  const [hisdonor_blood, setHisdonor_Blood] = useState();
  const [hisdonor_blood_view, setHisdonor_Blood_View] = useState();
  const [Loading_spin, setLoading_spin] = useState(false);

  const [password, setPassword] = useState();
  const [isModalHis, setIsModalHis] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [queslist, setQueslist] = useState(); //TB questionnaire_list

  const router = useRouter();

  const showModal = (value) => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const Fetch_frmconfirm = async (value) => {
    setLoading_spin(true);
    const result = await api.get("/Get_donor_list_open", {
      params: {
        pid: value,
      },
    });
    setDataDonor_Confirm(result.data[0]);
    console.log("Fetch_frmconfirm", result.data[0]);
    setLoading_spin(false);
  };
  const Fetch_frmconfirm_donetion = async () => {
    const result = await api.get("/Get_data_donetion", {
      params: {
        pid: dataDonor_Confirm?.pid_donor,
      },
    });
    setDataDonetion(result.data[0]);
    Get_His_donor_blood(result.data[0]?.donor_no);
    console.log("Fetch_frmconfirm_donetion", result.data[0]);
  };

  const fetch_questionnaire = async () => {
    const result = await api.get("/fetch_questionnaire", {
      params: {
        dn: dataDonor_Confirm?.dn,
      },
    });
    console.log("q", result.data);

    setQueslist(result.data);
  };

  useEffect(async () => {
    if (router?.query?.id) {
      await fetch_questionnaire();
      await Fetch_frmconfirm_donetion(dataDonor_Confirm?.pid_donor);
      await Fetch_frmconfirm(router?.query?.id);
    }
  }, [router?.query?.id, dataDonor_Confirm?.pid_donor]);

  const handleOk = async (value) => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formData = frmConfirm.getFieldsValue();
        console.log("formData----------**", formData);
        const result1 = await api.put(`/Update_staff_check`, {
          ...formData,
          staff_check:
            resultLogin.data.pname +
            resultLogin.data.fname +
            " " +
            resultLogin.data.lname,
          pid_donor: dataDonor_Confirm?.pid_donor,
          pid: dataDonor_Confirm?.pid,
        });
        setIsModalVisible(false);
        setPassword();
        // window.close();
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

  const Get_His_donor_blood = async (value) => {
    console.log(value);
    const result = await api.get("/Get_Donor_Blood", {
      params: {
        donor_no: value,
      },
    });
    console.log("Get_His_donor_blood", result?.data);
    setHisdonor_Blood(result?.data);
  };
  const His_popup = async (value) => {
    setIsModalHis(true);
    console.log("value------->", value);
    const result = await api.get("/Get_His_Donation_blood", {
      params: {
        dn: value,
      },
    });
    console.log("Get_His_donor_blood", result?.data);
    setHisdonor_Blood_View(result?.data);
    console.log("--->", hisdonor_blood_view);
  };
  const columns = [
    {
      title: "ครั้งที่",
      dataIndex: "donor_count",
      key: "donor_count",
      align: "center",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "Unitnumber_dot",
      key: "Unitnumber_dot",
      // align : "center",
    },
    {
      title: "วันที่บริจาค",
      dataIndex: "donor_date",
      key: "donor_date",
      // align : "center"
    },
    {
      title: "Gr",
      dataIndex: "bag_gr",
      key: "bag_gr",
      align: "center",
    },
    {
      title: "ผลตรวจ",
      dataIndex: "blood_result",
      key: "blood_result",
      align: "center",
    },
    {
      title: "",
      dataIndex: "blood_result",
      key: "blood_result",
      align: "center",
      render: (text, record) => (
        <Tooltip title="ดูข้อมูล">
          <Button
            style={{ fontSize: "5px", color: "green" }}
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => His_popup(record.dn)}
            //disabled={record.status === "4" ? "true" : "" || record.status === "5" ? "true" : "" }
          />
        </Tooltip>
      ),
    },
  ];
  const columns_modal = [
    {
      title: "ครั้งที่",
      dataIndex: "donor_count",
      key: "donor_count",
      align: "center",
    },
    {
      title: "donor_no",
      dataIndex: "donor_no",
      key: "donor_no",
      align: "center",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "Unitnumber_dot",
      key: "Unitnumber_dot",
      align: "center",
    },
    {
      title: "วันที่บริจาค",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
    },
    {
      title: "วันที่บริจาคครั้งถัดไป",
      dataIndex: "to_donate_date",
      key: "to_donate_date",
      align: "center",
    },
    {
      title: "สถานที่",
      dataIndex: "mobname",
      key: "mobname",
      // align : "center"
    },
    {
      title: "Gr",
      dataIndex: "bag_gr",
      key: "bag_gr",
      align: "center",
    },
    {
      title: "ผลตรวจ",
      dataIndex: "blood_result",
      key: "blood_result",
      align: "center",
    },
  ];

  const columnQuestList = [
    // {
    //   title: "ที่",
    //   dataIndex: "quest_id",
    //   key: "quest_id",
    //   align: "center",
    //   render: (text, record, index) => {
    //    return index+1
    //   },
    // },
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
      dataIndex: "qn_value",
      key: "qn_value",
      width: 150,
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            {record.quest_topic !== 1 && record.qn_value !== null ? (
              <Form.Item
                style={{
                  marginTop: "-17px",
                  marginBottom: "-14px",
                  marginLeft: "0.5px",
                }}
                name={[record.quest_id, "ans"]}
              >
                {/* <Checkbox.Group options={options} defaultValue={["ใช่"]} checked={["ใช่"]}/> */}
                <Radio.Group defaultValue={record.qn_value}>
                  <Radio value="1">ใช่</Radio>
                  <Radio value="0">ไม่ใช่</Radio>
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
      dataIndex: "qn_more",
      key: "qn_more",
      width: 120,
      align: "center",
    },
  ];

  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : ยืนยันข้อมูลผู้บริจาค</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>

      <Spin size="large" tip="Loading..." spinning={Loading_spin}>
        <Row justify="center">
          <Col span={23}>
            <Tabs type="card" style={{ marginTop: "-5px" }}>
              <TabPane tab="ข้อมูลผู้บริจาค" key="1">
                <Card style={{ marginTop: "-15px" }}>
                  <Row>
                    <Col span={12} offset={1}>
                      <Row>
                        <Col>
                          <Avatar
                            width="20%"
                            src={`${env.PATH_IMG}/image/${dataDonor_Confirm?.image}?pathType=2&date=${moment().format(
                              "HHmmss"
                            )}`}
                             
                            size={80}
                            icon={<UserOutlined />}
                            style={{ marginTop: "10px" }}
                          />
                        </Col>
                        <Col offset={1}>
                          <Form.Item>
                            <h3>
                              {" "}
                              เลขที่ผู้บริจาค :{" "}
                              <b
                                className="font-color"
                                style={{ fontSize: "14px" }}
                              >
                                {dataDonor_Confirm?.donor_no}
                              </b>
                            </h3>
                          </Form.Item>
                          <Form.Item style={{ marginTop: "-32px" }}>
                            <h3>
                              เลขที่บัตรประชาชน :
                              <b
                                className="font-color"
                                style={{ fontSize: "14px" }}
                              >
                                &nbsp; {dataDonor_Confirm?.cid}
                              </b>
                            </h3>
                          </Form.Item>

                          <Form.Item style={{ marginTop: "-35px" }}>
                            <h3>
                              {" "}
                              หมู่เลือด :{" "}
                              <b className="font-color">
                                {dataDonor_Confirm?.bloodgroup}
                              </b>
                            </h3>
                          </Form.Item>

                          <Form.Item style={{ marginTop: "-30px" }}>
                            {" "}
                            ชื่อ{" "}
                            <b className="font-color">
                              {dataDonor_Confirm?.fullname}
                            </b>{" "}
                            &nbsp; เพศ{" "}
                            <b className="font-color">
                              {dataDonor_Confirm?.sex === "1" ? "ชาย" : "หญิง"}
                            </b>{" "}
                            <br />
                            อายุ{" "}
                            <b className="font-color">
                              {dataDonor_Confirm?.age}
                            </b>
                          </Form.Item>

                          <Form.Item style={{ marginTop: "-30px" }}>
                            {" "}
                            อาชีพ{" "}
                            <b className="font-color">
                              {dataDonor_Confirm?.occu_name}
                            </b>
                          </Form.Item>

                          <Form.Item
                            style={{ marginTop: "-29px", width: "100%" }}
                          >
                            ที่อยู่ บ้านเลขที่ &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.addrpart}
                            </b>
                            &nbsp; หมู่ที่ &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.moopart}
                            </b>
                            &nbsp; ถนน &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.roadpart === ""
                                ? "-"
                                : dataDonor_Confirm?.roadpart}
                            </b>
                            &nbsp; ซอย &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.soipart === ""
                                ? "-"
                                : dataDonor_Confirm?.soipart}
                            </b>
                          </Form.Item>

                          <Form.Item style={{ marginTop: "-32px" }}>
                            ตำบล &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.DISTRICT_NAME}
                            </b>{" "}
                            &nbsp; &nbsp; อำเภอ &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.AMPHUR_NAME} &nbsp;
                            </b>{" "}
                            &nbsp; จังหวัด &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.PROVINCE_NAME}
                            </b>{" "}
                            &nbsp;
                          </Form.Item>

                          <Form.Item style={{ marginTop: "-30px" }}>
                            ไปรษณีย์ &nbsp;
                            <b className="font-color">
                              {dataDonor_Confirm?.postcode}
                            </b>
                          </Form.Item>
                        </Col>
                      </Row>

                      <h>ประวัติการบริจาค</h>
                      <hr />

                      <Table
                        bordered
                        size="small"
                        className="xm"
                        dataSource={hisdonor_blood}
                        columns={columns}
                        style={{ fontSize: "5px" }}
                      />
                    </Col>

                    <Col span={10} offset={1}>
                      <Form.Item>
                        <h3>
                          ข้อมูลถุงเลือด :{" "}
                          <b className="font-color">{dataDonetion?.unit_no}</b>{" "}
                        </h3>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        <h3>
                          {" "}
                          ประเภทถุง :{" "}
                          <b className="font-color">{dataDonetion?.bagtype}</b>
                        </h3>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ครั้งที่แล้วบริจาค :{" "}
                        <b className="font-color">{dataDonetion?.type_blood}</b>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ผลการบริจาคครั้งที่ผ่านมา :{" "}
                        <b className="font-color">
                          {dataDonetion?.last_exception_name} &nbsp;{" "}
                          {dataDonetion?.last_exception === "2"
                            ? `เหตุผล : ${dataDonetion?.last_exception_note}`
                            : ""}
                        </b>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        รายละเอียดการบริจาค :{" "}
                        <b className="font-color">
                          {dataDonetion?.donation_datail === "3"
                            ? dataDonetion?.donate_name +
                              " " +
                              dataDonetion?.donation_datail_note
                            : dataDonetion?.donate_name}
                        </b>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ข้อมูลทั่วไป : น้ำหนัก :{" "}
                        <b className="font-color">
                          {dataDonetion?.donor_weight}
                        </b>{" "}
                        กก.&nbsp; ส่วนสูง :{" "}
                        <b className="font-color">
                          {dataDonetion?.donor_hight}
                        </b>{" "}
                        ซม.
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ความดันโลหิต :{" "}
                        <b className="font-color">
                          {dataDonetion?.blood_pressure_h}/
                          {dataDonetion?.blood_pressure_l}
                        </b>{" "}
                        มม.ปรอท
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ชีพจร :{" "}
                        <b className="font-color">
                          {dataDonetion?.pulse_value}
                        </b>{" "}
                        ครั้ง/นาที &nbsp; ผล :{" "}
                        <b className="font-color">
                          {dataDonetion?.pulse === "0" ? "ปกติ" : "ไม่ปกติ"}
                        </b>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        หัวใจ/ปอด :{" "}
                        <b className="font-color">
                          {dataDonetion?.heart === "0" ? "ปกติ" : "ไม่ปกติ"}
                        </b>
                      </Form.Item>

                      <Form.Item style={{ marginTop: "-32px" }}>
                        ความเข้มโลหิต :{" "}
                        <b className="font-color">
                          {dataDonetion?.blood_depth === "0"
                            ? "ปกติ"
                            : "ไม่ปกติ"}
                        </b>
                      </Form.Item>

                      <Form.Item
                        style={{ marginTop: "-32px", marginBottom: "-10px" }}
                      >
                        HB : <b className="font-color">{dataDonetion?.hb}</b>{" "}
                        g/dl &nbsp; ผล :{" "}
                        <b className="font-color">
                          {dataDonetion?.hb_normal === "0" ? "ปกติ" : "ไม่ปกติ"}
                        </b>
                      </Form.Item>

                      <hr />
                      <p>
                        Deferred due to :{" "}
                        <b className="font-color">{dataDonetion?.defer}</b>
                        <br />
                        กินยาที่มีผลต่อเกล็ดเลือด :{" "}
                        <b className="font-color">
                          {dataDonetion?.medic === "0" ? "ไม่ใช่" : "ใช่"}
                        </b>
                        <br />
                        Under volume :{" "}
                        <b className="font-color">
                          {dataDonetion?.under_volume === "0"
                            ? "ไม่ใช่"
                            : "ใช่"}
                        </b>
                        <br />
                        Hight volume :{" "}
                        <b className="font-color">
                          {dataDonetion?.high_volume === "0" ? "ไม่ใช่" : "ใช่"}
                        </b>
                        <br />
                        Discarded :{" "}
                        <b className="font-color">
                          {dataDonetion?.discard === "0" ? "ไม่ใช่" : "ใช่"}
                        </b>
                        <br />
                      </p>
                      <hr />
                      <p>หมายเหตุเพิ่มเติม : {dataDonetion?.donor_note} </p>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-10px" }}>
                    <Col span={23}>
                      <h>เจ้าหน้าที่</h>
                      <hr />
                      <Form.Item>
                        <b>เจ้าหน้าที่ทะเบียน : </b>
                        {dataDonetion?.staff_register}
                        &nbsp;| <b>เจ้าหน้าที่เตรียมถุง :</b>{" "}
                        {dataDonetion?.staff_make}
                        &nbsp;| <b>เจ้าหน้าที่ผู้เจาะเก็บ : </b>
                        {dataDonetion?.staff_drill}
                        &nbsp;| <b>เจ้าหน้าที่เก็บตัวอย่างโลหิต :</b>{" "}
                        {dataDonetion?.staff_keep}
                        {dataDonetion?.staff_check === null ? (
                          " "
                        ) : (
                          <h>
                            &nbsp; | <b>เจ้าหน้าที่ผู้ตรวจสอบ : </b>{" "}
                            {dataDonetion?.staff_check}
                          </h>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="end" style={{ marginTop: "-20px" }}>
                    <Form form={frmConfirm}>
                      <Button
                        type="primary"
                        onClick={showModal}
                        disabled={
                          dataDonor_Confirm?.status === "4"
                            ? "true"
                            : "" || dataDonor_Confirm?.status === "5"
                            ? "true"
                            : ""
                        }
                      >
                        ตรวจสอบข้อมูล
                      </Button>
                    </Form>
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="แบบสอบถามสำหรับผู้บริจาคโลหิต" key="2">
                <Row
                  justify="center"
                  style={{
                    marginTop: "-15px",
                  }}
                >
                  <Col span={23}>
                    <Table
                      pagination={false}
                      className="xm"
                      bordered
                      columns={columnQuestList}
                      dataSource={queslist}
                    ></Table>
                  </Col>
                </Row>
                {queslist?.[1]?.qn_save_staff && (
                  <Row style={{ marginTop: "3px", paddingBottom: "10px" }}>
                    <Col offset={16}>
                      <h style={{ marginLeft: "30px" }}>
                        ผู้บันทึก: <b>{queslist?.[1]?.qn_save_staff}</b>
                      </h>
                    </Col>
                    <Col style={{ marginLeft: "15px" }}>
                      <h
                        style={
                          {
                            // marginLeft: "-55px",
                          }
                        }
                      >
                        เวลาที่บันทึก: <b>{queslist?.[1]?.save_datetime}</b>
                      </h>
                    </Col>
                  </Row>
                )}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
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
            id="pass"
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Modal
          visible={isModalHis}
          width={1000}
          footer={false}
          onCancel={() => {
            setIsModalHis(false);
          }}
        >
          <Row style={{ marginBottom: "10px" }}>
            <b style={{ fontSize: "18px" }}>รายละเอียดประวัติการบริจาค</b>
          </Row>
          <Table
            dataSource={hisdonor_blood_view}
            columns={columns_modal}
            style={{ fontSize: "5px" }}
            pagination={false}
            className="xm"
          />
        </Modal>
      </Spin>
    </>
  );
};

export default Donor_frmblood;
