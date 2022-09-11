import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import os from "os";
import { useEffect, useState } from "react";
import api from "../lib/api";
import env from "/env.json";


const { TabPane } = Tabs;

const Donor_Search_donor_view = ({ computerName }) => {
  const [history_donation, setHistory_donation] = useState();
  const [data_donation, setData_donation] = useState();
  const [data_his_regis, setData_his_regis] = useState([]);

  const [Spinloading, setSpinLoading] = useState(false);

  const router = useRouter();

  useEffect(async () => {
    if (router?.query?.pid) {
      await Fetch_donor_view(router?.query?.pid);
    }
  }, [router?.query?.pid]);

  const Fetch_donor_view = async () => {
    console.log("pid =>", router?.query?.pid);
    setSpinLoading(true);
    const result = await api.get("/Get_Search_donor_view", {
      params: {
        pid: router?.query?.pid,
      },
    });
    setData_donation(result.data[0]);
    console.log("data donor ===>", result.data[0]);
    Get_History_donation(result.data[0]?.donor_no);
    Get_History_regis(result.data[0]?.cid);
    setSpinLoading(false);
  };
  const Get_History_donation = async (value) => {
    const result = await api.get("/Get_Donor_Blood", {
      params: {
        donor_no: value,
      },
    });
    console.log("data_his ==>", result?.data);
    setHistory_donation(result?.data);
  };
  const Get_History_regis = async (value) => {
    console.log("Get_History_regis===>", value);
    const result = await api.get("/Get_History_regis", {
      params: {
        cid: value,
      },
    });
    console.log("data_his_regis ==>", result?.data[0]);
    setData_his_regis(result?.data);
  };
  const columns_his_danation = [
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
  const columns_his_regis = [
    {
      title: "ลำดับ",
      dataIndex: "",
      key: "",
      align: "center",
      width: 90,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "date_insert",
      key: "date_insert",
      align: "center",
      width: 200,
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      width: 250,
      render: (text, record, index) => {
        return `${record.pname}${record.fname}${" "}${record.lname}`;
      },
    },

    {
      title: "สถานะ",
      dataIndex: "status_name",
      key: "status_name",
      align: "center",
      width: 150,
      render: (text, record) => (
        <div style={{ color: record.status === "5" ? "red" : "green" }}>
          {text}
        </div>
      ),
    },
    {
      title: "เจ้าหน้าที่ลงทะเบียน",
      dataIndex: "staff_register",
      key: "staff_register",
      align: "center",
      width: 200,
      render: (text, record) => {
        return `${
          record.staff_register == null
            ? "ลงทะเบียนตัวตนเอง"
            : record.staff_register
        }`;
      },
    },
    {
      title: "NOTE",
      dataIndex: "eject_note",
      key: "eject_note",
      render: (text, record) => {
        return (
          <>
            {" "}
            {record.staff_eject == null
              ? ""
              : `เจ้าหน้าที่ยกเลิก  : ${record.staff_eject}`}{" "}
            <br />
            <div style={{ color: "red" }}>{record.eject_note}</div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : ข้อมูลผู้บริจาค</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      <div style={{ padding: "0 0px", margin: "50px 0" }}>
        <Spin size="large" tip="Loading..." spinning={Spinloading}>
          <Row justify="center" style={{marginTop:"-42px"}}>
            <Col span={22}>
                <Tabs type="card">
                  <TabPane tab="ข้อมูลผู้บริจาค" key="1">
                  <Card style={{marginTop:"-15px"}}>
                    <Row>
                      <Col span={11} offset={1}>
                        <Row justify="center">
                          <Col>
                            <Row justify="center">
                              <div>
                                <Avatar
                                  src={`${env.PATH_IMG}/image/${
                                    data_donation?.image
                                  }?pathType=2&date=${moment().format(
                                    "HHmmss"
                                  )}`}
                                  width="80px"
                                  size={80}
                                  icon={<UserOutlined />}
                                />
                              </div>
                            </Row>
                            <hr />
                            <Row justify="center">
                              <Space
                                align="start"
                                direction="vertical"
                                size={1}
                              >
                                <p>
                                  <b>ชื่อ-นามสกุล : </b>
                                  <b className="font-color">
                                  {data_donation?.pname}
                                  {data_donation?.fname} {data_donation?.lname}
                                  </b>
                                </p>
                                <p>
                                  <b>วันเกิด : </b>
                                  <b className="font-color">
                                  {data_donation?.date_birthday}</b>
                                   <b>&nbsp; อายุ : </b>
                                   <b className="font-color">
                                  {data_donation?.cal_age}{" "}</b>
                                </p>
                                <p>
                                  <b>เพศ : </b>
                                 < b className="font-color">
                                  {data_donation?.sex_name}{" "}
                                  </b>
                                </p>
                                <p>
                                  <b>อาชีพ : </b>
                                  < b className="font-color">
                                  {data_donation?.occu_names}{" "}
                                  </b>
                                </p>
                                <p>
                                  <b>ที่อยู่ตามบัตรประชาชน : </b>บ้านเลขที่{" "}
                                  <b className="font-color">
                                    {data_donation?.addrpart}
                                  </b>{" "}
                                  &nbsp; หมู่ที่{" "}
                                  <b className="font-color">
                                    {data_donation?.moopart}
                                  </b>
                                  &nbsp; ถนน{" "}
                                  <b className="font-color">
                                    {data_donation?.roadpart === ""
                                      ? "-"
                                      : data_donation?.roadpart}
                                  </b>
                                  &nbsp; ซอย{" "}
                                  <b className="font-color">
                                    {data_donation?.soipart === ""
                                      ? "-"
                                      : data_donation?.soipart}
                                  </b>
                                  <br />
                                  ตำบล{" "}
                                  <b className="font-color">
                                    {data_donation?.tmp_name}
                                  </b>{" "}
                                  &nbsp; อำเภอ{" "}
                                  <b className="font-color">
                                    {data_donation?.amp_name}{" "}
                                  </b>{" "}
                                  <br /> จังหวัด{" "}
                                  <b className="font-color">
                                    {data_donation?.pro_name}
                                  </b>{" "}
                                  &nbsp; ไปรษณีย์{" "}
                                  <b className="font-color">
                                    {data_donation?.postcode}
                                  </b>
                                </p>
                                <p>
                                  <b>ที่อยู่ปัจจุบัน : </b>บ้านเลขที่{" "}
                                  <b className="font-color">
                                    {data_donation?.addrpart_new}
                                  </b>{" "}
                                  &nbsp; หมู่ที่{" "}
                                  <b className="font-color">
                                    {data_donation?.moopart_new}
                                  </b>
                                  &nbsp; ถนน{" "}
                                  <b className="font-color">
                                    {data_donation?.roadpart_new === ""
                                      ? "-"
                                      : data_donation?.roadpart_new}
                                  </b>
                                  &nbsp; ซอย{" "}
                                  <b className="font-color">
                                    {data_donation?.soipart_new === ""
                                      ? "-"
                                      : data_donation?.soipart_new}
                                  </b>
                                  <br />
                                  ตำบล{" "}
                                  <b className="font-color">
                                    {data_donation?.tmp_name_new}
                                  </b>{" "}
                                  &nbsp; อำเภอ{" "}
                                  <b className="font-color">
                                    {data_donation?.amp_name_new}{" "}
                                  </b>{" "}
                                  <br /> จังหวัด{" "}
                                  <b className="font-color">
                                    {data_donation?.pro_name_new}
                                  </b>{" "}
                                  &nbsp; ไปรษณีย์{" "}
                                  <b className="font-color">
                                    {data_donation?.postcode_new}
                                  </b>
                                </p>
                                <p>โทรศัพท์ :  <b className="font-color">{data_donation?.phone}</b></p>
                                <p>Email :  <b className="font-color">{data_donation?.email}</b></p>
                              </Space>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={11}>
                        <Space align="start" direction="vertical" size={1}>
                          <p>
                            <b>THAI ID : {data_donation?.cid}</b>
                          </p>
                          <p>
                            <b>Donor No. : {data_donation?.donor_no}</b>
                          </p>
                          <p>
                            <b>
                              หมู่เลือด : {data_donation?.bloodgroup}
                              {data_donation?.bloodgroup_rh}
                            </b>
                          </p>

                          {router?.query?.pid}
                          {computerName}
                        </Space>
                        <Card title="ข้อมูลผู้บริจาค"></Card>
                      </Col>
                      <Col offset={1}></Col>
                    </Row></Card>
                  </TabPane>
                  <TabPane tab="ผลตรวจการบริจาคครั้งที่ผ่านมา" key="2">
                    <Table
                      columns={columns_his_danation}
                      dataSource={history_donation}
                      size="small"
                      className="xm"
                      bordered
                      pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                    />
                  </TabPane>
                  <TabPane tab="ประวัติการลงทะเบียนบริจาค" key="3">
                    <Table
                      columns={columns_his_regis}
                      dataSource={data_his_regis}
                      size="small"
                      bordered
                      className="xm"
                      pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                    />
                  </TabPane>
                </Tabs>
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default Donor_Search_donor_view;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
