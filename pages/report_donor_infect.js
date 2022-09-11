// ติดเชื้อ// ติดเชื้อ
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import { RiFileExcel2Line } from "react-icons/ri";

import ExcelJS from "exceljs";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdOutlinePrint, MdRefresh } from "react-icons/md";

import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Report_donor_infect = () => {
  const [placement, SetPlacement] = useState("bottomLeft");
  const { RangePicker } = DatePicker;

  const [loading, setLoading] = useState(false);
  const [today, settoday] = useState();

  const [TPHA_f, setTPHA_f] = useState();
  const [hbsag_f, sethbsag_f] = useState();
  const [hiv_f, sethiv_f] = useState();
  const [hcv_f, sethcv_f] = useState();
  const [hivag_f, sethivag_f] = useState();
  const [HBVNAT_f, setHBVNAT_f] = useState();
  const [HCVNAT_f, setHCVNAT_f] = useState();
  const [HIVNAT_f, setHIVNAT_f] = useState();
  const [alt_f, setalt_f] = useState();

  const [frm_searchdata] = Form.useForm();

  const [choice1, setchoice1] = useState();
  const [data_table, setdata_table] = useState();

  const printComponent = useRef(null);

  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [count_num, setcount_num] = useState();

  useEffect(async () => {
    await Loadchoiceshow();
  }, []);
  const Loadchoiceshow = async () => {
    const result = await api.get("/Sequence_choice");
    setchoice1(result.data[0]);
  };
  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setchoice1();
    setcount_num();
  };

  const Search_data = async () => {
    setLoading(true);
    const frmData = frm_searchdata.getFieldValue();
    console.log("frmData", frmData);
    const result = await api.get("/Get_report_donor_infect", {
      params: {
        date_from: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_to: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        TPHA_f: frmData.TPHA_f === true ? "1" : "0",
        hbsag_f: frmData.hbsag_f === true ? "1" : "0",
        hiv_f: frmData.hiv_f === true ? "1" : "0",
        hcv_f: frmData.hcv_f === true ? "1" : "0",
        hivag_f: frmData.hivag_f === true ? "1" : "0",
        HBVNAT_f: frmData.HBVNAT_f === true ? "1" : "0",
        HCVNAT_f: frmData.HCVNAT_f === true ? "1" : "0",
        HIVNAT_f: frmData.HIVNAT_f === true ? "1" : "0",
        alt_f: frmData.alt_f === true ? "1" : "0",
      },
    });
    if (result.data[0].length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
    setdata_table(result.data[0]);
    setdata_print(result.data[0]);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setcount_num(frmData.choice_search);

    setTPHA_f(frmData.TPHA_f === true ? "TPHA ," : "");
    sethbsag_f(frmData.hbsag_f === true ? "TPHA ," : "");
    sethiv_f(frmData.hiv_f === true ? "HIV ," : "");
    sethcv_f(frmData.hcv_f === true ? "HCV ," : "");
    sethivag_f(frmData.hivag_f === true ? "HIV ag ," : "");
    setHBVNAT_f(frmData.HBVNAT_f === true ? "HBV NAT ," : "");
    setHCVNAT_f(frmData.HCVNAT_f === true ? "HCV NAT ," : "");
    setHIVNAT_f(frmData.HIVNAT_f === true ? "HIV NAT ," : "");
    setalt_f(frmData.alt_f === true ? "ALT ," : "");
    setLoading(false);
  };
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "เลขที่ผู้บริจาค",
      dataIndex: "donor_no",
      key: "donor_no",
      align: "center",
      width: "8%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "8%",
    },
    {
      title: "วันที่บริจาค",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "9%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "TPHA",
      dataIndex: "TPHA",
      key: "TPHA",
      align: "center",
      width: "4%",
    },
    {
      title: "hbsag",
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      width: "7%",
    },
    {
      title: "HIV",
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      width: "4%",
    },
    {
      title: "HCV",
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      width: "7%",
    },
    {
      title: "hivag",
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      width: "7%",
    },
    {
      title: "HBV NAT",
      dataIndex: "HBVNAT",
      key: "HBVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "HCV NAT",
      dataIndex: "HCVNAT",
      key: "HCVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "HIV NAT",
      dataIndex: "HIVNAT",
      key: "HIVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "ALT",
      dataIndex: "alt",
      key: "alt",
      align: "center",
      width: "7%",
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานติดเชื้อ");
    const worksheet = workbook.getWorksheet("รายงานติดเชื้อ");

    const format = "xlsx";
    const charcode = "UTF8";

    const dayNames = [
      "วันอาทิตย์ที่",
      "วันจันทร์ที่",
      "วันอังคารที่",
      "วันพุทธที่",
      "วันพฤหัสบดีที่",
      "วันศุกร์ที่",
      "วันเสาร์ที่",
    ];
    const monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    const d = new Date();
    const frmData = frm_searchdata.getFieldValue();

    const years = moment().add(543, "years").format("YYYY");
    const months = moment().format("MM");
    const day = moment().format("DD");
    const date =
      dayNames[d.getDay()] +
      " " +
      day +
      " เดือน" +
      monthNamesThai[d.getMonth()] +
      " พ.ศ." +
      years;

    // const result = await api.get("/Hospitals_choice");
    let num = [];
    let TPHA_f = frmData.TPHA_f === true ? "TPHA ," : "";
    let hbsag_f = frmData.hbsag_f === true ? "TPHA ," : "";
    let hiv_f = frmData.hiv_f === true ? "HIV ," : "";
    let hcv_f = frmData.hcv_f === true ? "HCV ," : "";
    let hivag_f = frmData.hivag_f === true ? "HIV ag ," : "";
    let HBVNAT_f = frmData.HBVNAT_f === true ? "HBV NAT ," : "";
    let HCVNAT_f = frmData.HCVNAT_f === true ? "HCV NAT ," : "";
    let HIVNAT_f = frmData.HIVNAT_f === true ? "HIV NAT ," : "";
    let alt_f = frmData.alt_f === true ? "ALT ," : "";

    if (
      TPHA_f == "" &&
      hbsag_f == "" &&
      hiv_f == "" &&
      hcv_f == "" &&
      hivag_f == "" &&
      HBVNAT_f == "" &&
      HCVNAT_f == "" &&
      HIVNAT_f == "" &&
      alt_f == ""
    ) {
      num = "ทั้งหมด";
    }

    worksheet.columns = [
      { header: "", key: "c1", width: 5 },
      { header: "", key: "c2", width: 14 },
      { header: "", key: "c3", width: 14 },
      { header: "", key: "c4", width: 14 },
      { header: "", key: "c5", width: 8 },
      { header: "", key: "c6", width: 8 },
      { header: "", key: "c7", width: 8 },
      { header: "", key: "c8", width: 8 },
      { header: "", key: "c9", width: 8 },
      { header: "", key: "c10", width: 10 },
      { header: "", key: "c11", width: 10 },
      { header: "", key: "c12", width: 10 },
      { header: "", key: "c13", width: 8 },
      { header: "", key: "c14", width: 8 },
      { header: "", key: "c15", width: 8 },
      { header: "", key: "c16", width: 8 },
      { header: "", key: "c17", width: 8 },
      { header: "", key: "c18", width: 8 },
      { header: "", key: "c19", width: 8 },
      { header: "", key: "c20", width: 8 },
    ];
    worksheet.addRows([
      { c6: "      รายงานติดเชื้อ" },
      {
        c6:
          "วันที่ " +
          moment(frmData.Request_date_blood_search).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.Request_date_blood_to_search).format("DD-MM-YYYY"),
      },
      {
        c6:
          " รายการผลติดเชื้อ : " +
          TPHA_f +
          hbsag_f +
          hiv_f +
          hcv_f +
          hivag_f +
          HBVNAT_f +
          HCVNAT_f +
          HIVNAT_f +
          alt_f +
          num,
      },
      {
        c7: " ",
      },
      {
        c1: "ลำดับ",
        c2: "เลขที่ผู้บริจาค",
        c3: "เลขที่ถุงเลือด",
        c4: "วันที่บริจาค",
        c5: "TPHA",
        c6: "hbsag",
        c7: "HIV",
        c8: "HCV",
        c9: "hivag",
        c10: "HBV NAT",
        c11: "HCV NAT",
        c12: "HIV NAT",
        c13: "ALT",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].donor_no,
        c3: data_table[i].unit_no,
        c4: data_table[i].donor_date,
        c5: data_table[i].TPHA,
        c6: data_table[i].hbsag,
        c7: data_table[i].hiv,
        c8: data_table[i].hcv,
        c9: data_table[i].hivag,
        c10: data_table[i].HBVNAT,
        c11: data_table[i].HCVNAT,
        c12: data_table[i].HIVNAT,
        c13: data_table[i].alt,
      };
    }
    worksheet.addRows(dataTest);
    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ].forEach((char) => {
        worksheet.getCell(`${char}${i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      });
    }
    const uint8Array =
      format === "xlsx"
        ? await workbook.xlsx.writeBuffer()
        : charcode === "UTF8"
        ? await workbook.csv.writeBuffer()
        : new Uint8Array(
            encoding.convert(await workbook.csv.writeBuffer(), {
              from: "UTF8",
              to: "SJIS",
            })
          );
    const blob = new Blob([uint8Array], {
      type: "application/octet-binary",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // a.download = "sampleData." + format;
    a.download = `รายงานติดเชื้อ  ${date}.` + format;
    a.click();
    a.remove();
  };

  return (
    <>
      <Layout keyTab="report_donor_infect">
        <div>
          <Head>
            <title>SIBSOFT : รายงานติดเชื้อ</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานติดเชื้อ" key="1">
                  <Form
                    form={frm_searchdata}
                    initialValues={{
                      date_from: moment().add(543, "year"),
                      date_to: moment().add(543, "year"),
                      // TPHA_f: "0",
                      // hbsag_f: "0",
                      // hiv_f: "0",
                      // hcv_f: "0",
                      // hivag_f: "0",
                      // HBVNAT_f: "0",
                      // HCVNAT_f: "0",
                      // HIVNAT_f: "0",
                      // alt_f: "0",
                    }}
                    onFinish={Search_data}
                  >
                    <Row justify="center" style={{ marginTop: "5px" }}>
                      <Col span={24}>
                        <Row justify="start">
                          <Form.Item label="วันที่เจาะ" name="date_from">
                            <DatePicker
                              style={{ width: "120px" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={Search_data}
                            />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="ถึง" name="date_to">
                            <DatePicker
                              style={{ width: "120px" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={Search_data}
                            />
                          </Form.Item>
                          &nbsp; &nbsp; &nbsp;
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "32px",
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
                            htmlType="submit"
                          >
                            ค้นหา
                          </Button>
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "32px",
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
                            onClick={Refresh}
                          >
                            เริ่มใหม่
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginTop: "-20px", marginBottom: "-30px" }}
                    >
                      <Col span={12}>
                        <Row style={{ marginBottom: "-35px" }}>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="TPHA_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>TPHA</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="hbsag_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>Hbsag</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="hiv_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HIV</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "-35px" }}>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="hcv_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HCV</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="hivag_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HIV AG</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="HBVNAT_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HBV NAT</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "5px" }}>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="HIVNAT_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HIV NAT</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="alt_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>ALT</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label=""
                              name="HCVNAT_f"
                              align="center"
                              valuePropName="checked"
                            >
                              <Checkbox>HCV NAT</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row style={{ marginBottom: "35px" }}></Row>
                        <Row justify="end">
                          <div ref={(el) => (printComponent = el)}>
                            <div key="1">
                              <PrintDetail
                                data={data_print}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                TPHA_f={TPHA_f}
                                hbsag_f={hbsag_f}
                                hiv_f={hiv_f}
                                hcv_f={hcv_f}
                                hivag_f={hivag_f}
                                HBVNAT_f={HBVNAT_f}
                                HCVNAT_f={HCVNAT_f}
                                HIVNAT_f={HIVNAT_f}
                                alt_f={alt_f}

                                // count_num={count_num}
                              />
                            </div>
                          </div>

                          <ReactToPrint
                            trigger={() => (
                              <Button
                                disabled={!data_table}
                                type="primary"
                                style={{
                                  fontSize: "12px",
                                  height: "32px",
                                  marginLeft: "5px",
                                }}
                                icon={
                                  <MdOutlinePrint
                                    style={{
                                      fontSize: "16px",
                                      marginRight: "3px",
                                      marginBottom: "-3px",
                                    }}
                                  />
                                }
                              >
                                Print
                              </Button>
                            )}
                            content={() => printComponent}
                          />

                          <Button
                            disabled={!data_table}
                            type="primary"
                            style={{
                              fontSize: "12px",
                              height: "32px",
                              marginLeft: "5px",
                              backgroundColor: !data_table ? "" : "green",
                              color: !data_table ? "" : "white",
                            }}
                            onClick={handlerClickDownloadButton}
                            icon={
                              <RiFileExcel2Line
                                style={{
                                  fontSize: "16px",
                                  marginRight: "3px",
                                  marginBottom: "-3px",
                                }}
                              />
                            }
                          >
                            Export
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                  <Row
                    justify="center"
                    style={{
                      marginTop:
                        dateFrom == undefined || dateFrom == "" ? "" : "-20px",
                    }}
                  >
                    <h style={{ fontSize: "14px" }}>
                      {dateFrom == undefined || dateFrom == ""
                        ? ""
                        : "รายงานติดเชื้อ"}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {dateFrom == undefined || dateFrom == ""
                        ? ""
                        : ` วันที่ ${dateFrom} ถึง ${dateTo}`}
                    </h>
                  </Row>

                  <Row justify="center">
                    <Col span={24}>
                      <Table
                        className="xm"
                        columns={columns}
                        dataSource={data_table}
                        pagination={false}
                        size="small"
                        loading={loading}
                        scroll={{ y: 300 }}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>{" "}
          </Col>{" "}
        </Row>
      </Layout>
    </>
  );
};

export default Report_donor_infect;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  count_num,
  TPHA_f,
  hbsag_f,
  hiv_f,
  hcv_f,
  hivag_f,
  HBVNAT_f,
  HCVNAT_f,
  HIVNAT_f,
  alt_f,
}) => {
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "1%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "เลขที่ผู้บริจาค",
      dataIndex: "donor_no",
      key: "donor_no",
      align: "center",
      width: "8%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "8%",
    },
    {
      title: "วันที่บริจาค",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "9%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "TPHA",
      dataIndex: "TPHA",
      key: "TPHA",
      align: "center",
      width: "4%",
    },
    {
      title: "hbsag",
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      width: "7%",
    },
    {
      title: "HIV",
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      width: "4%",
    },
    {
      title: "HCV",
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      width: "7%",
    },
    {
      title: "hivag",
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      width: "7%",
    },
    {
      title: "HBV NAT",
      dataIndex: "HBVNAT",
      key: "HBVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "HCV NAT",
      dataIndex: "HCVNAT",
      key: "HCVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "HIV NAT",
      dataIndex: "HIVNAT",
      key: "HIVNAT",
      align: "center",
      width: "7%",
    },
    {
      title: "ALT",
      dataIndex: "alt",
      key: "alt",
      align: "center",
      width: "7%",
    },
  ];

  let num = [];
  if (
    TPHA_f == "" &&
    hbsag_f == "" &&
    hiv_f == "" &&
    hcv_f == "" &&
    hivag_f == "" &&
    HBVNAT_f == "" &&
    HCVNAT_f == "" &&
    HIVNAT_f == "" &&
    alt_f == ""
  ) {
    num = "A";
  }

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานติดเชื้อ</h>
      </Row>

      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {dateFrom == undefined || dateFrom == ""
            ? ""
            : ` วันที่ ${dateFrom} ถึง ${dateTo}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {num == "A"
            ? "รายการผลติดเชื้อ : ทั้งหมด"
            : `รายการผลติดเชื้อ :  ${TPHA_f}
            ${hbsag_f}
            ${hiv_f}
            ${hcv_f}
            ${hivag_f}
            ${HBVNAT_f}
            ${HCVNAT_f}
            ${HIVNAT_f}
            ${alt_f}
            `}
        </h>
      </Row>

      <br />
      <Row justify="center" style={{ paddingBottom: "5px" }}>
        <Col span={22}>
          <Table
            id="report_stock_tackblood_tb_id"
            className="print_a4"
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
      {/* <Row>
        <span
          style={{ paddingRight: "10px", paddingBottom: "5px" }}
          id="footerPrint"
        >
          วันที่พิมพ์ : {date} เวลา : {time} น.
        </span>
      </Row> */}
    </div>
  );
};
