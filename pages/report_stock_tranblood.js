// จ่ายเลือด
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import ExcelJS from "exceljs";
import Head from "next/head";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdOutlinePrint, MdRefresh } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Report_stock_tranblood = () => {
  const [placement, SetPlacement] = useState("bottomLeft");
  const [loading, setLoading] = useState(false);

  const [frm_searchdata] = Form.useForm();

  const [data_table, setdata_table] = useState();
  const [data_Doctor, setData_Doctor] = useState();
  const [data_Ward, setData_Ward] = useState();
  const [timeChoice, setTimeChoice] = useState();

  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [docSearch, setDocSearch] = useState();
  const [wardSearch, setwardSearch] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();

  const printComponent = useRef(null);

  const LoadDoctor = async () => {
    const result = await api.get("/Doctor_choice");
    setData_Doctor(result.data[0]);
  };
  const LoadWard = async () => {
    const result = await api.get("/Ward_choice");
    setData_Ward(result.data[0]);
  };

  const LoadTime = async () => {
    const result = await api.get("/timeWorking_choice");
    setTimeChoice(result.data[0]);
  };

  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setDocSearch();
    setwardSearch();
    setTimeFrom();
    setTimeTo();
    setNameWork();
  };

  const Search_data = async () => {
    setLoading(true);
    const frmData = frm_searchdata.getFieldValue();
    let time_from;
    let time_to;
    let name_work;

    const time = timeChoice.filter((item) => item.id == frmData.time_search);
    time_from = time[0]?.time_from;
    time_to = time[0]?.time_to;
    name_work = time[0]?.name_working;

    const result = await api.get("/Get_report_trans", {
      params: {
        date_start: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_last: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        doc_code: frmData.doc_code,
        ward_code: frmData.ward_code,
        time_from: time_from,
        time_to: time_to,
      },
    });
    if (result.data[0].length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
    console.log("result", result.data[0]);
    let resultStock = result.data[0];
    resultStock.push({
      type_name: "รวม",
      Aneg: resultStock
        .map((item) => Number(item.Aneg))
        .reduce((partialSum, a) => partialSum + a, 0),
      A: resultStock
        .map((item) => Number(item.A))
        .reduce((partialSum, a) => partialSum + a, 0),
      Apos: resultStock
        .map((item) => Number(item.Apos))
        .reduce((partialSum, a) => partialSum + a, 0),
      Bneg: resultStock
        .map((item) => Number(item.Bneg))
        .reduce((partialSum, a) => partialSum + a, 0),
      B: resultStock
        .map((item) => Number(item.B))
        .reduce((partialSum, a) => partialSum + a, 0),
      Bpos: resultStock
        .map((item) => Number(item.Bpos))
        .reduce((partialSum, a) => partialSum + a, 0),
      Oneg: resultStock
        .map((item) => Number(item.Oneg))
        .reduce((partialSum, a) => partialSum + a, 0),
      O: resultStock
        .map((item) => Number(item.O))
        .reduce((partialSum, a) => partialSum + a, 0),
      Opos: resultStock
        .map((item) => Number(item.Opos))
        .reduce((partialSum, a) => partialSum + a, 0),
      ABneg: resultStock
        .map((item) => Number(item.ABneg))
        .reduce((partialSum, a) => partialSum + a, 0),
      AB: resultStock
        .map((item) => Number(item.AB))
        .reduce((partialSum, a) => partialSum + a, 0),
      ABpos: resultStock
        .map((item) => Number(item.ABpos))
        .reduce((partialSum, a) => partialSum + a, 0),
      Cryo: resultStock
        .map((item) => Number(item.Cryo))
        .reduce((partialSum, a) => partialSum + a, 0),
    });
    setdata_table(resultStock);
    setdata_print(resultStock);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setTimeFrom(time_from);
    setTimeTo(time_to);
    setNameWork(name_work);

    if (frmData.doc_code != "") {
      const result = await api.get("/Doctor_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].code == frmData.doc_code) {
          setDocSearch(result.data[0][i].name);
        }
      }
    } else {
      setDocSearch("");
    }
    if (frmData.ward_code != "") {
      const result = await api.get("/Ward_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].ward == frmData.ward_code) {
          setwardSearch(result.data[0][i].name);
        }
      }
    } else {
      setwardSearch("");
    }

    setLoading(false);
  };

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
      title: "Blood Type",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "30%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "A-",
      dataIndex: "Aneg",
      key: "Aneg",
      align: "center",
      width: "5%",
    },
    {
      title: "A",
      dataIndex: "A",
      key: "A",
      align: "center",
      width: "5%",
    },
    {
      title: "A+",
      dataIndex: "Apos",
      key: "Apos",
      align: "center",
      width: "5%",
    },
    {
      title: "B-",
      dataIndex: "Bneg",
      key: "Bneg",
      align: "center",
      width: "5%",
    },
    {
      title: "B",
      dataIndex: "B",
      key: "B",
      align: "center",
      width: "5%",
    },
    {
      title: "B+",
      dataIndex: "Bpos",
      key: "Bpos",
      align: "center",
      width: "5%",
    },
    {
      title: "O-",
      dataIndex: "Oneg",
      key: "Oneg",
      align: "center",
      width: "5%",
    },
    {
      title: "O",
      dataIndex: "O",
      key: "O",
      align: "center",
      width: "5%",
    },
    {
      title: "O+",
      dataIndex: "Opos",
      key: "Opos",
      align: "center",
      width: "5%",
    },
    {
      title: "AB-",
      dataIndex: "ABneg",
      key: "ABneg",
      align: "center",
      width: "5%",
    },
    {
      title: "AB",
      dataIndex: "AB",
      key: "AB",
      align: "center",
      width: "5%",
    },
    {
      title: "AB+",
      dataIndex: "ABpos",
      key: "ABpos",
      align: "center",
      width: "5%",
    },
    {
      title: "Cryo",
      dataIndex: "Cryo",
      key: "Cryo",
      align: "center",
      width: "5%",
    },
    {
      title: "รวม",
      dataIndex: "num_sum",
      key: "",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <div>
            {/* <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span> */}
            {Number(record.Aneg) +
              Number(record.A) +
              Number(record.Apos) +
              Number(record.Bneg) +
              Number(record.B) +
              Number(record.Bpos) +
              Number(record.Oneg) +
              Number(record.O) +
              Number(record.Opos) +
              Number(record.ABneg) +
              Number(record.AB) +
              Number(record.ABpos) +
              Number(record.Cryo)}
          </div>
        );
      },
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงาน ลงรับเลือด");
    const worksheet = workbook.getWorksheet("รายงาน ลงรับเลือด");

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

    let doc_name = {};
    let ward_name = {};

    if (frmData.doc_code != "") {
      const result = await api.get("/Doctor_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].code == frmData.doc_code) {
          doc_name = result.data[0][i].name;
        }
      }
    } else {
      doc_name = "";
    }
    if (frmData.ward_code != "") {
      const result = await api.get("/Ward_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].ward == frmData.ward_code) {
          ward_name = result.data[0][i].name;
        }
      }
    } else {
      ward_name = "";
    }
    console.log("ward_name", ward_name);
    console.log("frmData.ward_code", frmData.ward_code);

    worksheet.columns = [
      { header: "", key: "c1", width: 5 },
      { header: "", key: "c2", width: 35 },
      { header: "", key: "c3" },
      { header: "", key: "c4" },
      { header: "", key: "c5" },
      { header: "", key: "c6" },
      { header: "", key: "c7" },
      { header: "", key: "c8" },
      { header: "", key: "c9" },
      { header: "", key: "c10" },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
      { header: "", key: "c13" },
      { header: "", key: "c14" },
      { header: "", key: "c15" },
      { header: "", key: "c16" },
      { header: "", key: "c17" },
      { header: "", key: "c18" },
      { header: "", key: "c19" },
      { header: "", key: "c20" },
    ];
    worksheet.addRows([
      { c7: "รายงานการจ่ายเลือด" },
      {
        c7:
          "ประจำวันที่ " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c7: doc_name === "" ? "" : "Doctor : " + doc_name,
      },
      {
        c7: ward_name === "" ? "" : "Ward : " + ward_name,
      },
      {
        c7:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c6: "",
      },
      {
        c1: "#",
        c2: "ประเภท",
        c3: "A-",
        c4: "A",
        c5: "A+",
        c6: "B-",
        c7: "B",
        c8: "B+",
        c9: "O-",
        c10: "O",
        c11: "O+",
        c12: "AB-",
        c13: "AB",
        c14: "AB+",
        c15: "Cryo",
        c16: "รวม",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: data_table[i].type_name == "รวม" ? "" : i + 1,
        c2: data_table[i].type_name,
        c3: Number(data_table[i].Aneg) == 0 ? "" : Number(data_table[i].Aneg),
        c4: Number(data_table[i].A) == 0 ? "" : Number(data_table[i].A),
        c5: Number(data_table[i].Apos) == 0 ? "" : Number(data_table[i].Apos),
        c6: Number(data_table[i].Bneg) == 0 ? "" : Number(data_table[i].Bneg),
        c7: Number(data_table[i].B) == 0 ? "" : Number(data_table[i].B),
        c8: Number(data_table[i].Bpos) == 0 ? "" : Number(data_table[i].Bpos),
        c9: Number(data_table[i].Oneg) == 0 ? "" : Number(data_table[i].Oneg),
        c10: Number(data_table[i].O) == 0 ? "" : Number(data_table[i].O),
        c11: Number(data_table[i].Opos) == 0 ? "" : Number(data_table[i].Opos),
        c12:
          Number(data_table[i].ABneg) == 0 ? "" : Number(data_table[i].ABneg),
        c13: Number(data_table[i].AB) == 0 ? "" : Number(data_table[i].AB),
        c14:
          Number(data_table[i].ABpos) == 0 ? "" : Number(data_table[i].ABpos),
        c15: Number(data_table[i].Cryo) == 0 ? "" : Number(data_table[i].Cryo),
        c16:
          Number(data_table[i].Aneg) +
          Number(data_table[i].A) +
          Number(data_table[i].Apos) +
          Number(data_table[i].Bneg) +
          Number(data_table[i].B) +
          Number(data_table[i].Bpos) +
          Number(data_table[i].Oneg) +
          Number(data_table[i].O) +
          Number(data_table[i].Opos) +
          Number(data_table[i].ABneg) +
          Number(data_table[i].AB) +
          Number(data_table[i].ABpos) +
          Number(data_table[i].Cryo),
        // c17: data_table[i].type_name == "รวม" ? "" : i + 1,
      };
    }
    worksheet.addRows(dataTest);
    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
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
    a.download = `รายงานการจ่ายเลือด ประจำวันที่ ${date}.` + format;
    a.click();
    a.remove();
  };

  useEffect(async () => {
    await LoadDoctor();
    await LoadWard();
    await LoadTime();
  }, []);

  return (
    <>
      <Layout keyTab="report_stock_tranblood">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน จ่ายเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานการจ่ายเลือด" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          doc_code: "",
                          ward_code: "",
                          time_search: 1,
                        }}
                        onFinish={Search_data}
                      >
                        <Row>
                          <Form.Item label="วันที่" name="date_from">
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
                          &nbsp;
                          <Form.Item label="Doc" name="doc_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "170px" }}
                              placeholder="Doc"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {data_Doctor?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="Ward" name="ward_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "150px" }}
                              placeholder="Ward"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {data_Ward?.map((item) => (
                                <Option key={item.ward} value={item.ward}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="เวร" name="time_search">
                            <Select
                              style={{ width: "100px" }}
                              placeholder="เวร"
                              onChange={Search_data}
                            >
                              {timeChoice?.map((item) => (
                                <Option key={item.id} value={item.id}>
                                  {item.name_working}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp; &nbsp;
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
                      </Form>
                    </Col>
                  </Row>
                  <Row
                    justify="end"
                    style={{ marginTop: "-20px", marginBottom: "5px" }}
                  >
                    <div ref={(el) => (printComponent = el)}>
                      <div key="1">
                        <PrintDetail
                          data={data_print}
                          dateFrom={dateFrom}
                          dateTo={dateTo}
                          docSearch={docSearch}
                          wardSearch={wardSearch}
                          timeFrom={timeFrom}
                          timeTo={timeTo}
                          nameWork={nameWork}
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
                      onClick={() => handlerClickDownloadButton("xlsx")}
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
                        : "รายงานการจ่ายเลือด"}
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
                    <h style={{ fontSize: "14px" }}>
                      {docSearch == undefined || docSearch == ""
                        ? ""
                        : `Doctor : ${docSearch}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {wardSearch == undefined || wardSearch == ""
                        ? ""
                        : `Ward : ${wardSearch}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {nameWork == undefined || nameWork == ""
                        ? ""
                        : `เวร : ${nameWork} เวลา ${timeFrom} ถึง ${timeTo}`}
                    </h>
                  </Row>

                  <Row justify="center">
                    <Col span={24}>
                      <Table
                        className="table_report_stock_inventory"
                        dataSource={data_table}
                        columns={columns}
                        pagination={false}
                        // bordered
                        size="small"
                        loading={loading}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Report_stock_tranblood;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  docSearch,
  wardSearch,
  timeFrom,
  timeTo,
  nameWork,
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
      title: "Blood Type",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "28%",
      render: (text, record, index) => {
        return (
          <div>
            <span
              style={{ float: record.type_name == "รวม" ? "center" : "left" }}
            >
              &nbsp;&nbsp;{text}
            </span>
          </div>
        );
      },
    },
    {
      title: "A-",
      dataIndex: "Aneg",
      key: "Aneg",
      align: "center",
      width: "5%",
    },
    {
      title: "A",
      dataIndex: "A",
      key: "A",
      align: "center",
      width: "5%",
    },
    {
      title: "A+",
      dataIndex: "Apos",
      key: "Apos",
      align: "center",
      width: "5%",
    },
    {
      title: "B-",
      dataIndex: "Bneg",
      key: "Bneg",
      align: "center",
      width: "5%",
    },
    {
      title: "B",
      dataIndex: "B",
      key: "B",
      align: "center",
      width: "5%",
    },
    {
      title: "B+",
      dataIndex: "Bpos",
      key: "Bpos",
      align: "center",
      width: "5%",
    },
    {
      title: "O-",
      dataIndex: "Oneg",
      key: "Oneg",
      align: "center",
      width: "5%",
    },
    {
      title: "O",
      dataIndex: "O",
      key: "O",
      align: "center",
      width: "5%",
    },
    {
      title: "O+",
      dataIndex: "Opos",
      key: "Opos",
      align: "center",
      width: "5%",
    },
    {
      title: "AB-",
      dataIndex: "ABneg",
      key: "ABneg",
      align: "center",
      width: "5%",
    },
    {
      title: "AB",
      dataIndex: "AB",
      key: "AB",
      align: "center",
      width: "5%",
    },
    {
      title: "AB+",
      dataIndex: "ABpos",
      key: "ABpos",
      align: "center",
      width: "5%",
    },
    {
      title: "Cryo",
      dataIndex: "Cryo",
      key: "Cryo",
      align: "center",
      width: "5%",
    },
    {
      title: "รวม",
      dataIndex: "num_sum",
      key: "",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return (
          <div>
            {/* <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span> */}
            {Number(record.Aneg) +
              Number(record.A) +
              Number(record.Apos) +
              Number(record.Bneg) +
              Number(record.B) +
              Number(record.Bpos) +
              Number(record.Oneg) +
              Number(record.O) +
              Number(record.Opos) +
              Number(record.ABneg) +
              Number(record.AB) +
              Number(record.ABpos) +
              Number(record.Cryo)}
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานการจ่ายเลือด</h>
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
          {docSearch == undefined || docSearch == ""
            ? ""
            : `Doctor : ${docSearch}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {wardSearch == undefined || wardSearch == ""
            ? ""
            : `Ward : ${wardSearch}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {nameWork == undefined || nameWork == ""
            ? ""
            : `เวร : ${nameWork} เวลา ${timeFrom} ถึง ${timeTo}`}
        </h>
      </Row>

      <br />
      <Row justify="center">
        <Col span={22}>
          <Table
            columns={columns}
            dataSource={data}
            className="table_report_stock_tackblood"
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
    </div>
  );
};
