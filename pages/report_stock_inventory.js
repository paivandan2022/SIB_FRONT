// คงคลัง
import { Button, Card, Col, Modal, Row, Table, Tabs, Typography } from "antd";
import ExcelJS from "exceljs";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

import { MdOutlinePrint } from "react-icons/md";

const { Text } = Typography;
const { TabPane } = Tabs;

const Report_stock_inventory = () => {
  const [loading, setLoading] = useState(false);
  const [time, settime] = useState();
  const [date, setdate] = useState();
  const [data_print, setdata_print] = useState([]);
  const [data_table, setData_table] = useState([]);

  const printComponent = useRef(null);

  const d = new Date();
  const years = moment().add(543, "years").format("YYYY");
  const months = moment().format("MM");
  const day = moment().format("DD");

  const setCrrentDate = () => {
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
    // console.log("date", date);
    setdate(date);
    settime(moment().format("HH:mm:ss"));
  };
  useEffect(() => {
    setInterval(() => {
      setCrrentDate();
    }, 0);
  }, []);

  const Get_stock_ready = async () => {
    setLoading(true);
    const result = await api.get("/Get_report_ready");
    if (result.data[0].length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
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
    setData_table(resultStock);
    setdata_print(resultStock);
    setLoading(false);

    // setCrrentDate();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "",
      key: "",
      align: "center",
      width: "2%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "type_name",
      key: "type_name",
      width: "18%",
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
      width: "3%",
    },
    {
      title: "A",
      dataIndex: "A",
      key: "A",
      align: "center",
      width: "3%",
    },
    {
      title: "A+",
      dataIndex: "Apos",
      key: "Apos",
      align: "center",
      width: "3%",
    },
    {
      title: "B-",
      dataIndex: "Bneg",
      key: "Bneg",
      align: "center",
      width: "3%",
    },
    {
      title: "B",
      dataIndex: "B",
      key: "B",
      align: "center",
      width: "3%",
    },
    {
      title: "B+",
      dataIndex: "Bpos",
      key: "Bpos",
      align: "center",
      width: "3%",
    },
    {
      title: "O-",
      dataIndex: "Oneg",
      key: "Oneg",
      align: "center",
      width: "3%",
    },
    {
      title: "O",
      dataIndex: "O",
      key: "O",
      align: "center",
      width: "3%",
    },
    {
      title: "O+",
      dataIndex: "Opos",
      key: "Opos",
      align: "center",
      width: "3%",
    },
    {
      title: "AB-",
      dataIndex: "ABneg",
      key: "ABneg",
      align: "center",
      width: "3%",
    },
    {
      title: "AB",
      dataIndex: "AB",
      key: "AB",
      align: "center",
      width: "3%",
    },
    {
      title: "AB+",
      dataIndex: "ABpos",
      key: "ABpos",
      align: "center",
      width: "3%",
    },
    {
      title: "Cry O",
      dataIndex: "Cryo",
      key: "Cryo",
      align: "center",
      width: "3%",
    },
    {
      title: "รวม",
      dataIndex: "sumType",
      key: "sumType",
      align: "center",
      width: "3%",
      render: (text, record) => {
        return (
          <div>
            {/* <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span> */}
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

  const handlerClickDownloadButton = async (format) => {
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานคลังเลือด");
    const worksheet = workbook.getWorksheet("รายงานคลังเลือด");

    worksheet.columns = [
      { header: "", key: "c1", width: 4 },
      { header: "", key: "c2", width: 45 },
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
      { c7: "รายงานคลังเลือด" },
      { c6: "ประจำวันที่" + date },
      { c7: " " },
      {
        c1: "#",
        c2: "Blood Type",
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
        id: data_table[i].type_name == "รวม" ? "" : i + 1,
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
    console.log(dataTest);

    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/octet-binary",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "รายงานคลังเลือด" + moment().format("HH:mm:ss") + "." + format;
    a.click();
    a.remove();
  };

  useEffect(async () => {
    await setCrrentDate();
    await Get_stock_ready();
  }, []);

  return (
    <>
      <Layout keyTab="report_stock_inventory">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน คงคลัง</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานคลังเลือด" key="1">
                  <Row justify="center">
                    <p style={{ fontSize: "16px" }}>
                      {date} เวลา {time} น.
                      {/* {moment().format("HH:mm:ss")} */}
                    </p>
                  </Row>
                  <Row
                    justify="end"
                    style={{ marginTop: "-20px", marginBottom: "5px" }}
                  >
                    <div ref={(el) => (printComponent = el)}>
                      <div key="1">
                        <PrintDetail
                          data={data_print}
                          date={date}
                          time={time}
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
                  <Row justify="center">
                    <Col span={24}>
                      <Table
                        className="table_report_stock_inventory"
                        dataSource={data_table}
                        columns={columns}
                        pagination={false}
                        loading={loading}
                        // bordered
                        size="small"
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

export default Report_stock_inventory;

const PrintDetail = ({ data, date, time }) => {
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
        <h style={{ fontSize: "18px" }}>รายงานคงเลือด</h>
      </Row>

      <Row justify="center">
        <h style={{ fontSize: "16px" }}>{date}</h>
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
      <Row>
        <span
          style={{ paddingRight: "10px", paddingBottom: "5px" }}
          id="footerPrint"
        >
          เวลาที่พิมพ์ : {date} {time} น.
        </span>
      </Row>
    </div>
  );
};
