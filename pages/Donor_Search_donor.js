import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  Tabs
} from "antd";
import "moment/locale/th";
import Head from "next/head";
import { useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { Layout } from "../components";
import api from "../lib/api";

const { TabPane } = Tabs;


const Viewpopup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1280;
  const appH = 600;
  const url = "/Donor_Search_donor_view?pid=" + value;
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
const Search_donor = () => {
  const [datadonor, setDatadonor] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [frmSearch] = Form.useForm();

  //-----------------------------------//
  const onFinishSearch = async (value) => {
    console.log("value------>", value);
    try {
      const params = {
        ...value,
      };

      console.log("params", params);

      await Fetch_Donor_list(params);
    } catch (error) {
      // Modal.error({ title: "Error" });
    }
  };
  //-----------------------------------//

  const Fetch_Donor_list = async (params) => {
    setLoadingTable(true);
    const result = await api.get("/Search_donor", { params });
    console.log("รายชื่อผู้บริจาค", result.data);
    setDatadonor(result.data);
    setLoadingTable(false);
  };

  //------------------//
  const Clear = () => {
    setDatadonor();
    setKeyword("");
    frmSearch.resetFields();
  };
  //-------------------------//
  const columns = [
    {
      title: "Donor no",
      dataIndex: "donor_no",
      key: "donor_no",
      align: "center",
    },
    {
      title: "เลขประจำตัว",
      dataIndex: "cid",
      key: "cid",
      align: "center",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record) =>
        `${record.pname}${record.fname} ${record.lname}`,
    },
    {
      title: "อายุ",
      dataIndex: "cal_age",
      key: "cal_age",
      align: "center",
      render: (text) => (
        <div style={{ color: text < "17" || text > "60" ? "red" : "" }}>
          {text}
        </div>
      ),
    },
    {
      title: "หมู่เลือด",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record) =>
        `${record.bloodgroup}${" "} ${record.bloodgroup_rh}`,
    },
    {
      title: "เพศ",
      dataIndex: "sex_name",
      key: "sex_name",
      align: "center",
    },
    {
      title: "เบอร์ติดต่อ",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address_more",
      key: "address_more",
      align: "center",
      render: (text, record) =>
        `${
          record.address_more === ""
            ? `${record.address_new}`
            : `${record.address_more}`
        }`,
    },
    {
      title: "การทำงาน",
      key: "Option",
      align: "center",

      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="ดูข้อมูลผู้บริจาค">
            <Button
              style={{ height: "25px", color: "green" }}
              shape="circle"
              icon={
                <SearchOutlined style={{ fontSize: "12px", color: "green" }} />
              }
              onClick={() => Viewpopup(record.pid)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="Donor_Search_donor">
        <div>
          <Head>
            <title>SIBSOFT : แฟ้มข้อมูลผู้บริจาค</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center" style={{padding: "10px"}}>
          <Col span={24}>
            <Card>
            <Tabs   type="card" style={{ marginTop: -20 }}>
                <TabPane tab="แฟ้มข้อมูลผู้บริจาค" key="1">
              <Row>
                <Col span={24}>
                  <Row justify="center" style={{ marginTop: "-10px" }}>
                    <Form
                      form={frmSearch}
                      layout="inline"
                      onFinish={onFinishSearch}
                    >
                      <Form.Item name="keyword" label="ค้นหา">
                        <Input
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="ชื่อ-สกุล / เลขประจำตัวประชาชน"
                          style={{
                            width: "100%",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Tooltip
                          placement="right"
                          title={
                            !keyword || keyword === "" ? "กรุณากรอกข้อมูล" : ""
                          }
                        >
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "5px",
                              backgroundColor:
                                !keyword || keyword === "" ? "" : "#17a2b8",
                              color: !keyword || keyword === "" ? "" : "white",
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
                            htmlType="submit"
                            disabled={!keyword || keyword === ""}
                          >
                            ค้นหา
                          </Button>
                        </Tooltip>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={!datadonor || datadonor.length <= 0}
                          style={{
                            fontSize: "12px",
                            height: "28px",
                            marginLeft: "-5px",
                            backgroundColor:
                              !datadonor || datadonor.length <= 0
                                ? ""
                                : "orange",
                            color:
                              !datadonor || datadonor.length <= 0
                                ? ""
                                : "white",
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
                          onClick={Clear}
                        >
                          เริ่มใหม่
                        </Button>
                      </Form.Item>
                    </Form>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row justify="center">
                <Col span={23}>
                  {/* <Card> */}
                  <Table
                    columns={columns}
                    dataSource={datadonor}
                    loading={loadingTable}
                    size="small"
                    className="xm"
                    bordered
                  />
                  {/* </Card> */}
                </Col>
              </Row>
              </TabPane></Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
      {/* ------------------------ */}
    </>
  );
};

export default Search_donor;
