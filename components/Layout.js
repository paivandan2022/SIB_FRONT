import {
  PoweroffOutlined,
  StockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Avatar,
  Badge,
  Col,
  Layout,
  Menu,
  Modal,
  Row,
  Space,
} from "antd";
import { RiErrorWarningFill } from "react-icons/ri";

import moment from "moment";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { BiDonateBlood, BiFileFind, BiTransfer } from "react-icons/bi";
import { BsClipboardCheck, BsJournalCheck } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import api from "../lib/api";
import user from "../lib/user";

import env from "/env.json";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const popup = () => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1366;
  const appH = 580;
  const url = "/Patient_trans_blood";
  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;
  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};
const popup_ward = () => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 800;
  const appH = 400;
  const urls = "/patient_trans_ward";
  const title = "TEST_s";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(urls, title, str);
};
const App = ({ children, keyTab }) => {
  const [userData, setUserData] = useState({});
  const [qc_not_review, setQc_not_review] = useState();
  const [donor_not_done, setDonor_not_done] = useState();

  useEffect(async () => {
    const data = user.getUser();
    setUserData(data);
    Load_check_qc_not_review();
    Load_check_donor_not_done();
  }, []);

  const Load_check_qc_not_review = async () => {
    const result = await api.get("/Get_result_not_review");
    setQc_not_review(result.data);
    // console.log("--------", result.data);
  };
  const Load_check_donor_not_done = async () => {
    const result = await api.get("/check_donor_not_done");
    setDonor_not_done(result.data);
    // console.log("--------", result.data);
  };

  const Ddata = donor_not_done?.map((item) => item);

  let record_sum = 0;

  for (let index = 0; index < Ddata?.length; index++) {
    record_sum++;
  }
  // console.log("record_sum", record_sum);
  useEffect(() => {
    setInterval(() => {
      Load_check_qc_not_review();
      Load_check_donor_not_done();
    }, 10000);
  }, []);
  const onclickMenu = (input) => {
    switch (input.key) {
      case "home":
        Router.push("/home");
        break;
      case "dashboard_bloodstcok":
        Router.push("/dashboard_bloodstcok");
        break;
      case "stock_blood":
        Router.push("/stock_blood");
        break;
      case "stock_import_blood":
        Router.push("/stock_import_blood");
        break;
      case "stock_blooddetails":
        Router.push("/stock_blooddetails");
        break;
      case "stock_view_blooddetail":
        Router.push("/stock_view_blooddetail");
        break;
      case "stock_blood_release":
        Router.push("/stock_blood_release");
        break;
      case "stock_return_blood":
        Router.push("/stock_return_blood");
        break;
      case "stock_deposit_blood":
        Router.push("/stock_deposit_blood");
        break;
      case "stock_split_bags":
        Router.push("/stock_split_bags");
        break;
      case "Donor_register":
        Router.push("/Donor_register");
        break;
      case "Donor_donation_list":
        Router.push("/Donor_donation_list");
        break;
      case "Donor_Separates_Bloods":
        Router.push("/Donor_Separates_Bloods");
        break;
      case "Donor_result_import":
        Router.push("/Donor_result_import");
        break;
      case "Donor_import_txt":
        Router.push("/Donor_import_txt");
        break;
      case "Donor_Search_donor":
        Router.push("/Donor_Search_donor");
        break;
      case "Donor_settingMobile":
        Router.push("/Donor_settingMobile");
        break;
      case "Patient_trans_blood":
        popup();
        break;
      case "showuser":
        Router.push("/showuser");
        break;
      case "setting":
        Router.push("/setting");
        break;
      case "Patient_blood_request":
        Router.push("/Patient_blood_request");
        break;
      case "Patent_blood_request_lab_new":
        Router.push("/Patent_blood_request_lab_new");
        break;
      case "trans_blood_hospital":
        Router.push("/trans_blood_hospital");
        break;
      case "trans_blood_history":
        Router.push("/trans_blood_history");
        break;
      case "trans_blood_return":
        Router.push("/trans_blood_return");
        break;
      case "Setting_blood_type":
        Router.push("/Setting_blood_type");
        break;
      case "Setting_Inf":
        Router.push("/Setting_Inf");
        break;
      case "Patient_add_reaction":
        Router.push("/Patient_add_reaction");
        break;
      case "qc":
        Router.push("/qc");
        break;
      case "Patient_view":
        Router.push("/Patient_view");
        break;
      case "patient_trans_ward":
        popup_ward();
        break;
      case "report_index":
        Router.push("/report_index");
        break;
      case "stock_blood_pool":
        Router.push("/stock_blood_pool");
        break;
      case "setting_lab_item":
        Router.push("/setting_lab_item");
        break;

      default:
        break;
    }
  };
  const onclickMenu_Left = (input) => {
    switch (input.key) {
      case "report_stock_blood_exp":
        Router.push("/report_stock_blood_exp");
        break;
      case "report_stock_Crossmatch":
        Router.push("/report_stock_Crossmatch");
        break;
      case "report_stock_inventory":
        Router.push("/report_stock_inventory");
        break;
      case "report_stock_payblood_return":
        Router.push("/report_stock_payblood_return");
        break;
      case "report_stock_Separates_Bloods":
        Router.push("/report_stock_Separates_Bloods");
        break;
      case "report_stock_takeblood":
        Router.push("/report_stock_takeblood");
        break;
      case "report_stock_tran_get_blood":
        Router.push("/report_stock_tran_get_blood");
        break;
      case "report_stock_tranblood":
        Router.push("/report_stock_tranblood");
        break;
      case "report_donor_bloodresults":
        Router.push("/report_donor_bloodresults");
        break;
      case "report_donor_getneedle":
        Router.push("/report_donor_getneedle");
        break;
      case "report_donor_infect":
        Router.push("/report_donor_infect");
        break;
      case "report_donor_donationnotification":
        Router.push("/report_donor_donationnotification");
        break;
      case "report_donor_out_area_agency":
        Router.push("/report_donor_out_area_agency");
        break;
      case "report_donor_rare_blood_type":
        Router.push("/report_donor_rare_blood_type");
        break;
      case "report_daily_bloodresults":
        Router.push("/report_daily_bloodresults");
        break;
      case "report_daily_CT_ratio":
        Router.push("/report_daily_CT_ratio");
        break;
      case "report_daily__CT_ratio_ward":
        Router.push("/report_daily__CT_ratio_ward");
        break;
      case "report_daily_Antibody":
        Router.push("/report_daily_Antibody");
        break;
      case "report_daily_Checklist_Summary":
        Router.push("/report_daily_Checklist_Summary");
        break;
      case "report_daily_P4P":
        Router.push("/report_daily_P4P");
        break;
      case "report_daily_cut_blood":
        Router.push("/report_daily_cut_blood");
        break;
      case "report_daily_review_useblood":
        Router.push("/report_daily_review_useblood");
        break;
      case "report_daily_depositblood":
        Router.push("/report_daily_depositblood");
        break;
      case "report_daily_tranblood":
        Router.push("/report_daily_tranblood");
        break;
      case "report_daily_Turnaround_Time":
        Router.push("/report_daily_Turnaround_Time");
        break;
      default:
        break;
    }
  };
  const onLogout = () => {
    Modal.confirm({
      title: "Are you sure !",
      content: "SIGN OUT",
      onOk: () => {
        Router.push("/");
        // setUserData("");
        localStorage.clear();
      },
    });
  };
  useEffect(() => {
    const userDataTemp = user.getUser();
    userDataTemp.name = `${userDataTemp.fname}  ${userDataTemp.lname} ${userDataTemp.pic}`;
    setUserData(userDataTemp);
  }, []);
  return (
    <>
      <Layout>
        <Affix offsetTop={0}>
          <Header style={{ height: "40px", backgroundColor: "#41bcc0" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[keyTab]}
              onClick={onclickMenu}
              style={{
                height: "40px",
                fontSize: "14px",
                backgroundColor: "#41bcc0",
              }}
            >
              {["User", "Admin"].includes(userData?.user_type) && (
                <Menu.Item
                  key="home"
                  icon={
                    <IoHomeOutline
                      style={{
                        fontSize: "16px",
                        marginTop: "-10px",
                        color: "white",
                      }}
                    />
                  }
                  style={{ marginTop: "-12px" }}
                >
                  HOME
                </Menu.Item>
              )}

              <SubMenu
                key="sub3"
                icon={
                  <BiDonateBlood
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                title={
                  donor_not_done?.length > 0 ? (
                    <Badge
                      count={
                        <RiErrorWarningFill
                          style={{
                            color: "#f5222d",
                            fontSize: "12px",
                          }}
                        />
                      }
                    >
                      <h
                        style={{
                          color: "#ffffffa6",
                        }}
                      >
                        DONOR
                      </h>
                    </Badge>
                  ) : (
                    "DONOR"
                  )
                }
                style={{ marginTop: "-12px" }}
              >
                <Menu.Item key="Donor_register">ลงทะเบียน</Menu.Item>
                <Menu.Item key="Donor_donation_list">
                  {donor_not_done?.length > 0 ? (
                    <Badge count={record_sum} offset={[15, 10]}>
                      <h
                        style={{
                          color: "#ffffffa6",
                        }}
                      >
                        รายการบริจาคเลือด
                      </h>
                    </Badge>
                  ) : (
                    "รายการบริจาคเลือด"
                  )}
                </Menu.Item>
                <Menu.Item key="Donor_Separates_Bloods">
                  แยกส่วนประกอบเลือด
                </Menu.Item>
                <Menu.Item key="Donor_result_import">ลงผลตรวจเลือด</Menu.Item>
                <Menu.Item key="Donor_import_txt">นำเข้าผลตรวจกาชาด</Menu.Item>
                <Menu.Item key="Donor_Search_donor">
                  แฟ้มข้อมูลผู้บริจาค
                </Menu.Item>
                <Menu.Item key="Donor_settingMobile">
                  ตั้งค่าหน่วยรับบริจาค
                </Menu.Item>
              </SubMenu>

              <SubMenu
                disabled
                key="sub4"
                icon={
                  <BiFileFind
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                title="PATIENT"
                style={{ marginTop: "-12px" }}
              >
                <Menu.Item key="Patient_blood_request">
                  ลงทะเบียนขอเลือด
                </Menu.Item>
                <Menu.Item key="Patent_blood_request_lab_new">
                  รายการขอเลือด
                </Menu.Item>
                <Menu.Item key="Patient_trans_blood">จ่ายเลือด</Menu.Item>
                <Menu.Item key="Patient_view">แฟ้มข้อมูลผู้ป่วย</Menu.Item>
                <Menu.Item key="Patient_add_reaction">
                  บันทึกปฎิกิริยา
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub2"
                icon={
                  <StockOutlined
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                title="BLOOD STOCK"
                style={{ marginTop: "-12px" }}
              >
                <Menu.Item key="stock_blood">คลังเลือด</Menu.Item>
                <Menu.Item key="stock_import_blood">รับเลือดเข้าระบบ</Menu.Item>
                <Menu.Item key="stock_blooddetails">รายละเอียดเลือด</Menu.Item>
                <Menu.Item key="stock_view_blooddetail">
                  ตรวจสอบข้อมูลถุงเลือด
                </Menu.Item>
                <Menu.Item key="stock_blood_release">ปลดเลือด</Menu.Item>
                <Menu.Item key="stock_return_blood">คืนเลือด</Menu.Item>
                <Menu.Item key="stock_deposit_blood">ฝากเลือด</Menu.Item>
                <Menu.Item key="stock_split_bags">แบ่งถุง</Menu.Item>
                <Menu.Item key="stock_blood_pool">Pool Platelet</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub5"
                icon={
                  <BiTransfer
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                title="TRANS Service"
                style={{ marginTop: "-12px" }}
              >
                <Menu.Item key="trans_blood_hospital">จ่ายเลือด</Menu.Item>
                <Menu.Item key="trans_blood_history">
                  ประวัติการจ่ายเลือด
                </Menu.Item>
                <Menu.Item key="trans_blood_return">คืนเลือด</Menu.Item>
              </SubMenu>

              {["SuperAdmin", "Admin", "Nurse", "User"].includes(
                userData?.user_type
              ) && (
                <SubMenu
                  key="sub6"
                  icon={
                    <BsClipboardCheck
                      style={{
                        fontSize: "14px",
                        marginTop: "-10px",
                        color: "#fffff",
                      }}
                    />
                  }
                  title="WARD"
                  style={{ marginTop: "-12px" }}
                >
                  <Menu.Item key="ward">รายการขอเลือด</Menu.Item>
                  <Menu.Item key="patient_trans_ward">จ่ายเลือด</Menu.Item>
                </SubMenu>
              )}

              <Menu.Item
                key="qc"
                style={{ marginTop: "-12px" }}
                icon={
                  <BsJournalCheck
                    style={{ fontSize: "14px", marginTop: "-10px" }}
                  />
                }
              >
                {qc_not_review?.length > 0 ? (
                  <Badge
                    count={
                      <RiErrorWarningFill
                        style={{
                          color: "#f5222d",
                          fontSize: "12px",
                        }}
                      />
                    }
                  >
                    <h
                      style={{
                        color: "#ffffffa6",
                      }}
                    >
                      QC
                    </h>
                  </Badge>
                ) : (
                  "QC"
                )}
              </Menu.Item>

              <Menu.Item
                style={{ marginTop: "-12px" }}
                icon={
                  <IoDocumentTextOutline
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                key="report_index"
              >
                REPORT
              </Menu.Item>
              <SubMenu
                key="sub9"
                icon={
                  <IoSettingsOutline
                    style={{ fontSize: "16px", marginTop: "-10px" }}
                  />
                }
                title={<h className="textShadow">TOOLS</h>}
                style={{ marginTop: "-12px" }}
              >
                <Menu.Item key="setting_lab_item">ตั้งค่า Map Code</Menu.Item>
                <Menu.Item key="48">ข้อมูลโรงพยาบาล</Menu.Item>
                <Menu.Item key="49">ข้อมูลโรงพยาบาล(นอก)</Menu.Item>
                <Menu.Item key="50">ข้อมูล Word</Menu.Item>
                <Menu.Item key="51">ข้อมูลแพทย์</Menu.Item>
                <Menu.Item key="Setting_blood_type">
                  ตั้งค่าประเภทเลือด
                </Menu.Item>
                <Link href="/Setting_Inf">
                  <a target="_blank">
                    <Menu.Item>ตั้งค่าลงผลตรวจอัตโนมัติ</Menu.Item>
                  </a>
                </Link>
                <Menu.Item key="53">ข้อมูลปั่นแยกถุง</Menu.Item>
                <Menu.Item key="54">ข้อมูลน้ำยาถุงเลือด</Menu.Item>
                <Menu.Item key="55">ข้อมูลการตัดเลือดทิ้ง</Menu.Item>
                <Menu.Item key="56">ตั้งค่าการแจ้งเตือน</Menu.Item>
                <Menu.Item key="57">ตั้งค่าการพิมพ์</Menu.Item>
                <Menu.Item key="58">ตั้งค่า Instrument</Menu.Item>
                <Menu.Item key="59">ตั้งค่าการแสดงผล</Menu.Item>
                <Menu.Item key="setting">ตั้งค่าระบบ</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub10"
                title={
                  <Space>
                    {userData?.pic && (
                      <Avatar
                        size={30}
                        src={`${env.PATH_IMG}/image/${
                          userData?.pic
                        }?date=${moment().format("HHmmss")}`}
                      />
                    )}
                    <p
                      style={{
                        marginTop: "-8px",
                        fontSize: "14px",
                        marginBottom: "-7px",
                        color: "whitesmoke",
                      }}
                    >
                      คุณ : {`${userData?.fname} ${userData?.lname}`}
                    </p>
                  </Space>
                }
                style={{
                  marginTop: "-13px",
                }}
                className="Absolute"
              >
                {["SuperAdmin", "Admin"].includes(userData?.user_type) && (
                  <Menu.Item
                    key="showuser"
                    icon={
                      <TeamOutlined
                        style={{ fontSize: "16px", marginTop: "-10px" }}
                      />
                    }
                  >
                    USERS
                  </Menu.Item>
                )}
                <Menu.Item
                  icon={
                    <PoweroffOutlined
                      style={{
                        fontSize: "20px",
                        color: "orange",
                      }}
                    />
                  }
                  onClick={onLogout}
                >
                  ออกจากระบบ
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
        </Affix>
        <Content
          style={{
            padding: "0 10px",
            height: "100%",
          }}
        >
          {keyTab === "report_index" ||
          keyTab === "report_stock_blood_exp" ||
          keyTab === "report_stock_Crossmatch" ||
          keyTab === "report_stock_inventory" ||
          keyTab === "report_stock_payblood_return" ||
          keyTab === "report_stock_Separates_Bloods" ||
          keyTab === "report_stock_takeblood" ||
          keyTab === "report_stock_tran_get_blood" ||
          keyTab === "report_stock_tranblood" ||
          keyTab === "report_donor_bloodresults" ||
          keyTab === "report_donor_getneedle" ||
          keyTab === "report_donor_infect" ||
          keyTab === "report_donor_donationnotification" ||
          keyTab === "report_donor_out_area_agency" ||
          keyTab === "report_donor_rare_blood_type" ||
          keyTab === "report_daily_bloodresults" ||
          keyTab === "report_daily_CT_ratio" ||
          keyTab === "report_daily__CT_ratio_ward" ||
          keyTab === "report_daily_Antibody" ||
          keyTab === "report_daily_Checklist_Summary" ||
          keyTab === "report_daily_P4P" ||
          keyTab === "report_daily_cut_blood" ||
          keyTab === "report_daily_review_useblood" ||
          keyTab === "report_daily_depositblood" ||
          keyTab === "report_daily_tranblood" ||
          keyTab === "report_daily_Turnaround_Time" ? (
            <Row>
              <Col span={4}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[keyTab]}
                  onClick={onclickMenu_Left}
                  style={{
                    minHeight: "93vh",

                    borderRight: 0,
                    marginTop: "10px",
                  }}
                >
                  <SubMenu
                    key="sub1"
                    icon={
                      <HiDocumentReport
                        style={{ fontSize: "16px", marginTop: "2px" }}
                      />
                    }
                    title="รายงาน คลังเลือด"
                    style={{ marginTop: "2px" }}
                  >
                    <Menu.Item key="report_stock_inventory">คงคลัง</Menu.Item>
                    <Menu.Item key="report_stock_takeblood">
                      ลงรับเลือด
                    </Menu.Item>
                    <Menu.Item key="report_stock_Crossmatch">
                      การ Crossmatch
                    </Menu.Item>
                    <Menu.Item key="report_stock_tranblood">
                      จ่ายเลือด
                    </Menu.Item>
                    <Menu.Item key="report_stock_payblood_return">
                      จ่ายเลือด-คืน
                    </Menu.Item>
                    <Menu.Item key="report_stock_blood_exp">
                      เลือดหมดอายุ
                    </Menu.Item>
                    <Menu.Item key="report_stock_Separates_Bloods">
                      ปั่นแยกถุงเลือด
                    </Menu.Item>
                    <Menu.Item disabled key="report_stock_tran_get_blood">
                      รับจ่ายถุงเลือด
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={
                      <HiDocumentReport
                        style={{ fontSize: "16px", marginTop: "2px" }}
                      />
                    }
                    title="รายงาน Donor"
                    style={{ marginTop: "2px" }}
                  >
                    <Menu.Item key="report_donor_bloodresults">
                      ผลตรวจเลือด
                    </Menu.Item>
                    <Menu.Item key="report_donor_getneedle">รับเข็ม</Menu.Item>
                    <Menu.Item key="report_donor_infect">ติดเชื้อ</Menu.Item>
                    <Menu.Item key="report_donor_donationnotification">
                      เตือนการบริจาค
                    </Menu.Item>
                    <Menu.Item key="report_donor_out_area_agency">
                      ออกหน่วย
                    </Menu.Item>
                    <Menu.Item key="report_donor_rare_blood_type">
                      หมู่เลือดหายาก
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={
                      <HiDocumentReport
                        style={{ fontSize: "16px", marginTop: "2px" }}
                      />
                    }
                    title="รายงาน Daily"
                    style={{ marginTop: "2px" }}
                  >
                    <Menu.Item key="report_daily_bloodresults">
                      การขอเลือด
                    </Menu.Item>
                    <Menu.Item key="report_daily_CT_ratio">C/T ratio</Menu.Item>
                    <Menu.Item key="report_daily__CT_ratio_ward">
                      C/T ratio Ward
                    </Menu.Item>
                    <Menu.Item key="report_daily_Antibody">Antibody</Menu.Item>
                    <Menu.Item disabled key="report_daily_Checklist_Summary">
                      สรุปรายการตรวจ
                    </Menu.Item>
                    <Menu.Item key="report_daily_P4P">P4P</Menu.Item>
                    <Menu.Item key="report_daily_cut_blood">
                      ตัดเลือดทิ้ง
                    </Menu.Item>

                    <Menu.Item key="report_daily_depositblood">
                      การฝากเลือด
                    </Menu.Item>
                    <Menu.Item key="report_daily_tranblood">
                      การจ่ายเลือด
                    </Menu.Item>
                    <Menu.Item key="report_daily_Turnaround_Time">
                      Turnaround Time
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>
              <Col span={20}>
                <div className="site-layout-content" style={{ height: "100%" }}>
                  {children}
                </div>
              </Col>
            </Row>
          ) : (
            <div className="site-layout-content" style={{ height: "100%" }}>
              {children}
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default App;
